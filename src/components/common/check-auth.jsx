import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  if (location.pathname === "/e-commerce-frontend") {
    if (!isAuthenticated) {
      return <Navigate to="/e-commerce-frontend/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/e-commerce-frontend/admin/dashboard" />;
      } else {
        return <Navigate to="/e-commerce-frontend/shop/home" />;
      }
    }
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/e-commerce-frontend/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/e-commerce-frontend/admin/dashboard" />;
    } else {
      return <Navigate to="/e-commerce-frontend/shop/home" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/e-commerce-frontend/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/e-commerce-frontend/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
