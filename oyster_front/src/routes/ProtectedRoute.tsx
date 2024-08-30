import LoadingSpinner from "../components/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { Navigate } from "react-router-dom";
import { useEffect, useState, FC } from "react";
import { setUser } from "../store/userSlice";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { verifyIdTokenInBackend } from "../services/loginService";
import { UserObject } from "../utils/types";

interface ProtectedRouteProps {
  component: FC;
}

const ProtectedRoute = ({ component: Component }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const auth = getAuth();

  useEffect(() => {
    const checkAuthState = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          if (idToken) {
            const verifyResponse = await verifyIdTokenInBackend(idToken);
            if (verifyResponse) {
              const currentUser: UserObject = { ...verifyResponse.user };
              dispatch(setUser(currentUser));
            } else {
              throw new Error("ID token sign-in failed");
            }
          }
        } catch (error) {
          console.error("Error verifyign ID toke: ", error);
          dispatch(setUser(null));
        }
      } else {
        dispatch(setUser(null));
      }
      setLoading(false);
    });

    return () => checkAuthState();
  }, [dispatch]);

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
