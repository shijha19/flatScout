export default function FlatmateCard({ profile }) {
  return (
    <div className="border p-4 rounded-xl bg-white shadow-sm">
      <h3 className="text-lg font-bold">{profile.gender}</h3>
      <p>Location: {profile.locationPreference}</p>
      <p>Cleanliness: {profile.habits.cleanliness}</p>
      <p>Prefers: {profile.preferredGender}</p>
    </div>
  );
}
