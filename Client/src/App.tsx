import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "./components/Loader";

function App() {
  const Home = lazy(() => import("./pages/Home/Home"));
  const Login = lazy(() => import("./pages/Login/Login"));
  const Register = lazy(() => import("./pages/Register/Register"));

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loader />}>
              <Register />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
