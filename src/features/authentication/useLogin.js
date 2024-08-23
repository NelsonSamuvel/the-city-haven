import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLogging } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: ({ user }) => {
      toast.success("Logged In successfully");
      queryClient.setQueryData(["user"], user);

      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Email or Password is incorrect");
    },
  });

  return { login, isLogging };
}
