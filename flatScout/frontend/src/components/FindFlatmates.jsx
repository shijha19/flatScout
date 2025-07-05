import { useEffect, useState } from "react";
import axios from "axios";
import FlatmateCard from "../components/FlatmateCard";

export default function FindFlatmates() {
  const [flatmates, setFlatmates] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/flatmate/match/abc123")
      .then(res => setFlatmates(res.data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {flatmates.map((f, i) => <FlatmateCard key={i} profile={f} />)}
    </div>
  );
}
