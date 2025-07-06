import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FlatmateForm() {
  const [form, setForm] = useState({
    userId: "",
    gender: "",
    preferredGender: "",
    budget: "",
    locationPreference: "",
    habits: {
      smoking: "No",
      pets: "No",
      sleepTime: "Early",
      cleanliness: "Medium"
    },
    bio: ""
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) setForm(f => ({ ...f, userId }));
    // Optionally fetch existing profile here
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["smoking", "pets", "sleepTime", "cleanliness"].includes(name)) {
      setForm({ ...form, habits: { ...form.habits, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Submitting form:", form); // Debug log
    if (!form.userId) {
      setError("User ID missing. Please log in again.");
      return;
    }
    try {
      await axios.post(`/api/flatmates/profile/${form.userId}`, {
        ...form,
        budget: Number(form.budget),
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/find-flatmate", { replace: true });
      }, 1000);
    } catch (err) {
      setError("Could not save preferences");
      console.error("Save error:", err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Edit Flatmate Preferences</h2>
      <form onSubmit={submitForm} className="flex flex-col gap-3">
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
        <select name="preferredGender" value={form.preferredGender} onChange={handleChange} required>
          <option value="">Preferred Roommate Gender</option>
          <option value="Any">Any</option>
          <option value="Female">Only Girls</option>
          <option value="Male">Only Boys</option>
        </select>
        <input type="number" name="budget" value={form.budget} onChange={handleChange} placeholder="Budget (INR)" required />
        <input type="text" name="locationPreference" value={form.locationPreference} onChange={handleChange} placeholder="Location Preference" required />
        <select name="smoking" value={form.habits.smoking} onChange={handleChange} required>
          <option value="No">Non-Smoker</option>
          <option value="Yes">Smoker</option>
        </select>
        <select name="pets" value={form.habits.pets} onChange={handleChange} required>
          <option value="No">No Pets</option>
          <option value="Yes">Has Pets</option>
        </select>
        <select name="sleepTime" value={form.habits.sleepTime} onChange={handleChange} required>
          <option value="Early">Early Sleeper</option>
          <option value="Late">Late Sleeper</option>
        </select>
        <select name="cleanliness" value={form.habits.cleanliness} onChange={handleChange} required>
          <option value="Low">Low Cleanliness</option>
          <option value="Medium">Medium Cleanliness</option>
          <option value="High">High Cleanliness</option>
        </select>
        <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Short Bio" rows={3} required />
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-600">Preferences saved!</div>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">
          Save
        </button>
      </form>
    </div>
  );
}
