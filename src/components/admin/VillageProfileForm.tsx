
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";
import ImageUploadField from "./ImageUploadField";

type VillageProfile = Tables<'village_profile'>;

interface VillageProfileFormProps {
  profile?: VillageProfile;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const VillageProfileForm = ({ profile, onSubmit, onCancel, isLoading }: VillageProfileFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    website_name: profile?.website_name || '',
    description: profile?.description || '',
    visi: profile?.visi || '',
    misi: profile?.misi || '',
    kepala_desa: profile?.kepala_desa || '',
    alamat: profile?.alamat || '',
    photo_url: profile?.photo_url || '',
    video_url: profile?.video_url || '',
    welcome_message: profile?.welcome_message || 'Selamat Datang di',
    maps_url: profile?.maps_url || '',
    latitude: profile?.latitude?.toString() || '',
    longitude: profile?.longitude?.toString() || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.website_name.trim()) {
      toast({
        title: "Error",
        description: "Nama website harus diisi",
        variant: "destructive",
      });
      return;
    }

    const submitData = {
      ...formData,
      latitude: formData.latitude ? parseFloat(formData.latitude) : null,
      longitude: formData.longitude ? parseFloat(formData.longitude) : null,
      updated_at: new Date().toISOString(),
    };

    onSubmit(submitData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profil Desa</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="website_name">Nama Website/Desa</Label>
              <Input
                id="website_name"
                value={formData.website_name}
                onChange={(e) => handleChange('website_name', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="welcome_message">Pesan Selamat Datang</Label>
              <Input
                id="welcome_message"
                value={formData.welcome_message}
                onChange={(e) => handleChange('welcome_message', e.target.value)}
                placeholder="Selamat Datang di"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="alamat">Alamat Desa</Label>
            <Textarea
              id="alamat"
              value={formData.alamat}
              onChange={(e) => handleChange('alamat', e.target.value)}
              rows={3}
              placeholder="Alamat lengkap kantor desa..."
            />
          </div>

          <div>
            <Label htmlFor="video_url">URL Video YouTube</Label>
            <Input
              id="video_url"
              value={formData.video_url}
              onChange={(e) => handleChange('video_url', e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Masukkan URL video YouTube untuk profil desa
            </p>
          </div>

          <div>
            <Label htmlFor="maps_url">URL Google Maps</Label>
            <Input
              id="maps_url"
              value={formData.maps_url}
              onChange={(e) => handleChange('maps_url', e.target.value)}
              placeholder="https://maps.google.com/?q=..."
            />
            <p className="text-sm text-gray-500 mt-1">
              URL Google Maps untuk lokasi desa yang akan terbuka saat diklik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => handleChange('latitude', e.target.value)}
                placeholder="-7.123456"
              />
            </div>

            <div>
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => handleChange('longitude', e.target.value)}
                placeholder="110.123456"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Deskripsi Desa</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="visi">Visi</Label>
              <Textarea
                id="visi"
                value={formData.visi}
                onChange={(e) => handleChange('visi', e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="misi">Misi</Label>
              <Textarea
                id="misi"
                value={formData.misi}
                onChange={(e) => handleChange('misi', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="kepala_desa">Kepala Desa</Label>
            <Input
              id="kepala_desa"
              value={formData.kepala_desa}
              onChange={(e) => handleChange('kepala_desa', e.target.value)}
            />
          </div>

          <div>
            <ImageUploadField
              label="Foto Profil Desa"
              value={formData.photo_url}
              onChange={(url) => handleChange('photo_url', url)}
              folder="village-profile"
            />
          </div>

          <div className="flex gap-2 pt-4">
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

export default VillageProfileForm;
