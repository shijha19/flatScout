import React, { useEffect, useState } from "react";


const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [connections, setConnections] = useState([]);
  const [connectionsLoading, setConnectionsLoading] = useState(true);
  const [connectionsError, setConnectionsError] = useState("");

  useEffect(() => {
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

    // Fetch connections
    setConnectionsLoading(true);
    fetch(`/api/user/connections?email=${encodeURIComponent(email)}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.connections)) {
          // Only count real users (with valid email and name)
          const realConnections = data.connections.filter(
            (c) => c && c.email && c.name && c.email.includes('@') && c.name.length > 0
          );
          setConnections(realConnections);
        } else {
          setConnections([]);
        }
        setConnectionsLoading(false);
      })
      .catch(() => {
        setConnectionsError("Failed to load connections.");
        setConnectionsLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;
  if (!user) return null;

  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=F472B6&color=fff&size=128`;

  return (
    <>
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

        {/* Connections Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-pink-700 mb-2">Total Connections: {connectionsLoading ? '...' : connections.length}</h2>
          {connectionsError && <div className="text-red-500 text-sm mb-2">{connectionsError}</div>}
          <div className="space-y-2">
            {connectionsLoading ? (
              <div>Loading connections...</div>
            ) : connections.length === 0 ? (
              <div className="text-gray-500">No connections yet.</div>
            ) : (
              connections.map((conn) => (
                <div key={conn._id || conn.id || conn.email} className="flex items-center gap-3 p-2 bg-pink-50 rounded-lg">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(conn.name || 'User')}&background=F472B6&color=fff&size=48`} alt="avatar" className="w-8 h-8 rounded-full" />
                  <span className="font-semibold text-pink-700">{conn.name}</span>
                  <span className="text-gray-500 text-xs">{conn.email}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <a href="/edit-profile" className="px-6 py-2 bg-violet-100 text-violet-700 rounded-lg font-semibold shadow hover:bg-violet-200 transition text-center">Edit Profile</a>
          <a href="/change-password" className="px-6 py-2 bg-red-100 text-red-700 rounded-lg font-semibold shadow hover:bg-red-200 transition text-center">Change Password</a>
          <a href="/" className="px-6 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold shadow hover:bg-blue-200 transition text-center">Return to Home</a>
        </div>
      </div>
    </>
  );
};

export default Profile;
