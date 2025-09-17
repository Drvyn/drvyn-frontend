"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface RouteGuardProps {
  children: React.ReactNode;
  requiredData: string | string[];
  redirectTo: string;
}

const RouteGuard = ({ children, requiredData, redirectTo }: RouteGuardProps) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAccess = () => {
      setIsChecking(true);
      const requirements = Array.isArray(requiredData) ? requiredData : [requiredData];
      
      for (const requirement of requirements) {
        const data = sessionStorage.getItem(requirement);
        if (!data) {
          router.push(redirectTo);
          setIsAuthorized(false);
          setIsChecking(false);
          return;
        }
      }
      
      setIsAuthorized(true);
      setIsChecking(false);
    };

    checkAccess();
  }, [requiredData, redirectTo, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect anyway
  }

  return <>{children}</>;
};

export default RouteGuard;