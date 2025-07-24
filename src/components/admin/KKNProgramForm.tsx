import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import ImageUploadField from "./ImageUploadField";
import {
  useCreateKKNProgram,
  useUpdateKKNProgram,
} from "@/hooks/useKKNPrograms";
import { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { Tangent } from "lucide-react";

type KKNProgram = Tables<"kkn_programs">;

interface KKNProgramFormProps {
  program?: KKNProgram;
  onCancel: () => void;
  onSuccess?: () => void;
}

const KKNProgramForm = ({
  program,
  onCancel,
  onSuccess,
}: KKNProgramFormProps) => {
  const [formData, setFormData] = useState({
    nama_proker: program?.nama_proker || "",
    deskripsi: program?.deskripsi || "",
    tanggal: program?.tanggal || "",
    tanggalselesai: program?.tanggalselesai || "",
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

      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Ukuran file terlalu besar. Maksimal 5MB.");
      }

      if (!file.type.startsWith("image/")) {
        throw new Error("File harus berupa gambar.");
      }

      const fileExt = file.name.split(".").pop()?.toLowerCase();
      if (!fileExt || !["jpg", "jpeg", "png", "webp"].includes(fileExt)) {
        throw new Error(
          "Format file tidak didukung. Gunakan JPG, PNG, atau WEBP."
        );
      }

      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}.${fileExt}`;
      const filePath = `kkn-photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("village-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("village-images")
        .getPublicUrl(filePath);

      if (!data.publicUrl) {
        throw new Error("Gagal mendapatkan URL publik foto.");
      }

      setPhotos((prev) => [...prev, data.publicUrl]);

      toast({
        title: "Berhasil",
        description: "Foto berhasil diupload.",
      });
    } catch (error: any) {
      toast({
        title: "Gagal Upload Foto",
        description: error.message || "Gagal mengupload foto.",
        variant: "destructive",
      });
    } finally {
      setUploadingPhotos(false);
    }
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.nama_proker.trim()) errors.push("Nama program harus diisi");
    if (!formData.deskripsi.trim()) errors.push("Deskripsi harus diisi");
    if (!formData.tanggal) errors.push("Tanggal harus diisi");
    if (!formData.lokasi.trim()) errors.push("Lokasi harus diisi");

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast({
        title: "Data Tidak Lengkap",
        description: validationErrors.join(", "),
        variant: "destructive",
      });
      return;
    }

    if (uploadingPhotos) {
      toast({
        title: "Tunggu Upload Selesai",
        description: "Mohon tunggu hingga upload foto selesai.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      ...formData,
      nama_proker: formData.nama_proker.trim(),
      deskripsi: formData.deskripsi.trim(),
      lokasi: formData.lokasi.trim(),
      photos,
    };

    try {
      if (program?.id) {
        await updateMutation.mutateAsync({ id: program.id, ...payload });
      } else {
        await createMutation.mutateAsync(payload);
      }

      toast({
        title: "Berhasil",
        description: `Program KKN berhasil ${
          program ? "diperbarui" : "ditambahkan"
        }.`,
      });

      onCancel();
      onSuccess?.();
    } catch (error: any) {
      let errorMessage = "Terjadi kesalahan saat menyimpan data.";

      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.code) {
        switch (error.code) {
          case "23505":
            errorMessage = "Data duplikat terdeteksi.";
            break;
          case "23503":
            errorMessage = "Referensi data tidak valid.";
            break;
          case "23502":
            errorMessage = "Ada field wajib yang kosong.";
            break;
          case "PGRST116":
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
            />
          </div>

          <div>
            <Label htmlFor="tanggal">Tanggal mulai*</Label>
            <Input
              id="tanggal"
              type="date"
              value={formData.tanggal}
              onChange={(e) => handleChange("tanggal", e.target.value)}
              required
            />
            <label htmlFor="tanggalselesai">Tanggal selesai</label>
            <Input
              id="tanggalselesai"
              type="date"
              value={formData.tanggalselesai}
              onChange={(e) => handleChange("tanggalselesai", e.target.value)}
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

          <ImageUploadField
            label="Foto Program KKN"
            value=""
            onChange={(url) => setPhotos((prev) => [...prev, url])}
            folder="kkn-photos"
          />

          <div className="flex justify-end gap-2 pt-">
            <Button
              type="submit"
              disabled={isLoading || uploadingPhotos}
            >
              {isLoading
                ? program
                  ? "Menyimpan Perubahan..."
                  : "Menambahkan..."
                : program
                ? "Perbarui"
                : "Simpan"}
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
