import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../utils/types";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  component: FC;
}

const ProtectedRoute = ({ component: Component }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.user);
  const localStorageUserString = localStorage.getItem("loggedUser");
  let localStorageUser;
  if (localStorageUserString) {
    localStorageUser = JSON.parse(localStorageUserString);
  }

  if (user?.uid || localStorageUser) {
    return <Component />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
