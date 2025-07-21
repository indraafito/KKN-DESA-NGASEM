import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tables } from '@/integrations/supabase/types';
import { useCreateFacility, useUpdateFacility } from "@/hooks/useFacilities";

type Facility = Tables<'facilities'>;

interface FacilityFormProps {
  facility?: Facility;
  onCancel: () => void;
}

const FacilityForm = ({ facility, onCancel }: FacilityFormProps) => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: facility?.name || '',
    description: facility?.description || '',
    icon: facility?.icon || '',
    lokasi: facility?.lokasi || '',     // link GMaps
    alamat: facility?.alamat || '',     // teks alamat
  });

  const createFacility = useCreateFacility();
  const updateFacility = useUpdateFacility();

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      description: formData.description,
      icon: formData.icon,
      lokasi: formData.lokasi,
      alamat: formData.alamat,
    };

    try {
      if (facility) {
        await updateFacility.mutateAsync({ id: facility.id, ...payload });
        toast({
          title: "Fasilitas diperbarui",
          description: `Data "${formData.name}" berhasil diperbarui.`,
        });
      } else {
        await createFacility.mutateAsync(payload);
        toast({
          title: "Fasilitas ditambahkan",
          description: `Data "${formData.name}" berhasil ditambahkan.`,
        });
      }

      onCancel(); // Tutup modal
    } catch (error) {
      toast({
        title: "Gagal menyimpan data",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const isLoading = createFacility.isPending || updateFacility.isPending;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{facility ? 'Edit Fasilitas' : 'Tambah Fasilitas'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nama Fasilitas</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="icon">Icon/Emoji</Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => handleChange('icon', e.target.value)}
              placeholder="Contoh: 🏛️"
            />
          </div>

          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="alamat">Alamat</Label>
            <Input
              id="alamat"
              value={formData.alamat}
              onChange={(e) => handleChange('alamat', e.target.value)}
              placeholder="Contoh: Jl. Soekarno Hatta No.10"
            />
          </div>

          <div>
            <Label htmlFor="lokasi">Link Lokasi (Google Maps)</Label>
            <Input
              id="lokasi"
              value={formData.lokasi}
              onChange={(e) => handleChange('lokasi', e.target.value)}
              placeholder="https://maps.app.goo.gl/..."
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Menyimpan...' : 'Simpan'}
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

export default FacilityForm;
