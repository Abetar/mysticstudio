"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session?.user) {
    return (
      <button type="button" onClick={() => signOut()}>
        Cerrar sesión
      </button>
    );
  }

  return (
    <button type="button" onClick={() => signIn("google")}>
      Guardar progreso
    </button>
  );
}