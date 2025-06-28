import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const quotes = await prisma.quote.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, author, order } = body;
    
    const quote = await prisma.quote.create({
      data: {
        text,
        author,
        order: order || 0,
      },
    });
    
    return NextResponse.json(quote);
  } catch (error) {
    console.error('Error creating quote:', error);
    return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 });
  }
} 