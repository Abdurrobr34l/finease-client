import React, { useContext } from "react";
import { HeadProvider } from "react-head";
import { AuthContext } from "../../Contexts/AuthContext";
import { Link } from "react-router";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <section className="flex justify-center items-center">
        <p className="text-lg text-red-500">
          You must be logged in to view this page.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center gap-10">
      <HeadProvider>
        <title>FinEase | My Profile</title>
      </HeadProvider>

      <h2 className="title">My Profile</h2>

      <div className="card w-[335px] md:w-[500px] bg-base-100 shadow-lg rounded-xl p-8 flex flex-col items-center gap-4">
        {/* User Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-base-200 text-3xl text-primary">
              {user.displayName?.[0] || "U"}
            </div>
          )}
        </div>

        {/* User Info */}
        <h3 className="text-xl text-primary! font-semibold">{user.displayName || "User"}</h3>
        <p className="text-secondary">{user.email}</p>

        {/* Update Profile Button */}
        <Link
        to={"/update-profile"}
          className="btn mt-4 w-full py-4 btn-hover"
        >
          Update Profile
        </Link>
      </div>
    </section>
  );
};

export default Profile;
