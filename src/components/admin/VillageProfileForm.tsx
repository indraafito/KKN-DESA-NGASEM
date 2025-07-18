import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ImageUploadField from "./ImageUploadField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesUpdate } from "@/integrations/supabase/types";

type VillageProfile = Tables<"village_profile">;
type VillageProfileUpdate = TablesUpdate<"village_profile">;

interface VillageProfileFormProps {
  profile?: VillageProfile;
  onCancel: () => void;
}

const VillageProfileForm = ({ profile, onCancel }: VillageProfileFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    visi: profile?.visi || "",
    misi: profile?.misi || "",
    kepala_desa: profile?.kepala_desa || "",
    photo_url: profile?.photo_url || "",
    video_url: profile?.video_url || "",
    welcome_message: profile?.welcome_message || "Selamat Datang di",
    maps_url: profile?.maps_url || "",
  });

  const updateMutation = useMutation({
    mutationFn: async (data: VillageProfileUpdate & { id: string }) => {
      const { id, ...profileData } = data;
      const { error } = await supabase
        .from("village_profile")
        .update(profileData)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["village_profile"] });

      toast({
        title: "Berhasil!",
        description: "Profil desa berhasil disimpan",
      });

      // ✅ Tutup modal setelah sukses
      onCancel();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.message || "Terjadi kesalahan saat menyimpan profil desa",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.kepala_desa.trim()) {
      toast({
        title: "Error",
        description: "Nama Kepala Desa harus diisi",
        variant: "destructive",
      });
      return;
    }
    if (!formData.visi.trim()) {
      toast({
        title: "Error",
        description: "Visi desa harus diisi",
        variant: "destructive",
      });
      return;
    }
    if (!formData.misi.trim()) {
      toast({
        title: "Error",
        description: "Misi desa harus diisi",
        variant: "destructive",
      });
      return;
    }
    if (formData.video_url && !isValidYouTubeUrl(formData.video_url)) {
      toast({
        title: "Error",
        description: "URL YouTube tidak valid",
        variant: "destructive",
      });
      return;
    }
    if (formData.maps_url && !isValidGoogleMapsUrl(formData.maps_url)) {
      toast({
        title: "Error",
        description: "URL Google Maps tidak valid",
        variant: "destructive",
      });
      return;
    }

    if (!profile?.id) {
      toast({
        title: "Error",
        description: "ID profil desa tidak ditemukan",
        variant: "destructive",
      });
      return;
    }

    updateMutation.mutate({
      id: profile.id,
      ...formData,
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValidYouTubeUrl = (url: string): boolean => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]+/;
    return youtubeRegex.test(url);
  };

  const isValidGoogleMapsUrl = (url: string): boolean => {
    const mapsRegex =
      /^https?:\/\/(www\.)?(maps\.google|google\.com\/maps|maps\.app\.goo\.gl|goo\.gl\/maps)/;
    return mapsRegex.test(url);
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
              <Label htmlFor="welcome_message">Pesan Selamat Datang</Label>
              <Input
                id="welcome_message"
                value={formData.welcome_message}
                onChange={(e) =>
                  handleChange("welcome_message", e.target.value)
                }
              />
            </div>
          </div>

          <div>
            <Label htmlFor="video_url">URL Video YouTube</Label>
            <Input
              id="video_url"
              value={formData.video_url}
              onChange={(e) => handleChange("video_url", e.target.value)}
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
              onChange={(e) => handleChange("maps_url", e.target.value)}
              placeholder="https://maps.google.com/?q=..."
            />
            <p className="text-sm text-gray-500 mt-1">
              URL Google Maps untuk lokasi desa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="visi">Visi *</Label>
              <Textarea
                id="visi"
                value={formData.visi}
                onChange={(e) => handleChange("visi", e.target.value)}
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="misi">Misi *</Label>
              <Textarea
                id="misi"
                value={formData.misi}
                onChange={(e) => handleChange("misi", e.target.value)}
                rows={3}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="kepala_desa">Kepala Desa *</Label>
            <Input
              id="kepala_desa"
              value={formData.kepala_desa}
              onChange={(e) => handleChange("kepala_desa", e.target.value)}
              required
            />
          </div>

          <div>
            <ImageUploadField
              label="Foto Profil Desa"
              value={formData.photo_url}
              onChange={(url) => handleChange("photo_url", url)}
              folder="village-profile"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Menyimpan..." : "Simpan"}
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
