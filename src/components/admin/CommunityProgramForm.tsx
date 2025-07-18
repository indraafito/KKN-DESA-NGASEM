import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tables } from "@/integrations/supabase/types";
import {
  useCreateCommunityProgram,
  useUpdateCommunityProgram,
} from "@/hooks/useCommunityPrograms";
import { useToast } from "@/hooks/use-toast";

type CommunityProgram = Tables<"community_programs">;

interface CommunityProgramFormProps {
  program?: CommunityProgram;
  onCancel: () => void; // untuk menutup modal
}

const CommunityProgramForm = ({ program, onCancel }: CommunityProgramFormProps) => {
  const toast = useToast();

  const createMutation = useCreateCommunityProgram();
  const updateMutation = useUpdateCommunityProgram();

  const [formData, setFormData] = useState({
    title: program?.title || "",
    schedule: program?.schedule || "",
    description: program?.description || "",
    location: program?.location || "",
    status: program?.status || "active",
  });

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.title.trim() || !formData.schedule.trim()) {
        toast({
          title: "Gagal",
          description: "Nama program dan jadwal harus diisi.",
          variant: "destructive",
        });
        return;z
      }

      if (program) {
        await updateMutation.mutateAsync({ id: program.id, ...formData });
        toast({
          title: "Berhasil",
          description: "Program berhasil diperbarui.",
        });
      } else {
        await createMutation.mutateAsync(formData);
        toast({
          title: "Berhasil",
          description: "Program berhasil ditambahkan.",
        });
      }

      onCancel(); // TUTUP MODAL SAAT BERHASIL
    } catch (err: any) {
      toast({
        title: "Terjadi kesalahan",
        description: err.message || "Gagal menyimpan data.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{program ? "Edit Program" : "Tambah Program"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Nama Program</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="schedule">Jadwal</Label>
            <Input
              id="schedule"
              value={formData.schedule}
              onChange={(e) => handleChange("schedule", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Lokasi</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan"}
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

export default CommunityProgramForm;
