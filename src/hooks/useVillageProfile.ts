
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesUpdate } from '@/integrations/supabase/types';

type VillageProfile = Tables<'village_profile'>;
type VillageProfileUpdate = TablesUpdate<'village_profile'>;

export const useVillageProfile = () => {
  return useQuery({
    queryKey: ['village_profile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('village_profile')
        .select('*')
        .single();
      
      if (error) throw error;
      return data as VillageProfile;
    },
  });
};

export const useUpdateVillageProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...profileData }: VillageProfileUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('village_profile')
        .update(profileData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['village_profile'] });
    },
  });
};
