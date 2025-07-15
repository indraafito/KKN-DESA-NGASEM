
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type CommunityProgram = Tables<'community_programs'>;
type CommunityProgramInsert = TablesInsert<'community_programs'>;
type CommunityProgramUpdate = TablesUpdate<'community_programs'>;

export const useCommunityPrograms = () => {
  return useQuery({
    queryKey: ['community-programs'],
    queryFn: async (): Promise<CommunityProgram[]> => {
      const { data, error } = await supabase
        .from('community_programs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useCreateCommunityProgram = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (program: CommunityProgramInsert) => {
      const { data, error } = await supabase
        .from('community_programs')
        .insert(program)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-programs'] });
    },
  });
};

export const useUpdateCommunityProgram = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & CommunityProgramUpdate) => {
      const { data, error } = await supabase
        .from('community_programs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-programs'] });
    },
  });
};

export const useDeleteCommunityProgram = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('community_programs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-programs'] });
    },
  });
};

