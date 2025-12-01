import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./navbar";
import DealersTable from "./DealersTable";
import DealerDetailPage from "./DealerDetailPage";
import RootLayout from "./RootLayout";
import LoginPage from "./LoginPage";
import { AuthProvider, useAuth } from "./AuthContext";

// 🔒 Helper component to protect routes
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/Home"
              element={
                <PrivateRoute>
                  <RootLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<DealersTable />} />
              <Route
                path="dealer/details/:filename"
                element={<DealerDetailPage />}
              />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

