import React, { useState } from "react";
import Navbar from "../components/navbar";

const FlatListings = () => {
  const [flats, setFlats] = useState([]);
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    description: ""
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
    } catch (err) {
      alert(err.message);
    }
  };

  // Fetch all flats on mount
  React.useEffect(() => {
    fetch('/api/flats')
      .then(res => res.json())
      .then(data => setFlats(data.flats || []));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-extrabold text-black mb-10 text-center tracking-tight">Flat Listings</h1>
        <div className="flex justify-center mb-8">
          <button
            className="px-8 py-3 bg-blue-400 text-white rounded-full font-bold shadow-lg transition text-lg"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? "Cancel" : "Create New Flat Card"}
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl border border-pink-200 p-8 mb-10 space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Title</label>
                <input name="title" value={form.title} onChange={handleChange} className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Location</label>
                <input name="location" value={form.location} onChange={handleChange} className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Price</label>
                <input name="price" value={form.price} onChange={handleChange} className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" />
              </div>

            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} className="w-full px-4 py-2 border-2 border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" rows={3} />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-8 py-2 bg-pink-500 text-white rounded-full font-bold shadow hover:bg-pink-600 transition">Add Flat</button>
            </div>
          </form>
        )}
        {flats.length === 0 ? (
          <div className="text-gray-800 text-center text-lg mt-10">No flats listed yet. Click above to add one!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {flats.map(flat => (
              <div key={flat._id || flat.id} className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden flex flex-col transition">
                {flat.image && <img src={flat.image} alt={flat.title} className="h-52 w-full object-cover" />}
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold text-black mb-1">{flat.title}</h2>
                  <p className="text-black mb-2 font-medium">{flat.location}</p>
                  <p className="text-black font-bold mb-2 text-lg">{flat.price}</p>
                  <p className="text-black flex-1 mb-2">{flat.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlatListings;
