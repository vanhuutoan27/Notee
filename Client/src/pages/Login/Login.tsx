import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link
import PasswordInput from "@/components/PasswordInput";
import Navbar from "@/components/Navbar";
import { validateEmail } from "@/utils/helper";
import noteeAPI from "@/utils/axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    //Login API call
    try {
      const response = await noteeAPI.post("/login", {
        email: email,
        password: password,
      });

      if ((response.status = 201)) {
        const userData = await response.data;
        // console.log("User Logged In", userData.userData);
        localStorage.setItem("userData", JSON.stringify(userData.userData));
        navigate("/");
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (networkError) {
      if (networkError.response) {
        setError(
          networkError.response.data.message ||
            "Login failed. Please try again later.",
        );
      } else {
        console.error("Network error:", networkError);
        setError("Failed to connect to server");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="mt-28 flex items-center justify-center">
        <div className="w-96 rounded border bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="mb-7 text-2xl font-semibold">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            {error && <p className="pb-1 text-xs text-red-500">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="mt-4 text-center text-sm">
              Not registered yet?{" "}
              <Link
                to="/register"
                className="font-semibold text-primary underline"
              >
                Create a new account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
