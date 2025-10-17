import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Service from "./pages/Service";
import CreateService from "./pages/CreateService";
import EditService from "./pages/EditService";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/menu" 
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/service/:id" 
          element={
            <ProtectedRoute>
              <Service />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create-service" 
          element={
            <ProtectedRoute>
              <CreateService />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit-service/:id" 
          element={
            <ProtectedRoute>
              <EditService />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
