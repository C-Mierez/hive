"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { usePathname } from "next/navigation";
import LoadingAuth from "~/components/auth/loading";
import { env } from "~/env";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

export default function ConvexClientProvider({
  children,
}: ConvexClientProviderProps) {
  return (
    <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <AllowLandingWithoutAuth>{children}</AllowLandingWithoutAuth>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

function AllowLandingWithoutAuth({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Ignore auth when on the landing page
  // Otherwise, check auth and render the appropriate component
  const toRender =
    pathname === "/" ? (
      <>{children}</>
    ) : (
      <>
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <LoadingAuth />
        </AuthLoading>
      </>
    );

  return toRender;
}
