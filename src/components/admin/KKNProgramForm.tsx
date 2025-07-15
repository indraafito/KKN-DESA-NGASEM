
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Tables } from '@/integrations/supabase/types';

type KKNProgram = Tables<'kkn_programs'>;

interface KKNProgramFormProps {
  program?: KKNProgram;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const KKNProgramForm = ({ program, onSubmit, onCancel, isLoading }: KKNProgramFormProps) => {
  const [formData, setFormData] = useState({
    title: program?.title || '',
    period: program?.period || '',
    description: program?.description || '',
    participants: program?.participants || 0,
    status: program?.status || 'active',
  });

  const [activities, setActivities] = useState<string[]>(program?.activities || []);
  const [newActivity, setNewActivity] = useState('');

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addActivity = () => {
    if (newActivity.trim() && !activities.includes(newActivity.trim())) {
      setActivities([...activities, newActivity.trim()]);
      setNewActivity('');
    }
  };

  const removeActivity = (activity: string) => {
    setActivities(activities.filter(a => a !== activity));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      activities,
      participants: Number(formData.participants),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{program ? 'Edit Program KKN' : 'Tambah Program KKN'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Judul Program</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="period">Periode</Label>
            <Input
              id="period"
              value={formData.period}
              onChange={(e) => handleChange('period', e.target.value)}
              placeholder="Contoh: Juli - Agustus 2024"
              required
            />
          </div>

          <div>
            <Label htmlFor="participants">Jumlah Peserta</Label>
            <Input
              id="participants"
              type="number"
              value={formData.participants}
              onChange={(e) => handleChange('participants', e.target.value)}
              min="0"
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
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
                <SelectItem value="completed">Selesai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Kegiatan</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                placeholder="Tambah kegiatan..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addActivity())}
              />
              <Button type="button" onClick={addActivity}>Tambah</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activities.map((activity, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {activity}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeActivity(activity)} />
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

export default KKNProgramForm;
