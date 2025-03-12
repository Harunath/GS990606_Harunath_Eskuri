import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";
import SideNav from "./SideNav";

const Layout: React.FC = () => {
	return (
		<div className="flex flex-col h-screen min-w-[1080px]">
			{/* Top Navigation */}
			<TopNav />

			<div className="flex flex-1" style={{ height: "calc(100% - 64px)" }}>
				{/* Side Navigation */}
				<SideNav />

				{/* Page Content */}
				<main className="flex-1 p-6 bg-gray-100">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Layout;
