const ErrorPage = ({ error }: { error: string }) => {
	return (
		<div className="h-10/12 w-full flex justify-center items-center bg-white">
			<p className="text-5xl">{error}</p>
		</div>
	);
};

export default ErrorPage;
