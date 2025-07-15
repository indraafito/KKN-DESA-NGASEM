
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type VillageOfficial = Tables<'village_officials'>;
type VillageOfficialInsert = TablesInsert<'village_officials'>;
type VillageOfficialUpdate = TablesUpdate<'village_officials'>;

export const useVillageOfficials = () => {
  return useQuery({
    queryKey: ['village_officials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('village_officials')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data as VillageOfficial[];
    },
  });
};

export const useCreateVillageOfficial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (officialData: VillageOfficialInsert) => {
      const { data, error } = await supabase
        .from('village_officials')
        .insert(officialData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['village_officials'] });
    },
  });
};

export const useUpdateVillageOfficial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...officialData }: VillageOfficialUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('village_officials')
        .update(officialData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['village_officials'] });
    },
  });
};

export const useDeleteVillageOfficial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('village_officials')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['village_officials'] });
    },
  });
};
