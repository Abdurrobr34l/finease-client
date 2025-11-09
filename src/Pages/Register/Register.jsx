import React from 'react';
import { HeadProvider } from 'react-head';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router';

const Register = () => {
  const handleGoogleSignIn = () => { }
  return (
    <section className='section-padding flex flex-col items-center gap-10'>
      <HeadProvider>
        <title>FinEase | Register</title>
      </HeadProvider>


<h2 className='title'>Create Your Account</h2>

      <form>
        <fieldset className="fieldset p-6 w-[335px] bg-white rounded-lg md:w-[500px]">
          {/* User Name */}
          <label className="label text-secondary">Name</label>
          <input
            type="text"
            name="name"
            className="input py-6.5 w-full bg-base-300 rounded-lg"
            placeholder="Your name"
            required
          />

          {/* User Photo URL */}
          <label className="label text-secondary mt-3">Photo URL</label>
          <input
            type="text"
            name="userPhoto"
            className="input mb-3 py-6.5 w-full bg-base-300 rounded-lg"
            placeholder="Photo URL" // https://i.ibb.com/gF673z54/Budget-Buddy.webp
            required
          />

          {/* Email */}
          <label className="label text-secondary">Email</label>
          <input
            // onChange={handleEmailChange}
            type="email"
            name="email"
            // value={emailValue}
            className="input py-6.5 w-full bg-base-300 rounded-lg"
            placeholder="Email"
            required
          />

          {/* Password */}
          <label className="label text-secondary mt-4">Password</label>
          <div className="relative">
            <input
              // type={showPassword ? "text" : "password"}
              name="password"
              className="input py-6.5 w-full bg-base-300 rounded-lg"
              placeholder="Password"
              required
            />
            <button
              // onClick={handleShowPassword}
              className="absolute right-6 bottom-3 text-xl hover:cursor-pointer"
            >
              {/* {showPassword ? <FaEye /> : <FaEyeSlash />} */}
            </button>
          </div>

          {/* {error && (
                  <p className="mt-2 font-semibold textarea-md text-red-700! text-center">
                    {error}
                  </p>
                )} */}

          {/* SignUp Button */}
          <button
            type="button"
            className="btn btn-neutral mt-4 py-6 w-full btn-hover"
          >
            Register
          </button>

          <span className='my-2 text-secondary font-semibold text-center'>or Connect with Google Account</span>

          {/* SignUp With Google Button */}
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="btn py-6 bg-white text-[#122B45] border-[#e5e5e5] w-full transition-colors duration-200 ease-linear hover:bg-primary hover:text-accent"
          >
            <FaGoogle></FaGoogle>
            SignUp With Google
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