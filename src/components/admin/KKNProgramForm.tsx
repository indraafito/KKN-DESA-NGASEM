import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type KKNProgram = Tables<"kkn_programs">;

interface KKNProgramFormProps {
  program?: KKNProgram;
  onCancel: () => void;
  onSuccess?: () => void; // untuk menutup modal atau refresh list
}

const KKNProgramForm = ({ program, onCancel, onSuccess }: KKNProgramFormProps) => {
  const [formData, setFormData] = useState({
    title: program?.title || "",
    period: program?.period || "",
    description: program?.description || "",
    participants: program?.participants || 0,
    status: program?.status || "active",
  });

  const [activities, setActivities] = useState<string[]>(program?.activities || []);
  const [newActivity, setNewActivity] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ...formData,
        activities,
        participants: Number(formData.participants),
      };

      if (program?.id) {
        const { error } = await supabase
          .from("kkn_programs")
          .update(payload)
          .eq("id", program.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("kkn_programs").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: `Program KKN berhasil ${program ? "diperbarui" : "ditambahkan"}.`,
      });
      queryClient.invalidateQueries({ queryKey: ["kkn-programs"] });
      onSuccess?.(); // misalnya untuk menutup modal
    },
    onError: () => {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menyimpan data.",
        variant: "destructive",
      });
    },
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addActivity = () => {
    if (newActivity.trim() && !activities.includes(newActivity.trim())) {
      setActivities([...activities, newActivity.trim()]);
      setNewActivity("");
    }
  };

  const removeActivity = (activity: string) => {
    setActivities(activities.filter((a) => a !== activity));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutation.mutateAsync();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{program ? "Edit Program KKN" : "Tambah Program KKN"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Judul Program</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="period">Periode</Label>
            <Input
              id="period"
              value={formData.period}
              onChange={(e) => handleChange("period", e.target.value)}
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
              onChange={(e) => handleChange("participants", e.target.value)}
              min="0"
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
                <SelectValue placeholder="Pilih status" />
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
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addActivity())}
              />
              <Button type="button" onClick={addActivity}>
                Tambah
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activities.map((activity, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {activity}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeActivity(activity)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Menyimpan..." : "Simpan"}
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
