import React, { useContext, useState } from "react";
import { HeadProvider } from "react-head";
import { AuthContext } from "../../Contexts/AuthContext";
import { auth } from "../../Firebase/firebase.init";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const UpdateProfile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate()

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL || null,
      });
      
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  if (!user) {
    return (
      <section className="section-padding flex justify-center items-center">
        <p className="text-lg text-red-500">
          You must be logged in to view this page.
        </p>
      </section>
    );
  }

  return (
    <section className="section-padding flex flex-col items-center gap-10">
      <HeadProvider>
        <title>FinEase | Update Profile</title>
      </HeadProvider>

      <h2 className="title">Update Profile</h2>

      <form
        onSubmit={handleUpdateProfile}
        className="fieldset p-6 w-[335px] bg-base-100 rounded-lg md:w-[500px] flex flex-col gap-4"
      >
        <label className="label text-secondary">Name</label>
        <input
          type="text"
          className="input py-6.5 w-full bg-base-300 rounded-lg"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label className="label text-secondary">Photo URL</label>
        <input
          type="text"
          className="input py-6.5 w-full bg-base-300 rounded-lg"
          value={photoURL}
          required
          onChange={(e) => setPhotoURL(e.target.value)}
        />

        <label className="label text-secondary">Email</label>
        <input
          type="email"
          className="input py-6.5 w-full bg-base-300 rounded-lg"
          value={user.email}
          disabled
        />

        <button
          type="submit"
          disabled={updating}
          className="btn btn-neutral mt-4 py-6 w-full btn-hover"
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </section>
  );
};

export default UpdateProfile;
