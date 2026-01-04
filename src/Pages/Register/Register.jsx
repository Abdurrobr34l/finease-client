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
  const navigate = useNavigate();
  const location = useLocation();

  // Email/password registration
  const handleSubmit = (e) => {
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

    // Create user and update profile
   createUser(email, password)
  .then(async () => {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL || null,
    });

    // Log the user out immediately
    await auth.signOut();

    toast.success("Account created successfully! Please login.");
    form.reset();
    navigate("/login");
  })
  .catch((err) => {
    console.error("Registration error:", err);
    toast.error(err.message || "Registration failed. Try again.");
  });

  };

  // Google Sign-In
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
          />

          <label className="label text-secondary mt-3">Photo URL</label>
          <input
            type="text"
            name="userPhoto"
            className="input mb-3 py-6.5 w-full bg-base-300 rounded-lg"
            placeholder="Photo URL"
            required
          />

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
            Register
          </button>

          <span className="my-2 text-secondary font-semibold text-center">
            or Connect with Google Account
          </span>

          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="btn py-6 bg-white text-[#122B45] border-[#e5e5e5] w-full transition-colors duration-200 ease-linear hover:bg-primary hover:text-accent"
          >
            <FaGoogle /> SignUp With Google
          </button>

          <div className="mt-3 text-center">
            <p className="textarea-md">
              Already have an account? Please
              <Link
                to={"/login"}
                className="link-hover ml-1 text-accent hover:text-accent-content"
              >
                SignIn
              </Link>
            </p>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default Register;
