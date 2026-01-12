import { Link } from "react-router-dom";

function NotFound() {
  return (
  <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-zinc-800 text-white">
      <h1>404 - Page Not Found | It may be under construction</h1>
      <Link to="/" className="block bg-indigo-400 px-6 py-3 rounded">Go back to Home</Link>
  </div>
  );
}

export default NotFound;