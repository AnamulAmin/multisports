import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/AuthProvider";

function PublicRoute({ children }) {
  const { user } = useAuth();
  const router = useNavigate();

  useEffect(() => {
    const get_user = () => {
      const storedUser = localStorage.getItem("user");
      return storedUser == "undefined" || storedUser == null
        ? null
        : JSON.parse(storedUser);
    };

    const user = get_user();

    if (user) {
      if (user.role === "user") {
        router("/", { scroll: true, replace: true });
      }
      router("/", { scroll: true, replace: true });
    }
  }, [router, user]);

  return <>{!user && <div>{children}</div>}</>;
}

export default PublicRoute;
