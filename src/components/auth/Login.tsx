import { useState } from "react";
import { api } from "../../lib/constants";
import { Link, useNavigate } from "react-router-dom";
import { storeToken } from "../../lib/token";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const res = await fetch(`${api}/auth/login`, {
				method: "POST",
				body: JSON.stringify({ email, password }),
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();

			if (!data) {
				setError("Login failed");
			}

			storeToken(data.token);

			navigate("/");
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("An error occurred. Please try again.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center ">
			<div className="flex w-[80%] max-w-5xl  overflow-hidden">
				{/* Left Section - Image & App Text */}
				<div className="w-1/2 flex flex-col items-center justify-center p-8 border-r ">
					{/* Replace with an actual image */}
					<img
						src="https://res.cloudinary.com/degrggosz/image/upload/v1741719503/3d-login-vector-poster_pcgnme.jpg"
						alt="Task Management Illustration"
						className="mb-4 h-80 w-[500px]"
					/>
					<div className="border border-blue-300 p-4 rounded-lg bg-blue-50 shadow-md">
						<p className="font-semibold text-blue-900">Demo Login:</p>
						<div className="mt-2 space-y-1 text-sm">
							<p className="flex items-center">
								<span className="font-medium text-gray-700">Email:</span>
								<span className="ml-2 px-2 py-1 bg-white border border-gray-300 rounded text-gray-900">
									xyz@gmail.com
								</span>
							</p>
							<p className="flex items-center">
								<span className="font-medium text-gray-700">Password:</span>
								<span className="ml-2 px-2 py-1 bg-white border border-gray-300 rounded text-gray-900">
									xyzPassword
								</span>
							</p>
						</div>
					</div>
				</div>

				{/* Right Section - Login Form */}
				<div className="w-1/2 flex items-center justify-center p-8">
					<div className="w-full max-w-sm">
						<h2 className="text-2xl font-bold mb-4">Login</h2>
						{error && <p className="text-red-500">{"failed to login"}</p>}
						<form onSubmit={handleLogin} className="space-y-4">
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full p-2 border rounded border-gray-400"
								required
							/>
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full p-2 border rounded border-gray-400"
								required
							/>
							<button
								type="submit"
								disabled={loading}
								className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-400 transition">
								{loading ? "Logging in..." : "Login"}
							</button>
						</form>
						<p className="mt-4 text-sm text-gray-400">
							Don&apos;t have an account?{" "}
							<Link to="/register" className="text-blue-400 hover:underline">
								Register
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
