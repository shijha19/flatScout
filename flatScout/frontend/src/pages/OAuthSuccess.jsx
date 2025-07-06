import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userLoggedIn", "true");
      // Optionally decode the JWT to get the user's name
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.name) localStorage.setItem("name", payload.name);
      } catch (e) {}
      navigate("/"); // Redirect to App.jsx (main app page)
    }
  }, [location]);

  return <p>Logging you in...</p>;
}
