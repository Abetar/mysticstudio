"use client";

import { SessionProvider } from "next-auth/react";
import { EssenceProvider } from "@/features/essence/components/EssenceProvider";
import IdentityMergeOnLogin from "@/features/identity/components/IdentityMergeOnLogin";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <EssenceProvider>
        <IdentityMergeOnLogin />
        {children}
      </EssenceProvider>
    </SessionProvider>
  );
}