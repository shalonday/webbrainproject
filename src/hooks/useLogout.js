import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../services/apiLogin";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => navigate("/", { replace: true }),
  });

  return { logout, isLoading };
}
