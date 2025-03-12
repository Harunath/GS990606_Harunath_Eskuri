import {
	Bar,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	TooltipProps,
	Legend,
	ComposedChart,
	ResponsiveContainer,
} from "recharts";
import { usePlanningStore } from "../../store/planningStore";
import { useEffect, useState } from "react";
import { PlanningData } from "../../store/planningStore";
import { useStoreStore } from "../../store/storeStore";
import { MessageLoading } from "../../components/ui/message-loading";
import Loading from "../../components/common/Loading";
import ErrorPage from "../../components/common/ErrorPage";

const processPlanningData = (planningData: PlanningData[]) => {
	const weeklyData: Record<
		number,
		{ gmDollars: number; salesDollars: number }
	> = {};

	// Loop through all SKUs
	planningData.forEach((plan) => {
		plan.months.forEach((month) => {
			month.weeks.forEach((week) => {
				if (!weeklyData[week.weekNO]) {
					weeklyData[week.weekNO] = { gmDollars: 0, salesDollars: 0 };
				}
				weeklyData[week.weekNO].gmDollars += week.gmDollars;
				weeklyData[week.weekNO].salesDollars += week.salesDollars;
			});
		});
	});

	// Convert to chart-friendly format
	const chartData = Object.entries(weeklyData).map(([weekNO, values]) => ({
		week: `W${String(weekNO).padStart(2, "0")}`,
		gmDollars: values.gmDollars,
		gmPercentage: values.salesDollars
			? (values.gmDollars / values.salesDollars) * 100
			: 0,
	}));
	return chartData;
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-gray-800 text-white p-2 rounded-md shadow-md">
				<p className="font-semibold">{payload[0].payload.week}</p>
				<p>GM Dollars: ${payload[0]?.value?.toLocaleString() ?? "N/A"}</p>
				<p>GM %: {payload[1]?.value?.toFixed(2) ?? "N/A"}%</p>
			</div>
		);
	}
	return null;
};

const ChartPage = () => {
	const {
		data,
		selectedStore,
		setSelectedStore,
		fetchStoreData,
		loading,
		error,
	} = usePlanningStore();
	const stores = useStoreStore((state) => state.data);
	const fetchStores = useStoreStore((state) => state.fetchData);
	const [processedData, setProcessedData] = useState<
		{ week: string; gmDollars: number; gmPercentage: number }[] | undefined
	>(undefined);

	// Fetch stores if not available
	useEffect(() => {
		if (!stores) fetchStores();
	}, [stores, fetchStores]);

	// Fetch store data when store selection changes
	useEffect(() => {
		if (selectedStore) {
			fetchStoreData(selectedStore === "all" ? "ST035" : selectedStore);
		}
	}, [selectedStore]);

	// Process data after `data` is updated
	useEffect(() => {
		if (data) {
			setProcessedData(processPlanningData(data));
		}
	}, [data]);

	if (loading) <Loading />;
	if (error) <ErrorPage error={error} />;
	return (
		<div>
			<div className="mb-4 w-fit">
				<select
					className="w-80 border-2 border-black rounded focus:border-black"
					name="store"
					id="store"
					value={selectedStore} // Correctly binding the selected value
					onChange={(e) => setSelectedStore(e.target.value)} // Move onChange here
				>
					{stores.map((store) => (
						<option key={store.id} value={store.id}>
							{store.label}
						</option>
					))}
				</select>
			</div>
			{loading && (
				<div className="h-96 w-full flex justify-center items-cente">
					<p className="text-5xl">
						<MessageLoading />
					</p>
				</div>
			)}
			{!loading && (
				<div className="bg-gray-900 p-4 rounded-xl shadow-lg">
					<h2 className="text-white text-center text-lg font-bold mb-2">
						Gross Margin
					</h2>

					<ResponsiveContainer width="100%" height={400}>
						<ComposedChart data={processedData}>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="rgba(255,255,255,0.2)"
							/>
							<XAxis
								className="transition translate-y-2"
								dataKey="week"
								stroke="white"
								interval={0}
								tick={({ x, y, payload }) => (
									<text
										x={x}
										y={y}
										transform={`rotate(320, ${x}, ${y})`} // Rotate around its own position
										textAnchor="end"
										fontSize={10}
										fill="white">
										{payload.value}
									</text>
								)}
							/>

							<YAxis yAxisId="left" orientation="left" stroke="#4db6ac" />
							<YAxis yAxisId="right" orientation="right" stroke="#ff7300" />
							<Tooltip content={<CustomTooltip />} />
							<Legend wrapperStyle={{ color: "white" }} />
							<Bar
								yAxisId="left"
								dataKey="gmDollars"
								fill="#4db6ac"
								name="GM Dollars"
								barSize={8}
								radius={[4, 4, 0, 0]}
							/>
							<Line
								yAxisId="right"
								type="monotone"
								dataKey="gmPercentage"
								stroke="#ff7300"
								name="GM %"
								strokeWidth={2}
							/>
						</ComposedChart>
					</ResponsiveContainer>
				</div>
			)}
		</div>
	);
};

export default ChartPage;
