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

type CommunityProgram = Tables<"community_programs">;

interface CommunityProgramFormProps {
  program?: CommunityProgram;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const CommunityProgramForm = ({
  program,
  onSubmit,
  onCancel,
  isLoading,
}: CommunityProgramFormProps) => {
  const [formData, setFormData] = useState({
    title: program?.title || "",
    schedule: program?.schedule || "",
    description: program?.description || "",
    location: program?.location || "",
    status: program?.status || "active",
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof onSubmit !== "function") {
      console.error("Prop onSubmit belum diberikan ke CommunityProgramForm");
      return;
    }

    try {
      await onSubmit(formData); // ← panggilan ke parent
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      // tampilkan feedback supaya user tahu ada masalah
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {program
            ? "Edit Program Kemasyarakatan"
            : "Tambah Program Kemasyarakatan"}
        </CardTitle>
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
              placeholder="Contoh: Setiap Minggu ke-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Lokasi</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Contoh: Balai Desa"
            />
          </div>

          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
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
