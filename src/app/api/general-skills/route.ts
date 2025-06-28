import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const skills = await prisma.generalSkill.findMany({
      orderBy: {
        order: 'asc',
      },
    });
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching general skills:', error);
    return NextResponse.json({ error: 'Error fetching general skills' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Convert order to integer if it's a string
    if (typeof data.order === 'string') {
      data.order = parseInt(data.order, 10);
    }
    
    const skill = await prisma.generalSkill.create({
      data,
    });
    return NextResponse.json(skill);
  } catch (error) {
    console.error('Error creating general skill:', error);
    return NextResponse.json({ error: 'Error creating general skill' }, { status: 500 });
  }
} 