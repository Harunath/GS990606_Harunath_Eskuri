import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ErrorPage from "../../components/common/ErrorPage";
import Loading from "../../components/common/Loading";
import { api } from "../../lib/constants";

interface User {
	name: string;
	email: string;
	profilePic?: string;
}

const ProfilePage = () => {
	const [user, setUser] = useState<User | null>(null);
	const [name, setName] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [updating, setUpdating] = useState<boolean>(false);
	const [message, setMessage] = useState<string | null>(null);
	const [edit, setEdit] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			const token = Cookies.get("token");

			if (!token) {
				navigate("/login");
				return;
			}

			try {
				const response = await fetch(`${api}/user`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				if (!response.ok) {
					if (response.status === 401) {
						Cookies.remove("token");
						navigate("/login");
					}
					throw new Error("Failed to fetch user data");
				}

				const data: User = await response.json();
				setUser(data);
				setName(data.name);
				setError(null);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Unknown error");
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, [navigate]);

	const handleLogout = () => {
		Cookies.remove("token");
		navigate("/login");
	};

	const handleUpdate = async () => {
		if (!name) {
			setMessage("Please provide a name to update.");
			return;
		}

		setUpdating(true);
		setMessage(null);

		try {
			const token = Cookies.get("token");
			if (!token) {
				navigate("/login");
				return;
			}

			const response = await fetch(`${api}/user`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ name }),
			});

			if (!response.ok) throw new Error("Failed to update profile");

			const updatedUser: User = await response.json();
			setUser(updatedUser);
			setEdit(false);
			setMessage("Profile updated successfully!");
		} catch (err) {
			setMessage(err instanceof Error ? err.message : "Update failed");
		} finally {
			setEdit(false);
			setUpdating(false);
		}
	};

	if (loading) return <Loading />;
	if (error) return <ErrorPage error={error} />;

	return (
		<div className="relative h-full bg-white w-full p-6 flex flex-col items-center">
			{/* Profile Card */}
			<div className="w-full max-w-lg rounded-lg p-6 flex gap-x-4 shadow-md bg-gray-100">
				<img
					src={
						user?.profilePic ||
						"https://res.cloudinary.com/degrggosz/image/upload/v1741712651/default-profile-pic-e1513291410505_ds7wda.jpg"
					}
					alt="Profile"
					className="w-24 h-24 rounded-full border"
				/>
				<div className="p-2">
					<p className="text-xl font-semibold mb-2">
						Name: {user?.name || "New User"}
					</p>
					<p className="text-xl font-semibold text-gray-600">
						Email: {user?.email || "xyz@gmail.com"}
					</p>
				</div>
			</div>

			{/* Edit and Logout Buttons */}
			<div className="flex justify-center items-center gap-x-4 w-full mt-6">
				<button
					onClick={() => setEdit(true)}
					disabled={updating}
					className="min-w-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition shadow-md">
					Edit
				</button>
				<button
					onClick={handleLogout}
					className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition shadow-md">
					Logout
				</button>
			</div>

			{/* Edit Name Modal */}
			{edit && (
				<div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm transition duration-200">
					<div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
						<h2 className="text-lg font-semibold mb-4 text-center">
							Update Name
						</h2>

						<input
							type="text"
							placeholder="Enter new name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full p-2 mb-3 border rounded"
						/>

						<div className="flex justify-center items-center gap-x-4 w-full">
							<button
								onClick={() => setEdit(false)}
								className="min-w-6 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition shadow-md">
								Cancel
							</button>
							<button
								onClick={handleUpdate}
								disabled={updating}
								className={`min-w-6 text-white px-6 py-2 rounded-lg transition shadow-md ${
									updating ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
								}`}>
								{updating ? "Updating..." : "Update Name"}
							</button>
						</div>

						{message && (
							<p className="text-sm mt-3 text-center text-gray-700">
								{message}
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
