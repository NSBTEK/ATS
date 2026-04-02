import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';

export function useCurrentUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => localClient.auth.me(),
    staleTime: 5 * 60 * 1000,
  });
  return { user, isLoading };
}
