import { useState } from "react";
import axios from "axios";

export default function FlatmateForm() {
  const [form, setForm] = useState({
    userId: "abc123",
    gender: "Female",
    preferredGender: "Any",
    budget: 20000,
    locationPreference: "Mumbai",
    habits: {
      smoking: false,
      pets: false,
      sleepTime: "Late",
      cleanliness: "High"
    },
    bio: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.habits) {
      setForm({ ...form, habits: { ...form.habits, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submitForm = async () => {
    await axios.post("http://localhost:5000/api/flatmate/create", form);
    alert("Saved!");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <select name="gender" onChange={handleChange}>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
      </select>
      <select name="preferredGender" onChange={handleChange}>
        <option value="Any">Neutral</option>
        <option value="Female">Only Girls</option>
        <option value="Male">Only Boys</option>
      </select>
      {/* Other fields (budget, location, habits) */}
      <button className="mt-4 bg-blue-500 text-white px-4 py-2" onClick={submitForm}>Save</button>
    </div>
  );
}
