import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET /api/site-settings
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = await prisma.siteSettings.findUnique({
      where: { id: '1' }
    });

    return NextResponse.json(settings || {
      title: '',
      description: '',
      keywords: '',
      darkModeDefault: false,
    });
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT /api/site-settings
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    const settings = await prisma.siteSettings.upsert({
      where: { id: '1' },
      update: {
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        darkModeDefault: data.darkModeDefault,
      },
      create: {
        id: '1',
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        darkModeDefault: data.darkModeDefault,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating site settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 