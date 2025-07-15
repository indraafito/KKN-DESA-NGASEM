
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

type VillageStatistic = Tables<'village_statistics'>;

interface VillageStatisticFormProps {
  statistic?: VillageStatistic;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const iconOptions = [
  { value: 'Users', label: 'Users (Penduduk)' },
  { value: 'MapPin', label: 'MapPin (Lokasi)' },
  { value: 'Home', label: 'Home (Rumah)' },
  { value: 'Building', label: 'Building (Gedung)' },
  { value: 'Award', label: 'Award (Penghargaan)' },
  { value: 'Calendar', label: 'Calendar (Kalender)' },
  { value: 'Star', label: 'Star (Bintang)' },
  { value: 'Heart', label: 'Heart (Hati)' },
];

const colorOptions = [
  { value: 'from-emerald-500 to-emerald-600', label: 'Emerald (Hijau)' },
  { value: 'from-stone-500 to-stone-600', label: 'Stone (Abu-abu)' },
  { value: 'from-amber-500 to-amber-600', label: 'Amber (Kuning)' },
  { value: 'from-teal-500 to-teal-600', label: 'Teal (Biru Hijau)' },
  { value: 'from-blue-500 to-blue-600', label: 'Blue (Biru)' },
  { value: 'from-red-500 to-red-600', label: 'Red (Merah)' },
  { value: 'from-purple-500 to-purple-600', label: 'Purple (Ungu)' },
  { value: 'from-orange-500 to-orange-600', label: 'Orange (Orange)' },
];

const VillageStatisticForm = ({ statistic, onSubmit, onCancel, isLoading }: VillageStatisticFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    label: statistic?.label || '',
    value: statistic?.value || '',
    icon: statistic?.icon || 'Users',
    color_class: statistic?.color_class || 'from-emerald-500 to-emerald-600',
    order_index: statistic?.order_index?.toString() || '0',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.label.trim() || !formData.value.trim()) {
      toast({
        title: "Error",
        description: "Label dan nilai harus diisi",
        variant: "destructive",
      });
      return;
    }

    const submitData = {
      ...formData,
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
        <CardTitle>{statistic ? 'Edit' : 'Tambah'} Statistik Desa</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) => handleChange('label', e.target.value)}
                placeholder="Contoh: Penduduk"
                required
              />
            </div>

            <div>
              <Label htmlFor="value">Nilai</Label>
              <Input
                id="value"
                value={formData.value}
                onChange={(e) => handleChange('value', e.target.value)}
                placeholder="Contoh: 2,456"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="icon">Ikon</Label>
              <Select value={formData.icon} onValueChange={(value) => handleChange('icon', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih ikon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="color_class">Warna</Label>
              <Select value={formData.color_class} onValueChange={(value) => handleChange('color_class', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih warna" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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

export default VillageStatisticForm;
