import { Routes, Route } from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/Login";
import Profile from "./routes/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
