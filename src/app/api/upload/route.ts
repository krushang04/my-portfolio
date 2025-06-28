import { NextRequest, NextResponse } from 'next/server';
import { uploadBase64Image } from '@/lib/cloudinary-server';

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called');
    
    // Get the request body (form data)
    const formData = await request.formData();
    console.log('FormData received');
    
    const file = formData.get('file') as File;
    console.log('File from formData:', file ? `${file.name} (${file.size} bytes, ${file.type})` : 'No file');
    
    if (!file) {
      console.log('No file provided in request');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      console.log('Invalid file type:', file.type);
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }
    
    console.log('Converting file to buffer...');
    // Get file as ArrayBuffer
    const buffer = await file.arrayBuffer();
    console.log('Buffer size:', buffer.byteLength);
    
    // Convert to base64
    const base64String = Buffer.from(buffer).toString('base64');
    const dataURI = `data:${file.type};base64,${base64String}`;
    console.log('DataURI created, length:', dataURI.length);
    
    console.log('Uploading to Cloudinary...');
    // Upload to Cloudinary
    const secureUrl = await uploadBase64Image(dataURI, 'portfolio');
    console.log('Upload successful, URL:', secureUrl);
    
    // Return the result
    return NextResponse.json({ 
      secure_url: secureUrl
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { error: 'Failed to upload image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 