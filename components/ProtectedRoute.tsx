// components/ProtectedRoute.tsx
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading) {
    return <div>Loading...</div>; // You can show a spinner or a loading screen here
  }

  return <>{children}</>;
};

export default ProtectedRoute;
