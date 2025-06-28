import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload a base64 image to Cloudinary (server-side)
 */
export const uploadBase64Image = async (
  dataUri: string,
  folder = 'portfolio'
): Promise<string> => {
  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload(
        dataUri,
        {
          folder,
          resource_type: 'auto',
          use_filename: true,
          unique_filename: true,
          overwrite: false,
          quality: 'auto',
          fetch_format: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as UploadApiResponse);
        }
      );
    });
    
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
};

/**
 * Delete an image from Cloudinary by URL (server-side)
 */
export const deleteImageByUrl = async (url: string): Promise<boolean> => {
  try {
    // Extract the public_id from the Cloudinary URL
    // Example URL: https://res.cloudinary.com/your_cloud_name/image/upload/v1234567890/portfolio/abcdef123456.jpg
    const urlParts = url.split('/');
    const fileNameWithExtension = urlParts[urlParts.length - 1];
    const fileName = fileNameWithExtension.split('.')[0];
    
    // Folder is the second to last segment in the URL
    const folder = urlParts[urlParts.length - 2];
    
    // Combine folder and filename to get the public_id
    const publicId = `${folder}/${fileName}`;
    
    // Delete the image from Cloudinary
    await new Promise<void>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, function(error) {
        if (error) reject(error);
        else resolve();
      });
    });
    
    return true;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return false;
  }
};

export default cloudinary; 