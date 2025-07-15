
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";
import ImageUploadField from "./ImageUploadField";

type VillageAchievement = Tables<'village_achievements'>;

interface VillageAchievementFormProps {
  achievement?: VillageAchievement;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const VillageAchievementForm = ({ achievement, onSubmit, onCancel, isLoading }: VillageAchievementFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: achievement?.title || '',
    description: achievement?.description || '',
    image_url: achievement?.image_url || '',
    achievement_date: achievement?.achievement_date || '',
    order_index: achievement?.order_index?.toString() || '0',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Judul prestasi harus diisi",
        variant: "destructive",
      });
      return;
    }

    const submitData = {
      ...formData,
      achievement_date: formData.achievement_date || null,
      order_index: parseInt(formData.order_index) || 0,
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
        <CardTitle>{achievement ? 'Edit' : 'Tambah'} Prestasi Desa</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Judul Prestasi</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Contoh: Juara 1 Desa Terbersih"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Deskripsi prestasi..."
              rows={3}
            />
          </div>

          <div>
            <ImageUploadField
              label="Foto Prestasi"
              value={formData.image_url}
              onChange={(url) => handleChange('image_url', url)}
              folder="achievements"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="achievement_date">Tanggal Prestasi</Label>
              <Input
                id="achievement_date"
                type="date"
                value={formData.achievement_date}
                onChange={(e) => handleChange('achievement_date', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="order_index">Urutan</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => handleChange('order_index', e.target.value)}
                placeholder="0"
              />
            </div>
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

export default VillageAchievementForm;
