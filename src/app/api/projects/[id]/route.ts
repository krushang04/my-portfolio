import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { deleteImageByUrl } from '@/lib/cloudinary-server';

const prisma = new PrismaClient();

// GET /api/projects/:id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        skills: true,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT /api/projects/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const body = await request.json();
    const { title, description, imageUrl, githubUrl, liveUrl, skills, featured, order } = body;

    // Get the current project to check for image changes
    const currentProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!currentProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Handle skills - similar to POST logic
    const skillConnections = await Promise.all(
      (skills || []).map(async (skill: string | { name: string; iconUrl?: string }) => {
        if (typeof skill === 'string') {
          // If it's a string, it's an existing skill ID
          return { id: skill };
        } else {
          // If it's an object, create a new skill or find existing
          const existingSkill = await prisma.skill.findUnique({
            where: { name: skill.name }
          });
          
          if (existingSkill) {
            return { id: existingSkill.id };
          }

          const newSkill = await prisma.skill.create({
            data: {
              name: skill.name,
              iconUrl: skill.iconUrl
            }
          });
          return { id: newSkill.id };
        }
      })
    );

    // First, disconnect all skills to avoid conflicts
    await prisma.project.update({
      where: { id },
      data: {
        skills: {
          disconnect: await prisma.project
            .findUnique({
              where: { id },
              include: { skills: true },
            })
            .then((project) => project?.skills.map((skill) => ({ id: skill.id })) || []),
        },
      },
    });

    // Update the project with new data
    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        githubUrl,
        liveUrl,
        featured,
        order,
        skills: {
          connect: skillConnections,
        },
      },
      include: {
        skills: true,
      },
    });

    // If the image URL has changed, delete the old image from Cloudinary
    if (currentProject.imageUrl && 
        currentProject.imageUrl !== imageUrl && 
        currentProject.imageUrl.includes('cloudinary.com')) {
      try {
        await deleteImageByUrl(currentProject.imageUrl);
        console.log(`Successfully deleted old project image: ${currentProject.imageUrl}`);
      } catch (error) {
        console.error(`Failed to delete old project image ${currentProject.imageUrl}:`, error);
        // Don't throw here - the project update was successful
      }
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    // First, fetch the project to get the image URLs
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        skills: true,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Collect all image URLs to delete
    const imagesToDelete: string[] = [];
    
    // Add project image
    if (project.imageUrl) {
      imagesToDelete.push(project.imageUrl);
    }
    
    // Add skill icons
    project.skills.forEach(skill => {
      if (skill.iconUrl) {
        imagesToDelete.push(skill.iconUrl);
      }
    });

    // Delete the project from database first
    await prisma.project.delete({
      where: { id },
    });

    // Then delete images from Cloudinary (do this after DB deletion to avoid inconsistent state)
    const deletePromises = imagesToDelete.map(async (imageUrl) => {
      try {
        await deleteImageByUrl(imageUrl);
        console.log(`Successfully deleted image: ${imageUrl}`);
      } catch (error) {
        console.error(`Failed to delete image ${imageUrl}:`, error);
        // Don't throw here - we want to continue deleting other images
      }
    });

    // Wait for all image deletions to complete
    await Promise.allSettled(deletePromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
} 