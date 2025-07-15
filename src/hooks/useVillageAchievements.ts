
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type VillageAchievement = Tables<'village_achievements'>;
type VillageAchievementInsert = TablesInsert<'village_achievements'>;
type VillageAchievementUpdate = TablesUpdate<'village_achievements'>;

export const useVillageAchievements = () => {
  return useQuery({
    queryKey: ['village_achievements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('village_achievements')
        .select('*')
        .eq('status', 'active')
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data as VillageAchievement[];
    },
  });
};

export const useCreateVillageAchievement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: VillageAchievementInsert) => {
      const { data: result, error } = await supabase
        .from('village_achievements')
        .insert(data)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['village_achievements'] });
    },
  });
};

export const useUpdateVillageAchievement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...data }: VillageAchievementUpdate & { id: string }) => {
      const { data: result, error } = await supabase
        .from('village_achievements')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['village_achievements'] });
    },
  });
};

export const useDeleteVillageAchievement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('village_achievements')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['village_achievements'] });
    },
  });
};
