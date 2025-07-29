import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlatmateCard from "../components/FlatmateCard";
import { useEffect as useEffect2, useState as useState2 } from "react";
import { fetchUserConnections } from "../utils/connections";

export default function FindFlatmates() {
  const [flatmates, setFlatmates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connections, setConnections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
	const userId = localStorage.getItem("userId");
	const userEmail = localStorage.getItem("userEmail");
	let url = `/api/flatmates/matches/${userId}`;
	if (userEmail) {
	  url += `?userEmail=${encodeURIComponent(userEmail)}`;
	}
	fetch(url)
	  .then((res) => res.json())
	  .then((data) => {
		if (Array.isArray(data)) {
		  setFlatmates(data);
		} else {
		  setFlatmates([]);
		}
		setLoading(false);
	  })
	  .catch(() => {
		setFlatmates([]);
		setLoading(false);
	  });
	// Fetch connections for the logged-in user
	fetchUserConnections().then(setConnections);
  }, []);

	if (loading)
		return (
			<div className="flex justify-center items-center h-64">Loading...</div>
		);

	return (
		<div className="min-h-screen bg-white">
			<div className="flex flex-col items-center justify-center">
				<button
					className="mt-8 mb-4 px-4 py-2 bg-blue-200 text-blue-800 rounded-xl font-semibold shadow hover:bg-blue-300 transition self-start ml-12"
					onClick={() => navigate("/edit-flatmate-preferences")}
				>
					Edit Preferences
				</button>
				<div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg text-center">
					<h1 className="text-2xl font-bold text-pink-700 mb-6">
						Find Flatmates
					</h1>
					{flatmates.length === 0 ? (
						<div className="flex flex-col items-center mt-16">
							<img
								src="https://www.svgrepo.com/show/40412/empty-box.svg"
								alt="No matches"
								className="w-32 h-32 mb-4 opacity-60"
							/>
							<p className="text-xl text-gray-400 mb-2">
								No compatible flatmates found.
							</p>
							<button
								className="mt-2 px-4 py-2 bg-pink-200 rounded-xl hover:bg-pink-300"
								onClick={() =>
									navigate("/edit-flatmate-preferences")
								}
							>
								Update Profile
							</button>
						</div>
					) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				  {flatmates.map((f, i) => {
					const isConnected = connections.includes(f._id);
					return (
					  <div key={i}>
						{f.compatibility !== undefined && (
						  <div className="mb-2 flex justify-center">
							<span className="inline-block px-3 py-1 rounded-full bg-pink-100 text-pink-700 font-bold text-sm shadow">
							  Compatibility: {f.compatibility}%
							</span>
						  </div>
						)}
						<FlatmateCard profile={f} alreadyConnected={isConnected} />
					  </div>
					);
				  })}
				</div>
					)}
				</div>
			</div>
		</div>
	);
}
