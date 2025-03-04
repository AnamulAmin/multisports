import { useEffect } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
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

    if (user?.role === "user") {
      router("/", { scroll: true, replace: true });
    }

    if (!user) {
      router("/", { scroll: true, replace: true });
    }
  }, [router, user]);

  return <>{user && <div>{children}</div>}</>;
  // return <>{<div>{children}</div>}</>;
}

export default PrivateRoute;
