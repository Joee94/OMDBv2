import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";

// Function to securely hash passwords with a unique salt
function hashPassword(
  password: string,
  salt: Uint8Array,
  nonce: Uint8Array,
  cnonce: Uint8Array
) {
  const encoder = new TextEncoder();
  const hashBuffer = encoder.encode(password + nonce + cnonce + salt);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

// Function to generate a unique salt
function generateSalt(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(16)); // You may adjust the salt length as needed
}

// Function to handle user login
async function login(form: FormEvent<HTMLFormElement>) {
  form.preventDefault();
  const formData = new FormData(form.target as unknown as HTMLFormElement);

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) return;

  const nonce = await getServerNonce();
  const cnonce = generateNonce();
  const salt = generateSalt();

  const hashedPassword = hashPassword(password, salt, nonce, cnonce);

  await fetch("/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password: hashedPassword,
      nonce,
      cnonce,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Function to generate a nonce
function generateNonce(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(16)); // You may adjust the nonce length as needed
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
