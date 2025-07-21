import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Upload, ImageIcon } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Proker = Tables<"proker">;

interface ProkerFormProps {
  proker?: Proker;
  onCancel: () => void;
  onSuccess?: () => void;
}

const ProkerForm = ({ proker, onCancel, onSuccess }: ProkerFormProps) => {
  const [formData, setFormData] = useState({
    nama_proker: proker?.nama_proker || "",
    deskripsi: proker?.deskripsi || "",
    tanggal: proker?.tanggal || "",
  });

  const [photos, setPhotos] = useState<string[]>(proker?.photos || []);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ...formData,
        photos,
      };

      if (proker?.id) {
        const { error } = await supabase
          .from("proker")
          .update(payload)
          .eq("id", proker.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("proker").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: `Program Kerja berhasil ${proker ? "diperbarui" : "ditambahkan"}.`,
      });
      queryClient.invalidateQueries({ queryKey: ["proker"] });
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menyimpan data.",
        variant: "destructive",
      });
    },
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const uploadPhoto = async (file: File) => {
    try {
      setUploadingPhotos(true);
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const filePath = `proker-photos/${fileName}`;

      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('village-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('village-images')
        .getPublicUrl(filePath);

      setPhotos(prev => [...prev, data.publicUrl]);
      
      toast({
        title: "Berhasil",
        description: "Foto berhasil diupload.",
      });
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal mengupload foto.",
        variant: "destructive",
      });
    } finally {
      setUploadingPhotos(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          uploadPhoto(file);
        }
      });
    }
  };

  const removePhoto = (photoUrl: string) => {
    setPhotos(photos.filter(url => url !== photoUrl));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutation.mutateAsync();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{proker ? "Edit Program Kerja" : "Tambah Program Kerja"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nama_proker">Nama Program Kerja</Label>
            <Input
              id="nama_proker"
              value={formData.nama_proker}
              onChange={(e) => handleChange("nama_proker", e.target.value)}
              required
              placeholder="Contoh: Bersih-bersih Desa"
            />
          </div>

          <div>
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <Textarea
              id="deskripsi"
              value={formData.deskripsi}
              onChange={(e) => handleChange("deskripsi", e.target.value)}
              rows={4}
              placeholder="Deskripsikan program kerja ini..."
              required
            />
          </div>

          <div>
            <Label htmlFor="tanggal">Tanggal Pelaksanaan</Label>
            <Input
              id="tanggal"
              type="date"
              value={formData.tanggal}
              onChange={(e) => handleChange("tanggal", e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Foto Kegiatan</Label>
            <div className="space-y-4">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="photo-upload"
                  disabled={uploadingPhotos}
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {uploadingPhotos ? "Mengupload..." : "Klik untuk upload foto atau drag & drop"}
                  </span>
                  <span className="text-xs text-gray-400">PNG, JPG, JPEG hingga 5MB</span>
                </label>
              </div>

              {/* Photo Preview Grid */}
              {photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((photoUrl, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={photoUrl}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removePhoto(photoUrl)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Photo Count */}
              {photos.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ImageIcon className="h-4 w-4" />
                  <span>{photos.length} foto ditambahkan</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={mutation.isPending || uploadingPhotos}>
              {mutation.isPending ? "Menyimpan..." : "Simpan"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProkerForm;