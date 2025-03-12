import { UserCircle } from "lucide-react";
import logo from "/logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { storeToken } from "../../lib/token";

const TopNav = () => {
	const navigate = useNavigate();
	const [token, setToken] = useState<string | undefined>(Cookies.get("token"));

	useEffect(() => {
		const checkToken = () => {
			const newToken = Cookies.get("token");
			setToken(newToken);

			if (!newToken) {
				navigate("/login");
			} else {
				storeToken(newToken);
			}
		};
		checkToken();
		const interval = setInterval(checkToken, 5000);
		return () => clearInterval(interval);
	}, [navigate]);

	return (
		<nav className="w-full flex items-center justify-between px-6 py-2 bg-white shadow-md min-w-[1080px] min-h-16">
			{/* Left Side - Logo */}
			<div className="flex items-center space-x-2">
				<img src={logo} alt="GSynergy" className="h-12" />
			</div>

			{/* Center - Title */}
			<h1 className="text-xl font-semibold text-gray-800">Data Viewer App</h1>

			{/* Right Side - User Icon */}
			<div className="flex items-center space-x-4">
				{token ? (
					<button
						onClick={() => navigate("/profile")}
						className="p-2 rounded-full hover:bg-gray-200 transition"
						aria-label="Go to Profile">
						<UserCircle className="w-6 h-6 text-gray-600" />
					</button>
				) : (
					<button
						onClick={() => navigate("/login")}
						className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
						Login
					</button>
				)}
			</div>
		</nav>
	);
};

export default TopNav;
