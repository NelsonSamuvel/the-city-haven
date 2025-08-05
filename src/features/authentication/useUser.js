import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, isAuthenticated: user?.role === "authenticated", user };
}

export function useCreateUser() {
  const { mutateAsync: createNewUser, isPending } = useMutation({
    mutationFn: ({ email, password, display_name }) => {
      createUser({ email, password, display_name });
    },
    onSuccess: () => {
      toast.success("User created successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createNewUser, isPending };
}
