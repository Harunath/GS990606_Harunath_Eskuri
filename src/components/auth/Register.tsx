"use client";

import { useState } from "react";
import { api } from "../../lib/constants";
import { Link, useNavigate } from "react-router-dom";
import { storeToken } from "../../lib/token";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const [showPass, setShowPass] = useState(false);

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const res = await fetch(`${api}/auth/signup`, {
				method: "POST",
				body: JSON.stringify({ email, password }),
				headers: { "Content-Type": "application/json" },
			});

			const data = await res.json();
			storeToken(data.token);
			if (!data) throw new Error(data.message || "Registration failed");
			navigate("/");
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An error occurred. Please try again.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="p-8 bg-white shadow-lg rounded-lg w-96">
				<h2 className="text-2xl font-bold mb-4">Register</h2>
				{error && <p className="text-red-500">{error}</p>}
				<form onSubmit={handleRegister} className="space-y-4">
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
						required
					/>

					<div className="relative">
						<input
							type={showPass ? "text" : "password"}
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full p-3 border border-gray-300 rounded-md pr-10 focus:ring-2 focus:ring-green-500 outline-none"
							required
						/>
						<button
							type="button"
							onClick={() => setShowPass((prev) => !prev)}
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none">
							{showPass ? "👁️" : "👁️‍🗨️"}
						</button>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 disabled:opacity-50">
						{loading ? "Registering..." : "Register"}
					</button>
				</form>
				<p className="mt-4 text-sm">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-500 hover:underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
