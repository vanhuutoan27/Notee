import PasswordInput from "@/components/PasswordInput";
import Navbar from "@/components/Navbar";
import { validateEmail } from "@/utils/helper";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    //Register API call
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: name, email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("User registered", userData);
        register(userData.userData);
        navigate("/");
      } else {
        setError("Error registering new user");
      }
    } catch (error) {
      setError("Failed to connect to server");
    } finally {
      setError("");
    }
  };
  return (
    <>
      <Navbar />

      <div className="mt-28 flex items-center justify-center">
        <div className="w-96 rounded border bg-white px-7 py-10">
          <form onSubmit={handleRegister}>
            <h4 className="mb-7 text-2xl font-semibold">Register</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              Register
            </button>

            <p className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
