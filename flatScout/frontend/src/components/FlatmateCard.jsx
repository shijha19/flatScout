export default function FlatmateCard({ profile }) {
  return (
    <div className="border p-4 rounded-2xl bg-white shadow-md flex flex-col items-center">
      <img
        src={profile.photoUrl || "https://ui-avatars.com/api/?name=" + (profile.name || "User")}
        alt="Flatmate"
        className="w-20 h-20 rounded-full mb-2 border-2 border-pink-200 object-cover"
      />
      <h3 className="text-lg font-bold text-pink-700 mb-1">{profile.name || 'Anonymous'}</h3>
      <div className="text-gray-600 text-sm mb-2 italic">{profile.bio}</div>
      <div className="flex flex-wrap gap-2 mb-2 justify-center">
        <span className="px-2 py-1 rounded bg-pink-100 text-pink-800 text-xs">{profile.gender}</span>
        <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs">{profile.locationPreference || profile.location}</span>
        <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs">Budget: ₹{profile.budget}</span>
        <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs">Prefers: {profile.preferredGender}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-2 justify-center">
        <span className="px-2 py-1 rounded bg-purple-100 text-purple-800 text-xs">Cleanliness: {profile.habits?.cleanliness || profile.cleanliness}</span>
        <span className="px-2 py-1 rounded bg-teal-100 text-teal-800 text-xs">Smoking: {profile.habits?.smoking || profile.smoking}</span>
        <span className="px-2 py-1 rounded bg-orange-100 text-orange-800 text-xs">Pets: {profile.habits?.pets || profile.pets}</span>
        <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs">Sleep: {profile.habits?.sleep || profile.sleep}</span>
      </div>
      <button
        className="mt-2 px-4 py-2 bg-pink-200 rounded-xl text-pink-800 font-semibold shadow hover:bg-pink-300 transition"
        onClick={() => alert('Connect feature coming soon!')}
      >
        Connect
      </button>
    </div>
  );
}
