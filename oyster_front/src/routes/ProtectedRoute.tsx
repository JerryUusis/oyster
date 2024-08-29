import LoadingSpinner from "../components/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { Navigate } from "react-router-dom";
import { useEffect, useState, FC } from "react";
import { getUserFromLocalStorage } from "../store/userSlice";

interface ProtectedRouteProps {
  component: FC;
}

const ProtectedRoute = ({ component: Component }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user === null) {
      dispatch(getUserFromLocalStorage());
    }
    setLoading(false);
  }, [user, dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user !== null) {
    return <Component />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
