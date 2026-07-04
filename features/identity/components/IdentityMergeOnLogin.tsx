"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

import { getAnonymousId } from "@/features/essence/client/anonymousId";
import { useEssenceWallet } from "@/features/essence/hooks/useEssenceWallet";

export default function IdentityMergeOnLogin() {
  const { status } = useSession();
  const { refreshWallet } = useEssenceWallet();
  const hasMergedRef = useRef(false);

  useEffect(() => {
    async function mergeIdentity() {
      if (status !== "authenticated") return;
      if (hasMergedRef.current) return;

      const anonymousId = getAnonymousId();

      if (!anonymousId) return;

      hasMergedRef.current = true;

      const response = await fetch("/api/identity/merge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          anonymousId,
        }),
      });

      if (response.ok) {
        await refreshWallet();
      }
    }

    void mergeIdentity();
  }, [status, refreshWallet]);

  return null;
}