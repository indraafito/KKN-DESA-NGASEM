import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/integrations/supabase/types";

type CommunityProgram = Tables<"community_programs">;
type CommunityProgramInsert = TablesInsert<"community_programs">;
type CommunityProgramUpdate = TablesUpdate<"community_programs">;

/**
 * GET all community programs
 */
export const useCommunityPrograms = (
  options?: Partial<UseQueryOptions<CommunityProgram[], Error>>
) => {
  return useQuery({
    queryKey: ["community-programs"],
    queryFn: async (): Promise<CommunityProgram[]> => {
      const { data, error } = await supabase
        .from("community_programs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching community programs:", error.message);
        throw error;
      }

      return data ?? [];
    },
    ...options,
  });
};

/**
 * GET single program by ID
 */
export const useCommunityProgramById = (
  id: string,
  options?: Partial<UseQueryOptions<CommunityProgram, Error>>
) => {
  return useQuery({
    queryKey: ["community-programs", id],
    queryFn: async (): Promise<CommunityProgram> => {
      const { data, error } = await supabase
        .from("community_programs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching program by ID:", error.message);
        throw error;
      }

      return data;
    },
    enabled: !!id,
    ...options,
  });
};

/**
 * CREATE program
 */
export const useCreateCommunityProgram = (
  options?: UseMutationOptions<CommunityProgram, Error, CommunityProgramInsert>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (program: CommunityProgramInsert) => {
      const { data, error } = await supabase
        .from("community_programs")
        .insert(program)
        .select()
        .single();

      if (error) {
        console.error("Error creating program:", error.message);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-programs"] });
    },
    ...options,
  });
};

/**
 * UPDATE program
 */
export const useUpdateCommunityProgram = (
  options?: UseMutationOptions<
    CommunityProgram,
    Error,
    { id: string } & CommunityProgramUpdate
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }) => {
      const { data, error } = await supabase
        .from("community_programs")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating program:", error.message);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-programs"] });
    },
    ...options,
  });
};

/**
 * DELETE program
 */
export const useDeleteCommunityProgram = (
  options?: UseMutationOptions<void, Error, string>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("community_programs")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting program:", error.message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-programs"] });
    },
    ...options,
  });
};
