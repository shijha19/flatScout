import Navbar from "./navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-white">
        <div className="flex flex-1 flex-col items-center">
          {/* Search Bar */}
          <div className="w-full flex justify-center mt-8 mb-8">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search flats..."
                className="w-full px-6 py-3 rounded-2xl border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-yellow-100 text-lg bg-white text-black placeholder-gray-400 pr-16 transition-all duration-200"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-yellow-100 hover:bg-yellow-200 text-black font-semibold px-4 py-2 rounded-xl shadow transition-all duration-200 flex items-center gap-2">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z' /></svg>
                Search
              </button>
            </div>
          </div>
          {/* Main Content */}
          <main className="flex-1 p-8 w-full">
            {/* Flat Listings Section */}
            <h2 className="text-2xl font-bold text-black mb-4">Flat Listings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-14 pb-12 pt-4 px-2">
              {/* Example Flat Card 1 */}
              <div className="w-[350px] h-[430px] bg-yellow-50 rounded-2xl shadow-xl p-10 flex-shrink-0 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl border border-yellow-100 mx-auto">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Flat 1" className="w-full h-44 object-cover rounded-xl mb-4" />
                  <span className="absolute top-3 right-3 bg-yellow-200 text-black text-xs px-3 py-1 rounded-full shadow">Featured</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-1">Modern Apartment</h3>
                <p className="text-gray-700 mb-2">2 BHK, 1200 sqft</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-yellow-600 font-bold text-lg">$1,200/mo</span>
                  <button className="bg-yellow-200 hover:bg-yellow-300 text-black text-xs font-semibold px-4 py-2 rounded-lg shadow">View Details</button>
                </div>
              </div>
              {/* Example Flat Card 2 */}
              <div className="w-[350px] h-[430px] bg-pink-50 rounded-2xl shadow-xl p-10 flex-shrink-0 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl border border-pink-100 mx-auto">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" alt="Flat 2" className="w-full h-44 object-cover rounded-xl mb-4" />
                  <span className="absolute top-3 right-3 bg-pink-200 text-black text-xs px-3 py-1 rounded-full shadow">New</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-1">Cozy Studio</h3>
                <p className="text-gray-700 mb-2">Studio, 500 sqft</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-pink-600 font-bold text-lg">$800/mo</span>
                  <button className="bg-pink-200 hover:bg-pink-300 text-black text-xs font-semibold px-4 py-2 rounded-lg shadow">View Details</button>
                </div>
              </div>
              {/* Example Flat Card 3 */}
              <div className="w-[350px] h-[430px] bg-orange-50 rounded-2xl shadow-xl p-10 flex-shrink-0 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl border border-orange-100 mx-auto">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80" alt="Flat 3" className="w-full h-44 object-cover rounded-xl mb-4" />
                  <span className="absolute top-3 right-3 bg-orange-200 text-black text-xs px-3 py-1 rounded-full shadow">Premium</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-1">Luxury Condo</h3>
                <p className="text-gray-700 mb-2">3 BHK, 1800 sqft</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-orange-600 font-bold text-lg">$2,500/mo</span>
                  <button className="bg-orange-200 hover:bg-orange-300 text-black text-xs font-semibold px-4 py-2 rounded-lg shadow">View Details</button>
                </div>
              </div>
              {/* Add more cards as needed */}
              {/* Example Flat Card 4 */}
              <div className="w-[350px] h-[430px] bg-yellow-50 rounded-2xl shadow-xl p-10 flex-shrink-0 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl border border-yellow-100 mx-auto">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Flat 4" className="w-full h-44 object-cover rounded-xl mb-4" />
                  <span className="absolute top-3 right-3 bg-yellow-200 text-black text-xs px-3 py-1 rounded-full shadow">Hot Deal</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-1">Family Home</h3>
                <p className="text-gray-700 mb-2">4 BHK, 2200 sqft</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-yellow-600 font-bold text-lg">$1,800/mo</span>
                  <button className="bg-yellow-200 hover:bg-yellow-300 text-black text-xs font-semibold px-4 py-2 rounded-lg shadow">View Details</button>
                </div>
              </div>
              {/* Example Flat Card 5 */}
              <div className="w-[350px] h-[430px] bg-orange-50 rounded-2xl shadow-xl p-10 flex-shrink-0 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl border border-orange-100 mx-auto">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80" alt="Flat 5" className="w-full h-44 object-cover rounded-xl mb-4" />
                  <span className="absolute top-3 right-3 bg-orange-200 text-black text-xs px-3 py-1 rounded-full shadow">Best Value</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-1">Urban Loft</h3>
                <p className="text-gray-700 mb-2">1 BHK, 700 sqft</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-orange-600 font-bold text-lg">$950/mo</span>
                  <button className="bg-orange-200 hover:bg-orange-300 text-black text-xs font-semibold px-4 py-2 rounded-lg shadow">View Details</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
