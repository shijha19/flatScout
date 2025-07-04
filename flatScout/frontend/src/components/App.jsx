import Navbar from "./navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-200 to-purple-300">
        <div className="flex flex-1">
          {/* Main Content */}
          <main className="flex-1 p-8">
            {/* Flat Listings Section */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Flat Listings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-14 pb-12 pt-4 px-2">
              {/* Example Flat Card 1 */}
              <div className="w-[350px] h-[430px] bg-white rounded-2xl shadow-xl p-10 flex-shrink-0 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl border border-purple-100 mx-auto">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Flat 1" className="w-full h-44 object-cover rounded-xl mb-4" />
                  <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full shadow">Featured</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Modern Apartment</h3>
                <p className="text-gray-500 mb-2">2 BHK, 1200 sqft</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-blue-600 font-bold text-lg">$1,200/mo</span>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow">View Details</button>
                </div>
              </div>
              {/* Example Flat Card 2 */}
              <div className="w-[350px] h-[430px] bg-white rounded-2xl shadow-xl p-10 flex-shrink-0 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl border border-purple-100 mx-auto">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" alt="Flat 2" className="w-full h-44 object-cover rounded-xl mb-4" />
                  <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">New</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Cozy Studio</h3>
                <p className="text-gray-500 mb-2">Studio, 500 sqft</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-blue-600 font-bold text-lg">$800/mo</span>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow">View Details</button>
                </div>
              </div>
              {/* Example Flat Card 3 */}
              <div className="w-[350px] h-[430px] bg-white rounded-2xl shadow-xl p-10 flex-shrink-0 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl border border-purple-100 mx-auto">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80" alt="Flat 3" className="w-full h-44 object-cover rounded-xl mb-4" />
                  <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">Premium</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Luxury Condo</h3>
                <p className="text-gray-500 mb-2">3 BHK, 1800 sqft</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-blue-600 font-bold text-lg">$2,500/mo</span>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow">View Details</button>
                </div>
              </div>
              {/* Add more cards as needed */}
              {/* Example Flat Card 4 */}
              <div className="w-[350px] h-[430px] bg-white rounded-2xl shadow-xl p-10 flex-shrink-0 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl border border-purple-100 mx-auto">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Flat 4" className="w-full h-44 object-cover rounded-xl mb-4" />
                  <span className="absolute top-3 right-3 bg-yellow-600 text-white text-xs px-3 py-1 rounded-full shadow">Hot Deal</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Family Home</h3>
                <p className="text-gray-500 mb-2">4 BHK, 2200 sqft</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-blue-600 font-bold text-lg">$1,800/mo</span>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow">View Details</button>
                </div>
              </div>
              {/* Example Flat Card 5 */}
              <div className="w-[350px] h-[430px] bg-white rounded-2xl shadow-xl p-10 flex-shrink-0 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl border border-purple-100 mx-auto">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80" alt="Flat 5" className="w-full h-44 object-cover rounded-xl mb-4" />
                  <span className="absolute top-3 right-3 bg-pink-600 text-white text-xs px-3 py-1 rounded-full shadow">Best Value</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Urban Loft</h3>
                <p className="text-gray-500 mb-2">1 BHK, 700 sqft</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-blue-600 font-bold text-lg">$950/mo</span>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow">View Details</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
