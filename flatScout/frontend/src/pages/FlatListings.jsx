import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const FlatListings = () => {
  const [flats, setFlats] = useState([]);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    location: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    furnished: "Furnished",
    image: "",
    description: "",
    contactName: "",
    contactPhone: "",
    contactEmail: ""
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/flats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add flat');
      setFlats([data.flat, ...flats]);
      setForm({ title: "", location: "", price: "", image: "", description: "" });
      setShowForm(false);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  // No longer fetch or display flats here

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-extrabold text-black mb-10 text-center tracking-tight">Create New Flat Card</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl border-2 border-pink-300 p-10 mb-12 space-y-8 animate-fade-in max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Title</label>
              <input name="title" value={form.title} onChange={handleChange} className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Location</label>
              <input name="location" value={form.location} onChange={handleChange} className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Address</label>
              <input name="address" value={form.address} onChange={handleChange} className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">City</label>
              <input name="city" value={form.city} onChange={handleChange} className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">State</label>
              <input name="state" value={form.state} onChange={handleChange} className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Pincode</label>
              <input name="pincode" value={form.pincode} onChange={handleChange} className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Price (₹)</label>
              <input name="price" value={form.price} onChange={handleChange} type="number" min="0" className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Bedrooms</label>
              <input name="bedrooms" value={form.bedrooms} onChange={handleChange} type="number" min="0" className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Bathrooms</label>
              <input name="bathrooms" value={form.bathrooms} onChange={handleChange} type="number" min="0" className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Area (sq ft)</label>
              <input name="area" value={form.area} onChange={handleChange} type="number" min="0" className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Furnishing</label>
              <select name="furnished" value={form.furnished} onChange={handleChange} className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" required>
                <option value="Furnished">Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
              <input name="image" value={form.image} onChange={handleChange} className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full px-4 py-3 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none" rows={4} placeholder="Describe the flat, amenities, nearby places, etc." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Contact Name</label>
              <input name="contactName" value={form.contactName} onChange={handleChange} className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Contact Phone</label>
              <input name="contactPhone" value={form.contactPhone} onChange={handleChange} className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Contact Email</label>
              <input name="contactEmail" value={form.contactEmail} onChange={handleChange} type="email" className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" required />
            </div>
          </div>
          <div className="flex justify-end md:col-span-3 mt-4">
            <button type="submit" className="px-10 py-3 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-yellow-400 hover:from-pink-600 hover:to-yellow-500 text-white font-bold rounded-full shadow-lg transition-all duration-200 text-lg font-sans border-2 border-pink-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-200">
              Add Flat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlatListings;
