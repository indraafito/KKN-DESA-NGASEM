
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type ServiceApplication = Tables<'service_applications'>;
type ServiceApplicationInsert = TablesInsert<'service_applications'>;
type ServiceApplicationUpdate = TablesUpdate<'service_applications'>;

export const useServiceApplications = () => {
  return useQuery({
    queryKey: ['service_applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_applications')
        .select(`
          *,
          services (
            name
          )
        `)
        .order('submitted_at', { ascending: false });
      
      if (error) throw error;
      return data as (ServiceApplication & { services: { name: string } })[];
    },
  });
};

export const useCreateServiceApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (applicationData: ServiceApplicationInsert) => {
      const { data, error } = await supabase
        .from('service_applications')
        .insert(applicationData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service_applications'] });
    },
  });
};

export const useUpdateServiceApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...applicationData }: ServiceApplicationUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('service_applications')
        .update(applicationData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service_applications'] });
    },
  });
};

export const useDeleteServiceApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('service_applications')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service_applications'] });
    },
  });
};
