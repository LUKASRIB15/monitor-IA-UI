import { signOutAccountAction } from "@/app/actions/sign-out-account";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSignOutAccount = () => {
  const { removeUser } = useAuthStore();
  const router = useRouter();

  const { mutateAsync: execute } = useMutation({
    mutationFn: signOutAccountAction,
    onSuccess: () => {
      router.refresh();
      removeUser();
    },
  });

  return {
    execute,
  };
};
