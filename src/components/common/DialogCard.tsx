import { ReactNode } from "react";

const DialogCard = ({ children }: { children: ReactNode }) => {
	return (
		<div className=" z-50 fixed inset-0 flex items-center justify-center backdrop-blur-sm transition duration-200">
			<div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
				{children}
			</div>
		</div>
	);
};

export default DialogCard;
