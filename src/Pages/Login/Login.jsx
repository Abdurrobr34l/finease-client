import React, { useContext, useState } from "react";
import { HeadProvider } from "react-head";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Email/password login
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        toast.success("Logged in successfully!");
        form.reset();
        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.error("Login error:", err);
        toast.error(err.message || "Login failed. Try again.");
      });
  };

  // Google login
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success("Signed in with Google.");
        navigate(location?.state || "/");
      })
      .catch((err) => {
        if (err.code === "auth/popup-closed-by-user") {
          toast.warning("You closed the Google sign-in popup.");
        } else {
          console.error("Google sign-in error:", err);
          toast.error(err.message || "Google sign-in failed.");
        }
      });
  };

  return (
    <section className="flex flex-col items-center gap-10">
      <HeadProvider>
        <title>FinEase | Login</title>
      </HeadProvider>

      <h2 className="title">Login to Your Account</h2>

      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset p-6 w-[335px] bg-base-100 rounded-lg md:w-[500px]">
          <label className="label text-secondary">Email</label>
          <input
            type="email"
            name="email"
            className="input py-6.5 w-full bg-base-300 rounded-lg"
            placeholder="Email"
            required
          />

          <label className="label text-secondary mt-4">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input py-6.5 w-full bg-base-300 rounded-lg"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 bottom-4 text-xl hover:cursor-pointer"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-neutral mt-4 py-6 w-full btn-hover"
          >
            Login
          </button>

          <span className="my-2 text-secondary font-semibold text-center">
            or Connect with Google Account
          </span>

          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="btn py-6 bg-white text-[#122B45] border-[#e5e5e5] w-full transition-colors duration-200 ease-linear hover:bg-primary hover:text-accent"
          >
            <FaGoogle /> Login With Google
          </button>

          <div className="mt-3 text-center">
            <p className="textarea-md">
              Don't have an account? Please
              <Link
                to={"/register"}
                className="link-hover ml-1 text-accent hover:text-accent-content"
              >
                Register
              </Link>
            </p>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default Login;
