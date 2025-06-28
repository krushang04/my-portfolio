import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const about = await prisma.about.findFirst();
    return NextResponse.json(about || { content: '' });
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json({ error: 'Failed to fetch about content' }, { status: 500 });
  }
}

interface AboutUpdateRequest {
  content: string;
}

export async function PUT(request: Request) {
  try {
    const body = await request.json() as AboutUpdateRequest;
    const { content } = body;
    
    const about = await prisma.about.upsert({
      where: { id: '1' },
      update: { content },
      create: { id: '1', content },
    });
    
    return NextResponse.json(about);
  } catch (error) {
    console.error('Error updating about content:', error);
    return NextResponse.json({ error: 'Failed to update about content' }, { status: 500 });
  }
} 