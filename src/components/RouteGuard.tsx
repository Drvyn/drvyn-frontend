"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface RouteGuardProps {
  children: React.ReactNode;
  requiredData: string | string[];
  redirectTo: string;
}

const RouteGuard = ({ children, requiredData, redirectTo }: RouteGuardProps) => {
  const router = useRouter();

  useEffect(() => {
    const checkAccess = () => {
      const requirements = Array.isArray(requiredData) ? requiredData : [requiredData];
      
      for (const requirement of requirements) {
        const data = sessionStorage.getItem(requirement);
        if (!data) {
          router.push(redirectTo);
          return false;
        }
      }
      return true;
    };

    checkAccess();
  }, [requiredData, redirectTo, router]);

  // Optionally, you can show a loading state while checking
  return <>{children}</>;
};

export default RouteGuard;