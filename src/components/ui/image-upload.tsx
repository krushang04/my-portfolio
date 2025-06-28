"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import { deleteImage, uploadImage } from "@/lib/cloudinary";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  className?: string;
  height?: string;
}

const ImageUpload = ({
  value,
  onChange,
  disabled,
  className,
  height = "h-32",
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clear local preview when value changes from external source
  useEffect(() => {
    if (localPreview && value) {
      setLocalPreview(null);
    }
  }, [value, localPreview]);

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return;
    }

    // Clear previous errors
    setError(null);
    setIsUploading(true);

    try {
      // Set an immediate local preview
      const previewUrl = URL.createObjectURL(file);
      setLocalPreview(previewUrl);

      // Upload to Cloudinary (this happens in the background)
      const previousUrl = value;
      const cloudinaryUrl = await uploadImage(file);
      
      // Update the parent with the Cloudinary URL
      onChange(cloudinaryUrl);
      
      // Clean up the previous image if there was one
      if (previousUrl) {
        try {
          await deleteImage(previousUrl);
        } catch (err) {
          console.error("Error deleting previous image:", err);
        }
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload image. Please try again.");
      
      // Clean up local preview on error
      if (localPreview) {
        URL.revokeObjectURL(localPreview);
        setLocalPreview(null);
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = async () => {
    if (localPreview) {
      URL.revokeObjectURL(localPreview);
      setLocalPreview(null);
    }
    
    if (!value) return;
    
    setIsDeleting(true);
    try {
      await deleteImage(value);
      onChange("");
    } catch (err) {
      console.error("Error deleting image:", err);
      setError("Failed to delete image. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Determine which image to show - local preview takes precedence
  const displayImage = localPreview || value;
  const isLoading = isUploading || isDeleting;

  return (
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || isLoading}
      />

      {displayImage ? (
        <div className={`relative ${height} w-full max-w-[180px] rounded-md overflow-hidden border border-gray-200 dark:border-gray-700`}>
          {/* Show spinner overlay during operations */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          )}
          
          {/* The image itself */}
          <Image
            src={displayImage}
            alt="Selected image"
            fill
            unoptimized
            className="object-cover"
          />
          
          {/* Remove button */}
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 z-20"
            onClick={handleRemove}
            disabled={disabled || isLoading}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          disabled={disabled || isLoading}
          className={`w-full max-w-[180px] ${height} flex flex-col items-center justify-center gap-2 border-dashed border-2 ${isLoading ? 'opacity-70' : ''}`}
        >
          {isLoading ? (
            <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
          ) : (
            <Upload className="h-6 w-6 text-gray-500" />
          )}
          <span className="text-sm">
            {isUploading ? "Uploading..." : isDeleting ? "Removing..." : "Upload Image"}
          </span>
        </Button>
      )}

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload; 