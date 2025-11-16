import { signUp } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export function useUsignUp() {
  return useMutation({
    mutationFn: signUp,
  });
}
