import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";

// Function to handle user login
async function login(form: FormEvent<HTMLFormElement>) {
  form.preventDefault();
  const formData = new FormData(form.target as unknown as HTMLFormElement);

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) return;

  const nonce = await getServerNonce();

  const response = await fetch("/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
      nonce,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json()
  if (!response.ok) {
    throw new Error(responseJson.message)
  }
  return responseJson
}

const getServerNonce = async () => {
  const nonce = await fetch("/nonce");
  const nonceJson = await nonce.json();
  return nonceJson.nonce;
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormEvent<HTMLFormElement>) => login(formData),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["user-info"],
      }),
  });
};
