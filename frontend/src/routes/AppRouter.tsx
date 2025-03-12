import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { lazy, Suspense } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const StoresPage = lazy(() => import("../pages/Stores/StoresPage"));
const SKUsPage = lazy(() => import("../pages/SKUs/SKUsPage"));
const PlanningPage = lazy(() => import("../pages/Planning/PlanningPage"));
const ChartPage = lazy(() => import("../pages/Chart/ChartPage"));
const ProfilePage = lazy(() => import("../pages/Profile/ProfilePage"));

const AppRouter: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				{/* Layout wraps all routes */}
				<Route path="/" element={<Layout />}>
					<Route
						index
						element={
							<Suspense fallback={<div>Loading...</div>}>
								<StoresPage />
							</Suspense>
						}
					/>
					<Route
						path="sku"
						element={
							<Suspense fallback={<div>Loading...</div>}>
								<SKUsPage />
							</Suspense>
						}
					/>
					<Route
						path="planning"
						element={
							<Suspense fallback={<div>Loading...</div>}>
								<PlanningPage />
							</Suspense>
						}
					/>
					<Route
						path="chart"
						element={
							<Suspense fallback={<div>Loading...</div>}>
								<ChartPage />
							</Suspense>
						}
					/>
					<Route
						path="profile"
						element={
							<Suspense fallback={<div>Loading...</div>}>
								<ProfilePage />
							</Suspense>
						}
					/>
				</Route>
			</Routes>
		</Router>
	);
};

export default AppRouter;
