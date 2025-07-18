import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tables } from '@/integrations/supabase/types';
import { useCreateFacility, useUpdateFacility } from "@/hooks/useFacilities"; // pastikan path benar

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
    condition: facility?.condition || 'Baik',
    icon: facility?.icon || '',
    status: facility?.status || 'active',
  });

  const [features, setFeatures] = useState<string[]>(facility?.features || []);
  const [newFeature, setNewFeature] = useState('');

  const createFacility = useCreateFacility();
  const updateFacility = useUpdateFacility();

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFeatures(features.filter(f => f !== feature));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      features,
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
            <Label htmlFor="condition">Kondisi</Label>
            <Select value={formData.condition} onValueChange={(value) => handleChange('condition', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Baik">Baik</SelectItem>
                <SelectItem value="Cukup">Cukup</SelectItem>
                <SelectItem value="Perlu Perbaikan">Perlu Perbaikan</SelectItem>
              </SelectContent>
            </Select>
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

          <div>
            <Label>Fitur</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Tambah fitur..."
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              />
              <Button type="button" onClick={addFeature}>Tambah</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {feature}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(feature)} />
                </Badge>
              ))}
            </div>
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
