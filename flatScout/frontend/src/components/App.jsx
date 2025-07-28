import Navbar from "./navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MapComponent from '../components/MapComponent';

const dummyListings = [
  { name: "PG Alpha", latitude: 28.6139, longitude: 77.2090 },
  { name: "PG Beta", latitude: 19.0760, longitude: 72.8777 },
];

export default function App() {
  const [username, setUsername] = useState("Guest");
  // State to control showing all cards per section
  const [showAllSaved, setShowAllSaved] = useState(false);
  const [showAllScheduled, setShowAllScheduled] = useState(false);
  const [showAllVisited, setShowAllVisited] = useState(false);

  useEffect(() => {
    // Use the name set during login (assumed stored as 'name' in localStorage)
    const storedName = localStorage.getItem("name");
    if (storedName) setUsername(storedName);
  }, []);

  // State for backend flat listings
  const [flats, setFlats] = useState([]);

  // Fetch all flats from backend on mount
  useEffect(() => {
    fetch('/api/flats')
      .then(res => res.json())
      .then(data => setFlats(data.flats || []));
  }, []);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered flats based on search (fix: handle undefined/null fields and trim all fields)
  const filteredFlats = searchTerm.trim()
    ? flats.filter(flat => {
        const term = searchTerm.toLowerCase();
        // Defensive: check all fields as strings
        const title = (flat.title || "").toString().toLowerCase();
        const location = (flat.location || "").toString().toLowerCase();
        const description = (flat.description || "").toString().toLowerCase();
        return (
          title.includes(term) ||
          location.includes(term) ||
          description.includes(term)
        );
      })
    : flats;


  // State and handlers for create new flat form
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    description: ""
  });

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-white font-sans">
        {/* Hero Banner */}
        <div className="w-full flex justify-center items-center bg-white py-14 mb-0">
          <div className="max-w-5xl w-full flex flex-col items-center text-center px-4">
            <h1 className="w-full text-5xl sm:text-6xl font-extrabold text-black mb-4 font-sans drop-shadow-lg tracking-tight" style={{letterSpacing: '-0.01em'}}>
              Find Your Flat. Skip the Scam. Share the Space.
            </h1>
            <p className="text-lg sm:text-2xl text-gray-700 mb-0 font-sans">Discover verified rental homes with map-based search, scam detection, and roommate matching — all in one place.</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center">
          {/* Search Bar */}
          <div className="w-full flex justify-center mt-20 mb-12">
            <form
              className="relative w-full max-w-xl"
              onSubmit={e => e.preventDefault()}
            >
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search flats..."
                className="w-full px-6 py-3 rounded-full border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-yellow-100 text-lg bg-white text-black placeholder-gray-400 pr-16 transition-all duration-200 font-sans"
                aria-label="Search flats"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-yellow-100 hover:bg-yellow-200 text-black font-semibold px-3 py-2 rounded-full shadow transition-all duration-200 flex items-center text-base font-sans"
                tabIndex={-1}
                aria-label="Search"
              >
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z' /></svg>
              </button>
            </form>
          </div>
          <div className="flex justify-center w-full my-8">
            <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-3xl border border-gray-200">
              <MapComponent />
            </div>
          </div>

          {/* Section Navigation Buttons removed */}
          {/* Main Content: All Flats as Cards */}
          <main className="flex-1 p-8 w-full">
            <div className="flex items-center w-full mb-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <h2 className="text-2xl font-bold text-black font-sans mx-6 whitespace-nowrap">All Flats</h2>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            {/* Create New Flat Card Button - top right, plain black/white */}
            <div className="w-full flex justify-end mb-8">
              <Link
                to="/flat-listings"
                className="flex items-center gap-2 bg-black hover:bg-white hover:text-black text-white font-bold py-3 px-7 rounded-full shadow transition-all duration-200 text-lg font-sans border-2 border-black hover:border-black focus:outline-none focus:ring-2 focus:ring-black"
                style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                <span>Create New Flat</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-14 pb-12 pt-4 px-2">
              {filteredFlats.length === 0 ? (
                <div className="col-span-full text-gray-400 text-center text-lg">No flats listed yet.</div>
              ) : (
                filteredFlats.map((flat) => (
                  <div key={flat._id || flat.id} className="w-[350px] h-[430px] bg-white rounded-2xl shadow-xl p-10 flex-shrink-0 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl border border-pink-100 mx-auto font-sans">
                    <div className="relative">
                      {flat.image && <img src={flat.image} alt={flat.title} className="w-full h-44 object-cover rounded-xl mb-4" />}
                    </div>
                    <h3 className="text-xl font-bold text-black mb-1 font-sans">{flat.title}</h3>
                    <p className="text-gray-700 mb-2 font-sans">{flat.location}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-pink-600 font-bold text-lg font-sans">{flat.price}</span>
                      <Link
                        to={`/flats/${flat._id || flat.id}`}
                        className="bg-pink-200 hover:bg-opacity-80 text-black text-xs font-semibold px-4 py-2 rounded-full shadow font-sans"
                        style={{ textDecoration: 'none' }}
                      >
                        View Details
                      </Link>
                    </div>
                    <p className="text-gray-700 mt-2 font-sans">{flat.description}</p>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
