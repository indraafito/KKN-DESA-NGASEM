
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

type Service = Tables<'services'>;

interface ServiceFormProps {
  service?: Service;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ServiceForm = ({ service, onSubmit, onCancel, isLoading }: ServiceFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: service?.name || '',
    description: service?.description || '',
    requirements: service?.requirements || '',
    process_time: service?.process_time || '',
    link: service?.link || '',
    status: service?.status || 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Nama layanan harus diisi",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      ...formData,
      updated_at: new Date().toISOString(),
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{service ? 'Edit Layanan' : 'Tambah Layanan Baru'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nama Layanan</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
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
            <Label htmlFor="requirements">Persyaratan</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => handleChange('requirements', e.target.value)}
              rows={3}
              placeholder="Pisahkan setiap persyaratan dengan koma"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="process_time">Waktu Proses</Label>
              <Input
                id="process_time"
                value={formData.process_time}
                onChange={(e) => handleChange('process_time', e.target.value)}
                placeholder="e.g. 1-2 hari kerja"
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

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Menyimpan...' : (service ? 'Update' : 'Simpan')}
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

export default ServiceForm;
