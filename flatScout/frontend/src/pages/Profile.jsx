import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Get email from localStorage or authentication context
    const email = localStorage.getItem("userEmail");
    if (!email) {
      setError("No user email found. Please log in again.");
      setLoading(false);
      return;
    }
    fetch(`/api/user/profile?email=${encodeURIComponent(email)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          setError(data.message || "User not found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;
  if (!user) return null;

  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=F472B6&color=fff&size=128`;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-pink-100">
      <div className="flex flex-col items-center">
        <img src={avatar} alt="Profile" className="w-28 h-28 rounded-full border-4 border-pink-200 shadow mb-4" />
        <h1 className="text-3xl font-extrabold text-pink-700 mb-1">{user.name}</h1>
        <p className="text-gray-500 mb-2">{user.location || ""}</p>
        <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full mb-4">Joined {user.createdAt ? new Date(user.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' }) : "-"}</span>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center space-x-3">
          <span className="material-icons text-pink-400">email</span>
          <span className="text-gray-700">{user.email}</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="material-icons text-pink-400">phone</span>
          <span className="text-gray-700">{user.phone || "-"}</span>
        </div>
        <div className="flex items-start space-x-3">
          <span className="material-icons text-pink-400 mt-1">info</span>
          <span className="text-gray-700">{user.bio || "-"}</span>
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-4">
        <a href="/edit-profile" className="px-6 py-2 bg-pink-500 text-white rounded-lg font-semibold shadow hover:bg-pink-600 transition text-center">Edit Profile</a>
        <a href="/change-password" className="px-6 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-semibold shadow hover:bg-yellow-200 transition text-center">Change Password</a>
      </div>
    </div>
  );
};

export default Profile;
