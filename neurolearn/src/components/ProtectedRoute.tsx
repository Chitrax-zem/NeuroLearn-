import { useEffect, useState } from "react";
import { Redirect } from "wouter";

const API_URL = "http://127.0.0.1:8000";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          localStorage.removeItem("access_token");
          setAuthenticated(false);
        } else {
          setAuthenticated(true);
        }
      } catch {
        setAuthenticated(false);
      }

      setLoading(false);
    };

    verifyUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
}