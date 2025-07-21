import { useRef, useState, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

const ImageUploadField = ({
  label,
  value,
  onChange,
  folder = "general",
}: ImageUploadFieldProps) => {
  const { uploadImage, isUploading } = useImageUpload();
  const [previewUrl, setPreviewUrl] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    const uploadedUrl = await uploadImage(file, folder);
    if (uploadedUrl) {
      setPreviewUrl(uploadedUrl);
      onChange(uploadedUrl);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFileUpload(file);
    },
    []
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const triggerUpload = () => inputRef.current?.click();

  const removeImage = () => {
    setPreviewUrl("");
    onChange("");
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </Label>

      {previewUrl ? (
        <div className="relative w-fit">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-md border border-gray-200 dark:border-gray-700 shadow-sm"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute -top-2 -right-2 p-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-red-500 hover:text-white transition"
            onClick={removeImage}
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      ) : (
        <div
          className={clsx(
            "border border-dashed rounded-md p-4 flex flex-col items-center justify-center text-center bg-white/50 dark:bg-gray-800/50 transition",
            isDragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-300 dark:border-gray-600"
          )}
          onClick={triggerUpload}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />

          <Upload className="w-5 h-5 mb-1 text-gray-400" />
          <p className="text-xs text-gray-500">
            {isUploading
              ? "Mengunggah..."
              : `Klik atau tarik gambar ke sini untuk upload ${label.toLowerCase()}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;
