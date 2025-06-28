import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const educations = await prisma.education.findMany({
      orderBy: {
        order: 'asc',
      },
    });
    return NextResponse.json(educations);
  } catch (error) {
    console.error('Error fetching educations:', error);
    return NextResponse.json({ error: 'Error fetching educations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const education = await prisma.education.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });
    return NextResponse.json(education);
  } catch (error) {
    console.error('Error creating education:', error);
    return NextResponse.json({ error: 'Error creating education' }, { status: 500 });
  }
} 