
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Upload, X } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

const ImageUploadField = ({ label, value, onChange, folder = 'general' }: ImageUploadFieldProps) => {
  const { uploadImage, isUploading } = useImageUpload();
  const [previewUrl, setPreviewUrl] = useState(value);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadedUrl = await uploadImage(file, folder);
      if (uploadedUrl) {
        setPreviewUrl(uploadedUrl);
        onChange(uploadedUrl);
      }
    }
  };

  const removeImage = () => {
    setPreviewUrl('');
    onChange('');
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2">
        {previewUrl ? (
          <div className="relative inline-block">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-32 h-32 object-cover rounded-lg border"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2"
              onClick={removeImage}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-2">Upload {label.toLowerCase()}</p>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="max-w-xs"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadField;
