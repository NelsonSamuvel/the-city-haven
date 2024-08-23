import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signUp, isPending: isSigningIn } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUpApi({ fullName, email, password }),

    onSuccess: (data) => {
      console.log(data);
      toast.success("User Created Successfully Please verify your email");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signUp, isSigningIn };
}
