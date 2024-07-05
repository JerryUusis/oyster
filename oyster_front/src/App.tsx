import { Routes, Route } from "react-router-dom";
import Root from "./Routes/Root";
import Login from "./Routes/Login";
import Profile from "./Routes/Profile";

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
