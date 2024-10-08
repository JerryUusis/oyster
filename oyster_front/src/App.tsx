import { Routes, Route } from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import Register from "./routes/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProfileSettings from "./routes/ProfileSettings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path="login" element={<Login />} />
        <Route
          path="profile/:id"
          element={<ProtectedRoute component={Profile} />}
        />
        <Route
          path="profile_settings"
          element={<ProtectedRoute component={ProfileSettings} />}
        />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
