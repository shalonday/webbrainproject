import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../services/apiLogin";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address"
      );
    },
    onError: (err) => {
      console.log("ERROR", err);
    },
  });

  return { signup, isLoading };
}
