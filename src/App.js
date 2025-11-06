import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMe } from "./api/queries";
import { setUser } from "./store/userSlice";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AddProducts from "./pages/AddProducts";
const queryClient = new QueryClient();

function AuthChecker({ children }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { data, isLoading, isError } = useMe();

  useEffect(() => {
    if (data?.data) {
      dispatch(setUser(data.data));
    }
  }, [data, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Navigate to="/login" />;
  if (!data?.data) return <Navigate to="/login" />;

  return children;
}

function AppContent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <AuthChecker>
              <Products />
            </AuthChecker>
          }
        />

        <Route
          path="/products/:id"
          element={
            <AuthChecker>
              <ProductDetail />
            </AuthChecker>
          }
        />

        <Route
          path="/addProducts"
          element={
            <AuthChecker>
              <AddProducts />
            </AuthChecker>
          }
        />

        <Route
          path="*"
          element={
            <div
              style={{
                textAlign: "center",
                marginTop: "100px",
                fontSize: "20px",
                color: "#e74c3c",
              }}
            >
              No route implemented, sir.
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
