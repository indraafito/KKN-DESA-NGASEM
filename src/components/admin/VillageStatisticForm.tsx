import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/integrations/supabase/types";

// Tipe
type VillageStatistic = Tables<"village_statistics">;
type VillageStatisticInsert = TablesInsert<"village_statistics">;
type VillageStatisticUpdate = TablesUpdate<"village_statistics">;

interface VillageStatisticFormProps {
  statistic?: VillageStatistic; // untuk mode edit
  onCancel: () => void; // untuk menutup modal
}

// Opsi ikon dan warna
const iconOptions = [
  { value: "Users", label: "Users (Penduduk)" },
  { value: "MapPin", label: "MapPin (Lokasi)" },
  { value: "Home", label: "Home (Rumah)" },
  { value: "Building", label: "Building (Gedung)" },
  { value: "Award", label: "Award (Penghargaan)" },
  { value: "Calendar", label: "Calendar (Kalender)" },
  { value: "Star", label: "Star (Bintang)" },
  { value: "Heart", label: "Heart (Hati)" },
];

const colorOptions = [
  { value: "from-emerald-500 to-emerald-600", label: "Emerald (Hijau)" },
  { value: "from-stone-500 to-stone-600", label: "Stone (Abu-abu)" },
  { value: "from-amber-500 to-amber-600", label: "Amber (Kuning)" },
  { value: "from-teal-500 to-teal-600", label: "Teal (Biru Hijau)" },
  { value: "from-blue-500 to-blue-600", label: "Blue (Biru)" },
  { value: "from-red-500 to-red-600", label: "Red (Merah)" },
  { value: "from-purple-500 to-purple-600", label: "Purple (Ungu)" },
  { value: "from-orange-500 to-orange-600", label: "Orange (Oranye)" },
];

const VillageStatisticForm = ({
  statistic,
  onCancel,
}: VillageStatisticFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(statistic);

  const [formData, setFormData] = useState({
    label: "",
    value: "",
    icon: "Users",
    color_class: "from-emerald-500 to-emerald-600",
    order_index: "0",
  });

  // Set nilai awal saat mode edit
  useEffect(() => {
    if (statistic) {
      setFormData({
        label: statistic.label || "",
        value: statistic.value || "",
        icon: statistic.icon || "Users",
        color_class: statistic.color_class || "from-emerald-500 to-emerald-600",
        order_index: statistic.order_index?.toString() || "0",
      });
    }
  }, [statistic]);

  const mutation = useMutation({
    mutationFn: async (
      data: VillageStatisticInsert | (VillageStatisticUpdate & { id?: string })
    ) => {
      // Validasi agar tidak kirim data yang tidak lengkap ke Supabase
      if (!data.label || !data.value) {
        throw new Error("Kolom 'label' dan 'value' wajib diisi.");
      }

      const payload = {
        ...data,
        label: data.label, // dipastikan tidak undefined karena sudah divalidasi
        value: data.value,
        order_index: parseInt(data.order_index?.toString() || "0"),
        updated_at: new Date().toISOString(),
      };

      // Mode edit
      if (isEditMode && statistic?.id) {
        const { data: updated, error } = await supabase
          .from("village_statistics")
          .update(payload)
          .eq("id", statistic.id)
          .select()
          .single();

        if (error) throw error;
        return updated;
      }
      // Mode tambah
      else {
        const { data: inserted, error } = await supabase
          .from("village_statistics")
          .insert(payload)
          .select()
          .single();

        if (error) throw error;
        return inserted;
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["village_statistics"] });

      toast({
        title: "Berhasil",
        description: `Statistik berhasil ${
          isEditMode ? "diperbarui" : "ditambahkan"
        }.`,
      });

      onCancel(); // Tutup modal
    },

    onError: (error: any) => {
      toast({
        title: "Gagal menyimpan",
        description: error?.message || "Terjadi kesalahan saat menyimpan data.",
        variant: "destructive",
      });
    },
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.label.trim() || !formData.value.trim()) {
      toast({
        title: "Error",
        description: "Label dan nilai harus diisi.",
        variant: "destructive",
      });
      return;
    }
    const payload = {
      ...formData,
      order_index: parseInt(formData.order_index || "0"), // default ke 0 kalau kosong
    };

    await mutation.mutateAsync(payload);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditMode ? "Edit" : "Tambah"} Statistik Desa</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) => handleChange("label", e.target.value)}
                placeholder="Contoh: Penduduk"
                required
              />
            </div>

            <div>
              <Label htmlFor="value">Nilai</Label>
              <Input
                id="value"
                value={formData.value}
                onChange={(e) => handleChange("value", e.target.value)}
                placeholder="Contoh: 2,456"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="icon">Ikon</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) => handleChange("icon", value)}
              >
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
              <Select
                value={formData.color_class}
                onValueChange={(value) => handleChange("color_class", value)}
              >
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
              onChange={(e) => handleChange("order_index", e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="flex gap-2 pt-4">
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

export default VillageStatisticForm;
