import { useGoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { qk } from "../../../Constants/QueryConstants/queryKeys.ts";
import { GOOGLE_LOGIN } from "../../../Constants/RequestConstants/paths.ts";
import type { UserType } from "../../../Types/User/UserType.ts";

export function useGoogleAuthEntry() {
  const queryClient = useQueryClient();
  return useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        const res = await fetch(GOOGLE_LOGIN, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: codeResponse.code }),
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Login failed: ${res.status}`);
        const user: UserType = await res.json();
        queryClient.setQueryData(qk.user(user.id), user);
        queryClient.setQueryData(qk.currentUser(), user);
        if (user.currentCourseId == null) {
          window.location.href = "/auth/courses";
        } else {
          window.location.href = "/";
        }
      } catch (err) {
        console.error("Login error:", err);
      }
    },
    onError: (err) => console.error("Google login failed", err),
  });
}