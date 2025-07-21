// hooks/useKKNPrograms.ts
import { TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from '@/integrations/supabase/client';

export const useKKNPrograms = () => {
  return useQuery({
    queryKey: ["kkn_programs"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("kkn_programs").select("*").order('tanggal', { ascending: false });
        
        if (error) {
          console.error("Query error:", error);
          throw error;
        }
        
        return data;
      } catch (error) {
        console.error("useKKNPrograms error:", error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useCreateKKNProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TablesInsert<"kkn_programs">) => {
      try {
        console.log("Creating KKN program with payload:", payload);

        // Validasi payload sebelum insert
        if (!payload.nama_proker || !payload.deskripsi || !payload.tanggal || !payload.lokasi) {
          throw new Error("Semua field wajib harus diisi");
        }

        // Pastikan photos adalah array yang valid
        const validatedPayload = {
          ...payload,
          photos: Array.isArray(payload.photos) ? payload.photos : [],
        };

        const { data, error } = await supabase
          .from("kkn_programs")
          .insert(validatedPayload)
          .select()
          .single();
        
        if (error) {
          console.error("Insert error:", error);
          throw error;
        }

        console.log("Insert success:", data);
        return data;
      } catch (error) {
        console.error("useCreateKKNProgram error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("Create mutation success:", data);
      queryClient.invalidateQueries({ queryKey: ["kkn_programs"] });
      // Optionally update the cache directly
      queryClient.setQueryData(["kkn_programs"], (old: any) => {
        if (!old) return [data];
        return [data, ...old];
      });
    },
    onError: (error) => {
      console.error("Create mutation error:", error);
    },
  });
};

export const useUpdateKKNProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...values }: TablesUpdate<"kkn_programs"> & { id: string }) => {
      try {
        console.log("Updating KKN program:", id, values);

        if (!id) {
          throw new Error("ID program tidak valid");
        }

        // Validasi data yang akan diupdate
        const validatedValues = {
          ...values,
          photos: Array.isArray(values.photos) ? values.photos : [],
        };

        // Hapus field undefined untuk menghindari error
        Object.keys(validatedValues).forEach(key => {
          if (validatedValues[key as keyof typeof validatedValues] === undefined) {
            delete validatedValues[key as keyof typeof validatedValues];
          }
        });

        const { data, error } = await supabase
          .from("kkn_programs")
          .update(validatedValues)
          .eq("id", id)
          .select()
          .single();
        
        if (error) {
          console.error("Update error:", error);
          throw error;
        }

        if (!data) {
          throw new Error("Data tidak ditemukan atau tidak ada perubahan");
        }

        console.log("Update success:", data);
        return data;
      } catch (error) {
        console.error("useUpdateKKNProgram error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("Update mutation success:", data);
      queryClient.invalidateQueries({ queryKey: ["kkn_programs"] });
      // Optionally update the cache directly
      queryClient.setQueryData(["kkn_programs"], (old: any) => {
        if (!old) return [data];
        return old.map((item: any) => item.id === data.id ? data : item);
      });
    },
    onError: (error) => {
      console.error("Update mutation error:", error);
    },
  });
};

export const useDeleteKKNProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        console.log("Deleting KKN program:", id);

        if (!id) {
          throw new Error("ID program tidak valid");
        }

        const { error } = await supabase
          .from("kkn_programs")
          .delete()
          .eq("id", id);
        
        if (error) {
          console.error("Delete error:", error);
          throw error;
        }

        console.log("Delete success:", id);
        return id;
      } catch (error) {
        console.error("useDeleteKKNProgram error:", error);
        throw error;
      }
    },
    onSuccess: (deletedId) => {
      console.log("Delete mutation success:", deletedId);
      queryClient.invalidateQueries({ queryKey: ["kkn_programs"] });
      // Optionally update the cache directly
      queryClient.setQueryData(["kkn_programs"], (old: any) => {
        if (!old) return [];
        return old.filter((item: any) => item.id !== deletedId);
      });
    },
    onError: (error) => {
      console.error("Delete mutation error:", error);
    },
  });
};