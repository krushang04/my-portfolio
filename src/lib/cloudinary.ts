/**
 * Convert a Cloudinary URL to inline display mode (prevents download)
 * @param url - The Cloudinary URL
 * @returns The modified URL with inline flag
 */
export const makeCloudinaryUrlInline = (url: string): string => {
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }
  
  // Remove any existing fl_attachment flags
  let cleanUrl = url.replace(/\/fl_attachment[^\/]*/, '');
  
  // Add fl_inline flag if not already present
  if (!cleanUrl.includes('fl_inline')) {
    if (cleanUrl.includes('/image/upload/')) {
      cleanUrl = cleanUrl.replace('/image/upload/', '/image/upload/fl_inline/');
    } else if (cleanUrl.includes('/video/upload/')) {
      cleanUrl = cleanUrl.replace('/video/upload/', '/video/upload/fl_inline/');
    } else if (cleanUrl.includes('/raw/upload/')) {
      cleanUrl = cleanUrl.replace('/raw/upload/', '/raw/upload/fl_inline/');
    }
  }
  
  return cleanUrl;
};

/**
 * Delete an image from Cloudinary using the API
 * @param url - The Cloudinary URL of the image to delete
 * @returns A boolean indicating success
 */
export const deleteImage = async (url: string): Promise<boolean> => {
  if (!url) return true; // If no URL provided, consider it a success
  
  try {
    const response = await fetch('/api/upload/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete image');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

/**
 * Upload a file to Cloudinary via API route
 * @param file - The file to upload
 * @returns The uploaded image URL
 */
export const uploadImage = async (file: File): Promise<string> => {
  try {
    // Create FormData
    const formData = new FormData();
    formData.append('file', file);
    
    // Upload via API route
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload image');
    }
    
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

/**
 * Convert a file to base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}; 