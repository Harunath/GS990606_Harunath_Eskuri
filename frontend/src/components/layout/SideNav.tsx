import React from "react";
import { NavLink } from "react-router-dom";
import { Store, Package, Calendar, BarChart } from "lucide-react";

const SideNav: React.FC = () => {
	return (
		<aside className="w-60 h-screen p-4">
			<ul className="space-y-4">
				<li>
					<NavLink
						to="/"
						end
						className={({ isActive }) =>
							`flex items-center gap-3 p-3 rounded-lg transition-colors ${
								isActive ? "bg-gray-200" : "hover:bg-gray-100"
							}`
						}>
						<Store size={20} />
						<span>Store</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/sku"
						className={({ isActive }) =>
							`flex items-center gap-3 p-3 rounded-lg transition-colors ${
								isActive ? "bg-gray-200" : "hover:bg-gray-100"
							}`
						}>
						<Package size={20} />
						<span>SKU</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/planning"
						className={({ isActive }) =>
							`flex items-center gap-3 p-3 rounded-lg transition-colors ${
								isActive ? "bg-gray-200" : "hover:bg-gray-100"
							}`
						}>
						<Calendar size={20} />
						<span>Planning</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/chart"
						className={({ isActive }) =>
							`flex items-center gap-3 p-3 rounded-lg transition-colors ${
								isActive ? "bg-gray-200" : "hover:bg-gray-100"
							}`
						}>
						<BarChart size={20} />
						<span>Charts</span>
					</NavLink>
				</li>
			</ul>
		</aside>
	);
};

export default SideNav;
