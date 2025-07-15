
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type KKNProgram = Tables<'kkn_programs'>;
type KKNProgramInsert = TablesInsert<'kkn_programs'>;
type KKNProgramUpdate = TablesUpdate<'kkn_programs'>;

export const useKKNPrograms = () => {
  return useQuery({
    queryKey: ['kkn-programs'],
    queryFn: async (): Promise<KKNProgram[]> => {
      const { data, error } = await supabase
        .from('kkn_programs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useCreateKKNProgram = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (program: KKNProgramInsert) => {
      const { data, error } = await supabase
        .from('kkn_programs')
        .insert(program)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kkn-programs'] });
    },
  });
};

export const useUpdateKKNProgram = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & KKNProgramUpdate) => {
      const { data, error } = await supabase
        .from('kkn_programs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kkn-programs'] });
    },
  });
};

export const useDeleteKKNProgram = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('kkn_programs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kkn-programs'] });
    },
  });
};
