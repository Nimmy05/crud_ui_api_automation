import { Navigate, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      
      {/* Login Page */}
      <Route
        path="/login"
        element={token ? <Navigate to="/" replace /> : <Login />}
      />

      {/* Home Page (Protected) */}
      <Route
        path="/"
        element={token ? <Home /> : <Navigate to="/login" replace />}
      />

      {/* Catch-all: redirect unknown routes to login */}
      <Route
        path="*"
        element={<Navigate to={token ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
