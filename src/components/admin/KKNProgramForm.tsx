import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, Upload, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCreateKKNProgram, useUpdateKKNProgram } from "@/hooks/useKKNPrograms";
import { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";

type KKNProgram = Tables<'kkn_programs'>;

interface KKNProgramFormProps {
  program?: KKNProgram;
  onCancel: () => void;
  onSuccess?: () => void;
}

const KKNProgramForm = ({ program, onCancel, onSuccess }: KKNProgramFormProps) => {
  const [formData, setFormData] = useState({
    nama_proker: program?.nama_proker || "",
    deskripsi: program?.deskripsi || "",
    tanggal: program?.tanggal || "",
    lokasi: program?.lokasi || "",
  });

  const [photos, setPhotos] = useState<string[]>(program?.photos || []);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const { toast } = useToast();

  const createMutation = useCreateKKNProgram();
  const updateMutation = useUpdateKKNProgram();

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const uploadPhoto = async (file: File) => {
    try {
      setUploadingPhotos(true);
      
      // Validasi ukuran file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Ukuran file terlalu besar. Maksimal 5MB.");
      }

      // Validasi tipe file
      if (!file.type.startsWith("image/")) {
        throw new Error("File harus berupa gambar.");
      }

      const fileExt = file.name.split(".").pop()?.toLowerCase();
      if (!fileExt || !['jpg', 'jpeg', 'png', 'webp'].includes(fileExt)) {
        throw new Error("Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.");
      }

      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const filePath = `kkn-photos/${fileName}`;

      console.log("Uploading file:", fileName, "Size:", file.size);

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("village-images")
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage.from("village-images").getPublicUrl(filePath);
      
      if (!data.publicUrl) {
        throw new Error("Gagal mendapatkan URL publik foto.");
      }

      setPhotos((prev) => [...prev, data.publicUrl]);

      toast({
        title: "Berhasil",
        description: "Foto berhasil diupload.",
      });
    } catch (error: any) {
      console.error("Photo upload error:", error);
      toast({
        title: "Gagal Upload Foto",
        description: error.message || "Gagal mengupload foto.",
        variant: "destructive",
      });
    } finally {
      setUploadingPhotos(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        uploadPhoto(file);
      });
    }
    // Reset input value agar file yang sama bisa dipilih lagi
    e.target.value = '';
  };

  const removePhoto = (photoUrl: string) => {
    setPhotos(photos.filter((url) => url !== photoUrl));
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.nama_proker.trim()) {
      errors.push("Nama program harus diisi");
    }

    if (!formData.deskripsi.trim()) {
      errors.push("Deskripsi harus diisi");
    }

    if (!formData.tanggal) {
      errors.push("Tanggal harus diisi");
    }

    if (!formData.lokasi.trim()) {
      errors.push("Lokasi harus diisi");
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast({
        title: "Data Tidak Lengkap",
        description: validationErrors.join(", "),
        variant: "destructive",
      });
      return;
    }

    // Pastikan tidak ada upload foto yang sedang berlangsung
    if (uploadingPhotos) {
      toast({
        title: "Tunggu Upload Selesai",
        description: "Mohon tunggu hingga upload foto selesai.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      nama_proker: formData.nama_proker.trim(),
      deskripsi: formData.deskripsi.trim(),
      tanggal: formData.tanggal,
      lokasi: formData.lokasi.trim(),
      photos: photos,
    };

    console.log("Submitting payload:", payload);

    try {
      let result;
      
      if (program?.id) {
        result = await updateMutation.mutateAsync({ 
          id: program.id, 
          ...payload 
        });
        console.log("Update result:", result);
      } else {
        result = await createMutation.mutateAsync(payload);
        console.log("Create result:", result);
      }

      toast({
        title: "Berhasil",
        description: `Program KKN berhasil ${program ? "diperbarui" : "ditambahkan"}.`,
      });

      onSuccess?.();
    } catch (error: any) {
      console.error("Submit error:", error);
      
      let errorMessage = "Terjadi kesalahan saat menyimpan data.";
      
      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.code) {
        switch (error.code) {
          case '23505':
            errorMessage = "Data duplikat terdeteksi.";
            break;
          case '23503':
            errorMessage = "Referensi data tidak valid.";
            break;
          case '23502':
            errorMessage = "Ada field wajib yang kosong.";
            break;
          case 'PGRST116':
            errorMessage = "Tidak ada data yang diubah atau format data salah.";
            break;
          default:
            errorMessage = `Kesalahan database: ${error.code}`;
        }
      }

      toast({
        title: "Gagal Menyimpan",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{program ? "Edit Program KKN" : "Tambah Program KKN"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nama_proker">Nama Program *</Label>
            <Input
              id="nama_proker"
              value={formData.nama_proker}
              onChange={(e) => handleChange("nama_proker", e.target.value)}
              required
              placeholder="Contoh: Pembersihan Sungai"
              maxLength={255}
            />
          </div>

          <div>
            <Label htmlFor="deskripsi">Deskripsi *</Label>
            <Textarea
              id="deskripsi"
              value={formData.deskripsi}
              onChange={(e) => handleChange("deskripsi", e.target.value)}
              rows={4}
              placeholder="Jelaskan secara rinci..."
              required
              maxLength={1000}
            />
          </div>

          <div>
            <Label htmlFor="tanggal">Tanggal *</Label>
            <Input
              id="tanggal"
              type="date"
              value={formData.tanggal}
              onChange={(e) => handleChange("tanggal", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="lokasi">Lokasi *</Label>
            <Input
              id="lokasi"
              value={formData.lokasi}
              onChange={(e) => handleChange("lokasi", e.target.value)}
              placeholder="Contoh: Lapangan RW 04"
              required
              maxLength={255}
            />
          </div>

          <div>
            <Label>Foto Kegiatan (Opsional)</Label>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                  id="photo-upload"
                  disabled={uploadingPhotos}
                />
                <label
                  htmlFor="photo-upload"
                  className={`cursor-pointer flex flex-col items-center gap-2 ${
                    uploadingPhotos ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {uploadingPhotos ? "Mengupload..." : "Klik untuk upload foto atau drag & drop"}
                  </span>
                  <span className="text-xs text-gray-400">PNG, JPG, JPEG, WEBP hingga 5MB</span>
                </label>
              </div>

              {photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((photoUrl, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={photoUrl}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error("Image load error:", photoUrl);
                            e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%236b7280">Error</text></svg>';
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removePhoto(photoUrl)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={uploadingPhotos}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {photos.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ImageIcon className="h-4 w-4" />
                  <span>{photos.length} foto ditambahkan</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="submit" 
              disabled={isLoading || uploadingPhotos}
              className="min-w-[100px]"
            >
              {isLoading ? "Menyimpan..." : "Simpan"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isLoading}
            >
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default KKNProgramForm;