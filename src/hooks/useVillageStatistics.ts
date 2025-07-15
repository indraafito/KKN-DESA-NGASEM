
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type VillageStatistic = Tables<'village_statistics'>;
type VillageStatisticInsert = TablesInsert<'village_statistics'>;
type VillageStatisticUpdate = TablesUpdate<'village_statistics'>;

export const useVillageStatistics = () => {
  return useQuery({
    queryKey: ['village_statistics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('village_statistics')
        .select('*')
        .eq('status', 'active')
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data as VillageStatistic[];
    },
  });
};

export const useCreateVillageStatistic = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: VillageStatisticInsert) => {
      const { data: result, error } = await supabase
        .from('village_statistics')
        .insert(data)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['village_statistics'] });
    },
  });
};

export const useUpdateVillageStatistic = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...data }: VillageStatisticUpdate & { id: string }) => {
      const { data: result, error } = await supabase
        .from('village_statistics')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['village_statistics'] });
    },
  });
};

export const useDeleteVillageStatistic = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('village_statistics')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['village_statistics'] });
    },
  });
};
