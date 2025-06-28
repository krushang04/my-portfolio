import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Create a single PrismaClient instance for the entire application
const prisma = new PrismaClient();

// PUT /api/skills/:id
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const skill = await prisma.skill.update({
      where: { id },
      data: {
        name: body.name,
        iconUrl: body.iconUrl,
      },
    });

    return NextResponse.json(skill);
  } catch (err) {
    console.error('Error updating skill:', err);
    
    // Check if it's a database connection error
    if (err instanceof Error && err.message.includes('Can\'t reach database server')) {
      return NextResponse.json(
        { error: "Database connection error. Please check your database configuration." },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE /api/skills/:id
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.skill.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting skill:', err);
    
    // Check if it's a database connection error
    if (err instanceof Error && err.message.includes('Can\'t reach database server')) {
      return NextResponse.json(
        { error: "Database connection error. Please check your database configuration." },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 