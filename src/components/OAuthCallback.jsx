import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";

export default function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuth = async () => {
      try {
        console.log("🚀 Running OAuth callback...");

        // ✅ Now ensure user is in DB
        const user = await authService.fetchUserAndEnsureInDB();
        console.log("✅ User ensured in DB:", user);

        navigate("/dashboard", { replace: true });
      } catch (err) {
        console.error("❌ OAuth callback failed:", err);
        navigate("/login", { replace: true });
      }
    };

    handleOAuth();
  }, [navigate]);

  return <p>Logging in...</p>;
}