import Navbar from "./navbar";
import { useEffect, useState } from "react";

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

  // Categorize flats by section
  const savedFlats = flats.filter(flat => flat.section === 'saved');
  const scheduledFlats = flats.filter(flat => flat.section === 'scheduled');
  const visitedFlats = flats.filter(flat => flat.section === 'visited');

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
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search flats..."
                className="w-full px-6 py-3 rounded-full border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-yellow-100 text-lg bg-white text-black placeholder-gray-400 pr-16 transition-all duration-200 font-sans"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-yellow-100 hover:bg-yellow-200 text-black font-semibold px-3 py-2 rounded-full shadow transition-all duration-200 flex items-center text-base font-sans">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z' /></svg>
              </button>
            </div>
          </div>
          {/* Section Navigation Buttons */}
          <div className="w-full flex justify-center mb-24 gap-6">
            <button onClick={() => document.getElementById('saved-section').scrollIntoView({ behavior: 'smooth' })} className="bg-yellow-100 hover:bg-yellow-200 text-black font-semibold px-6 py-2 rounded-full shadow font-sans transition-all duration-200">Saved</button>
            <button onClick={() => document.getElementById('scheduled-section').scrollIntoView({ behavior: 'smooth' })} className="bg-pink-100 hover:bg-pink-200 text-black font-semibold px-6 py-2 rounded-full shadow font-sans transition-all duration-200">Scheduled</button>
            <button onClick={() => document.getElementById('visited-section').scrollIntoView({ behavior: 'smooth' })} className="bg-green-100 hover:bg-green-200 text-black font-semibold px-6 py-2 rounded-full shadow font-sans transition-all duration-200">Visited</button>
          </div>
          {/* Main Content */}
          <main className="flex-1 p-8 w-full">
            {/* Saved Flats Section */}
            <div id="saved-section" className="flex items-center w-full mb-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <h2 className="text-2xl font-bold text-black font-sans mx-6 whitespace-nowrap">Saved Flats</h2>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-14 pb-12 pt-4 px-2">
              {savedFlats.length === 0 ? (
                <div className="col-span-full text-gray-400 text-center text-lg">No flats listed yet.</div>
              ) : (
                savedFlats.map((flat) => (
                  <div key={flat._id || flat.id} className="w-[350px] h-[430px] bg-white rounded-2xl shadow-xl p-10 flex-shrink-0 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl border border-pink-100 mx-auto font-sans">
                    <div className="relative">
                      {flat.image && <img src={flat.image} alt={flat.title} className="w-full h-44 object-cover rounded-xl mb-4" />}
                      <span className="absolute top-3 right-3 bg-pink-200 text-black text-xs px-3 py-1 rounded-full shadow font-sans">Saved</span>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-1 font-sans">{flat.title}</h3>
                    <p className="text-gray-700 mb-2 font-sans">{flat.location}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-pink-600 font-bold text-lg font-sans">{flat.price}</span>
                      <button className="bg-pink-200 hover:bg-opacity-80 text-black text-xs font-semibold px-4 py-2 rounded-full shadow font-sans">View Details</button>
                    </div>
                    <p className="text-gray-700 mt-2 font-sans">{flat.description}</p>
                  </div>
                ))
              )}
            </div>
            {/* Scheduled Visits Section */}
            <div id="scheduled-section" className="flex items-center w-full mt-8 mb-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <h2 className="text-2xl font-bold text-black font-sans mx-6 whitespace-nowrap">Scheduled Visits</h2>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-14 pb-12 pt-4 px-2">
              {scheduledFlats.length === 0 ? (
                <div className="col-span-full text-gray-400 text-center text-lg">No scheduled visits.</div>
              ) : (
                scheduledFlats.map((flat) => (
                  <div key={flat._id || flat.id} className="w-[350px] h-[430px] bg-white rounded-2xl shadow-xl p-10 flex-shrink-0 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl border border-pink-100 mx-auto font-sans">
                    <div className="relative">
                      {flat.image && <img src={flat.image} alt={flat.title} className="w-full h-44 object-cover rounded-xl mb-4" />}
                      <span className="absolute top-3 right-3 bg-pink-200 text-black text-xs px-3 py-1 rounded-full shadow font-sans">Scheduled</span>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-1 font-sans">{flat.title}</h3>
                    <p className="text-gray-700 mb-2 font-sans">{flat.location}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-pink-600 font-bold text-lg font-sans">{flat.price}</span>
                      <button className="bg-pink-200 hover:bg-opacity-80 text-black text-xs font-semibold px-4 py-2 rounded-full shadow font-sans">View Details</button>
                    </div>
                    <p className="text-gray-700 mt-2 font-sans">{flat.description}</p>
                  </div>
                ))
              )}
            </div>
            {/* Visited Section */}
            <div id="visited-section" className="flex items-center w-full mt-8 mb-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <h2 className="text-2xl font-bold text-black font-sans mx-6 whitespace-nowrap">Visited</h2>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-14 pb-12 pt-4 px-2">
              {visitedFlats.length === 0 ? (
                <div className="col-span-full text-gray-400 text-center text-lg">No visited flats.</div>
              ) : (
                visitedFlats.map((flat) => (
                  <div key={flat._id || flat.id} className="w-[350px] h-[430px] bg-white rounded-2xl shadow-xl p-10 flex-shrink-0 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl border border-pink-100 mx-auto font-sans">
                    <div className="relative">
                      {flat.image && <img src={flat.image} alt={flat.title} className="w-full h-44 object-cover rounded-xl mb-4" />}
                      <span className="absolute top-3 right-3 bg-pink-200 text-black text-xs px-3 py-1 rounded-full shadow font-sans">Visited</span>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-1 font-sans">{flat.title}</h3>
                    <p className="text-gray-700 mb-2 font-sans">{flat.location}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-pink-600 font-bold text-lg font-sans">{flat.price}</span>
                      <button className="bg-pink-200 hover:bg-opacity-80 text-black text-xs font-semibold px-4 py-2 rounded-full shadow font-sans">View Details</button>
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
