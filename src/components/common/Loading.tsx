import { MessageLoading } from "../ui/message-loading";

const Loading = () => {
	return (
		<div className="full w-full flex justify-center items-center bg-white">
			<p className="text-5xl">
				<MessageLoading />
			</p>
		</div>
	);
};

export default Loading;
