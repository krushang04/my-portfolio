import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { deleteImageByUrl } from '@/lib/cloudinary-server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const experience = await prisma.experience.findUnique({
      where: { id },
    });
    
    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }
    
    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error fetching experience:', error);
    return NextResponse.json({ error: 'Error fetching experience' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const data = await request.json();
    const experience = await prisma.experience.update({
      where: { id },
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });
    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json({ error: 'Error updating experience' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    // First, fetch the experience to get the logo URL
    const experience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    // Delete the experience from database first
    await prisma.experience.delete({
      where: { id },
    });

    // Then delete logo from Cloudinary if it exists
    if (experience.logoUrl && experience.logoUrl.includes('cloudinary.com')) {
      try {
        await deleteImageByUrl(experience.logoUrl);
        console.log(`Successfully deleted experience logo: ${experience.logoUrl}`);
      } catch (error) {
        console.error(`Failed to delete experience logo ${experience.logoUrl}:`, error);
        // Don't throw here - the experience deletion was successful
      }
    }

    return NextResponse.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json({ error: 'Error deleting experience' }, { status: 500 });
  }
} 