import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const education = await prisma.education.findUnique({
      where: { id },
    });
    
    if (!education) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 });
    }
    
    return NextResponse.json(education);
  } catch (error) {
    console.error('Error fetching education:', error);
    return NextResponse.json({ error: 'Error fetching education' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const data = await request.json();
    const education = await prisma.education.update({
      where: { id },
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });
    return NextResponse.json(education);
  } catch (error) {
    console.error('Error updating education:', error);
    return NextResponse.json({ error: 'Error updating education' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    await prisma.education.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Education deleted successfully' });
  } catch (error) {
    console.error('Error deleting education:', error);
    return NextResponse.json({ error: 'Error deleting education' }, { status: 500 });
  }
} 