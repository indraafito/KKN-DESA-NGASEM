
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";
import ImageUploadField from "./ImageUploadField";

type News = Tables<'news'>;

interface NewsFormProps {
  news?: News;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const NewsForm = ({ news, onSubmit, onCancel, isLoading }: NewsFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: news?.title || '',
    content: news?.content || '',
    excerpt: news?.excerpt || '',
    category: news?.category || 'umum',
    image_url: news?.image_url || '',
    priority: news?.priority || 'medium',
    status: news?.status || 'published',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Judul berita harus diisi",
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
        <CardTitle>{news ? 'Edit Berita' : 'Tambah Berita Baru'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Judul Berita</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="excerpt">Ringkasan</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              rows={2}
              placeholder="Ringkasan singkat berita..."
            />
          </div>

          <ImageUploadField
            label="Foto Berita"
            value={formData.image_url}
            onChange={(url) => handleChange('image_url', url)}
            folder="news"
          />

          <div>
            <Label htmlFor="content">Isi Berita</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              rows={8}
              placeholder="Tulis isi berita lengkap di sini..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="category">Kategori</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="umum">Umum</SelectItem>
                  <SelectItem value="pembangunan">Pembangunan</SelectItem>
                  <SelectItem value="kesehatan">Kesehatan</SelectItem>
                  <SelectItem value="pendidikan">Pendidikan</SelectItem>
                  <SelectItem value="ekonomi">Ekonomi</SelectItem>
                  <SelectItem value="sosial">Sosial</SelectItem>
                  <SelectItem value="budaya">Budaya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Prioritas</Label>
              <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Rendah</SelectItem>
                  <SelectItem value="medium">Sedang</SelectItem>
                  <SelectItem value="high">Tinggi</SelectItem>
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
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Menyimpan...' : (news ? 'Update' : 'Simpan')}
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

export default NewsForm;
