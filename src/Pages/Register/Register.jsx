import React, { useContext, useState } from "react";
import { HeadProvider } from "react-head";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import { auth } from "../../Firebase/firebase.init";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Email/password registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value.trim();
    const photoURL = form.userPhoto.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    // Password validation
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    if (!passwordPattern.test(password)) {
      toast.error(
        "Password must be at least 6 characters and include uppercase, lowercase, and a special character."
      );
      return;
    }

    setIsLoading(true);

    try {
      await createUser(email, password);

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL || null,
      });

      // Logout after registration (best practice)
      await auth.signOut();

      toast.success("Account created successfully! Please login.");
      form.reset();
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.message || "Registration failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await googleSignIn();
      toast.success("Signed in with Google.");
      navigate(location?.state || "/");
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        toast.warning("You closed the Google sign-in popup.");
      } else {
        console.error("Google sign-in error:", err);
        toast.error(err.message || "Google sign-in failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center gap-10">
      <HeadProvider>
        <title>FinEase | Register</title>
      </HeadProvider>

      <h2 className="title">Create Your Account</h2>

      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset p-6 w-[335px] bg-base-100 rounded-lg md:w-[500px]">
          <label className="label text-secondary">Name</label>
          <input
            type="text"
            name="name"
            className="input py-6.5 w-full bg-base-300 rounded-lg"
            placeholder="Your name"
            required
            disabled={isLoading}
          />

          <label className="label text-secondary mt-3">Photo URL</label>
          <input
            type="text"
            name="userPhoto"
            className="input py-6.5 w-full bg-base-300 rounded-lg"
            placeholder="Photo URL"
            disabled={isLoading}
          />

          <label className="label text-secondary mt-3">Email</label>
          <input
            type="email"
            name="email"
            className="input py-6.5 w-full bg-base-300 rounded-lg"
            placeholder="Email"
            required
            disabled={isLoading}
          />

          <label className="label text-secondary mt-4">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input py-6.5 w-full bg-base-300 rounded-lg"
              placeholder="Password"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 bottom-4 text-xl"
              disabled={isLoading}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-neutral mt-4 py-6 w-full btn-hover disabled:opacity-70"
          >
            {isLoading ? "Creating account..." : "Register"}
          </button>

          <span className="my-2 text-secondary font-semibold text-center block">
            or Connect with Google Account
          </span>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="btn py-6 bg-white text-[#122B45] border-[#e5e5e5] w-full transition-colors duration-200 ease-linear hover:bg-primary hover:text-accent disabled:opacity-70"
          >
            <FaGoogle />
            {isLoading ? "Please wait..." : "Sign Up With Google"}
          </button>

          <div className="mt-3 text-center">
            <p className="textarea-md">
              Already have an account?
              <Link
                to="/login"
                className="link-hover ml-1 text-accent hover:text-accent-content"
              >
                Sign In
              </Link>
            </p>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default Register;