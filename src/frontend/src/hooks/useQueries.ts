import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useSubmitContact() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      projectType,
      message,
    }: {
      name: string;
      email: string;
      phone: string;
      projectType: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.submitContact(name, email, phone, projectType, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
  });
}
