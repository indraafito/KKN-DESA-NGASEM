import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useCreateVillageOfficial, useUpdateVillageOfficial } from "@/hooks/useVillageOfficials";
import { Upload, X } from "lucide-react";

type VillageOfficial = Tables<"village_officials">;

interface VillageOfficialFormProps {
  official?: VillageOfficial;
  onCancel: () => void;
}

const VillageOfficialForm = ({ official, onCancel }: VillageOfficialFormProps) => {
  const { toast } = useToast();
  const { uploadImage, isUploading } = useImageUpload();
  const createOfficial = useCreateVillageOfficial();
  const updateOfficial = useUpdateVillageOfficial();

  const [formData, setFormData] = useState({
    name: official?.name || '',
    position: official?.position || '',
    phone: official?.phone || '',
    email: official?.email || '',
    address: official?.address || '',
    photo_url: official?.photo_url || '',
    status: official?.status || 'active',
    order_index: official?.order_index || 0,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(official?.photo_url || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setFormData(prev => ({ ...prev, photo_url: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.position.trim()) {
      toast({
        title: "Error",
        description: "Nama dan jabatan harus diisi",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    let photoUrl = formData.photo_url;

    try {
      if (selectedFile) {
        const uploadedUrl = await uploadImage(selectedFile, 'officials');
        if (uploadedUrl) {
          photoUrl = uploadedUrl;
        }
      }

      const payload = {
        ...formData,
        photo_url: photoUrl,
        order_index: Number(formData.order_index),
        updated_at: new Date().toISOString(),
      };

      if (official?.id) {
        await updateOfficial.mutateAsync({ id: official.id, ...payload });
        toast({ title: "Data perangkat berhasil diperbarui." });
      } else {
        await createOfficial.mutateAsync({ ...payload, created_at: new Date().toISOString() });
        toast({ title: "Data perangkat berhasil ditambahkan." });
      }

      onCancel(); // Tutup form/modal
    } catch (err: any) {
      toast({
        title: "Gagal menyimpan data",
        description: err.message || "Terjadi kesalahan.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{official ? 'Edit Perangkat Desa' : 'Tambah Perangkat Desa'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="position">Jabatan</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleChange('position', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">No. Telepon</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Alamat</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="order_index">Urutan</Label>
              <Input
                id="order_index"
                type="number"
                min={0}
                value={formData.order_index}
                onChange={(e) => handleChange('order_index', parseInt(e.target.value) || 0)}
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Foto</Label>
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
                  <p className="text-sm text-gray-500 mb-2">Upload foto perangkat desa</p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="max-w-xs"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isSubmitting || isUploading}>
              {isSubmitting || isUploading
                ? 'Menyimpan...'
                : official ? 'Update' : 'Simpan'}
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

export default VillageOfficialForm;
