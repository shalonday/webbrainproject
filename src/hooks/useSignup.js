import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../services/apiLogin";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please check your email for the confirmation link to verify your account."
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signup, isPending };
}
