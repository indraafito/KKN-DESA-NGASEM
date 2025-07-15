
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Facility = Tables<'facilities'>;
type FacilityInsert = TablesInsert<'facilities'>;
type FacilityUpdate = TablesUpdate<'facilities'>;

export const useFacilities = () => {
  return useQuery({
    queryKey: ['facilities'],
    queryFn: async (): Promise<Facility[]> => {
      const { data, error } = await supabase
        .from('facilities')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useCreateFacility = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (facility: FacilityInsert) => {
      const { data, error } = await supabase
        .from('facilities')
        .insert(facility)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
    },
  });
};

export const useUpdateFacility = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & FacilityUpdate) => {
      const { data, error } = await supabase
        .from('facilities')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
    },
  });
};

export const useDeleteFacility = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('facilities')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
    },
  });
};
