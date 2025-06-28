import { NextRequest, NextResponse } from 'next/server';
import { deleteImageByUrl } from '@/lib/cloudinary-server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Invalid URL provided' }, { status: 400 });
    }
    
    // Delete the image from Cloudinary
    const success = await deleteImageByUrl(url);
    
    if (!success) {
      return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
} 
