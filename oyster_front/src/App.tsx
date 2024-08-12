import { Routes, Route } from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import Register from "./routes/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/register" element={<Register />}/>
      </Route>
    </Routes>
  );
}

export default App;
