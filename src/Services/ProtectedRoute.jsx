import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ user, children }) => {
    const { token } = useAuth();
    if (!token) {
      return <Navigate to="https://gazzito.github.io/poston/login" replace />;
    } else {
      const decodedToken = jwtDecode(token);
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();
      if (isTokenExpired) {
        return <Navigate to="https://gazzito.github.io/poston/login" replace />;
      }
    }
  
    return children;
  };

  export default ProtectedRoute