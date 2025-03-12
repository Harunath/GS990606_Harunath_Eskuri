import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import type { ColDef, ColGroupDef } from "ag-grid-community";
import { useEffect } from "react";
import { usePlanningStore, PlanningData } from "../../store/planningStore";
import { useStoreStore } from "../../store/storeStore";
import Loading from "../../components/common/Loading";
import ErrorPage from "../../components/common/ErrorPage";

ModuleRegistry.registerModules([AllCommunityModule]);

const PlanningPage = () => {
	const { data, setData, loading, error, fetchStoreData, fetchData } =
		usePlanningStore();
	const stores = useStoreStore((state) => state.data);
	const fetchStore = useStoreStore((state) => state.fetchData);
	const { selectedStore, setSelectedStore } = usePlanningStore();
	useEffect(() => {
		if (selectedStore != "all") fetchStoreData(selectedStore || "ST035");
		else fetchData();
		if (stores.length == 0) fetchStore();
	}, [selectedStore]);
	const generateColumnDefs = (data: PlanningData[]) => {
		if (!data || data.length === 0) return [];

		const columnDefs: (ColDef | ColGroupDef)[] = [
			{
				field: "Store.name",
				headerName: "Store",
				pinned: "left",
			},
			{ field: "SKU.name", headerName: "SKU", pinned: "left" },
		];

		// Directly map backend data
		data[0]?.months.forEach((month, monthIndex) => {
			const monthColumn: ColGroupDef = {
				headerName: month.monthName.toUpperCase(),
				marryChildren: true,
				children: month.weeks.map((week, weekIndex) => ({
					headerName: `Week ${week.weekNO}`,
					marryChildren: true,
					children: [
						{
							headerName: "Sales Units",
							type: "numericColumn",
							editable: true,
							valueSetter: (params) => {
								params.data.months[monthIndex].weeks[weekIndex].salesUnits =
									Math.floor(Number(params.newValue) || 0);
								return true;
							},
							onCellValueChanged: (event) => {
								const updatedData = data.map((ele) => {
									if (
										ele.Store.Store === event.data?.Store?.Store &&
										ele.SKU.SKU === event.data?.SKU?.SKU
									) {
										return {
											...ele,
											months: ele.months.map((month, mIdx) =>
												mIdx === monthIndex
													? {
															...month,
															weeks: month.weeks.map((week, wIdx) => {
																return wIdx === weekIndex
																	? {
																			...week,
																			costDollars:
																				Number(ele.SKU.cost) *
																				Number(event.newValue),
																			gmDollars:
																				(Number(ele.SKU.price) -
																					Number(ele.SKU.cost)) *
																				Number(event.newValue),
																			gmPercentage:
																				(((Number(ele.SKU.price) -
																					Number(ele.SKU.cost)) *
																					Number(event.newValue)) /
																					Number(ele.SKU.price)) *
																				100,
																			salesDollars:
																				Number(ele.SKU.price) *
																				Number(event.newValue),
																			salesUnits: Number(event.newValue),
																			weekNO: weekIndex,
																	  }
																	: week;
															}),
													  }
													: month
											),
										};
									}
									return ele; // ✅ Important: Return unchanged objects
								});

								setData(updatedData);
							},

							valueGetter: (params) =>
								params.data?.months?.[monthIndex]?.weeks?.[weekIndex]
									?.salesUnits ?? 0,
						},
						{
							headerName: "Sales Dollars",
							type: "numericColumn",
							valueGetter: (params) =>
								params.data?.months?.[monthIndex]?.weeks?.[weekIndex]
									?.salesDollars ?? 0,
							valueFormatter: (params) =>
								params.value != null
									? `$ ${params.value.toFixed(2)}`
									: "$ 0.00",
						},
						{
							headerName: "GM Dollars",
							type: "numericColumn",
							valueGetter: (params) =>
								params.data?.months?.[monthIndex]?.weeks?.[weekIndex]
									?.gmDollars ?? 0,
							valueFormatter: (params) =>
								params.value != null
									? `$ ${params.value.toFixed(2)}`
									: "$ 0.00",
						},
						{
							headerName: "GM %",
							type: "numericColumn",
							valueGetter: (params) =>
								params.data?.months?.[monthIndex]?.weeks?.[weekIndex]
									?.gmPercentage ?? 0,
							valueFormatter: (params) =>
								params.value != null ? `${params.value.toFixed(2)} %` : "0 %",
							cellStyle: (params) => {
								const value = params.value ?? 0;
								if (value > 39) return { backgroundColor: "green" };
								if (value > 10) return { backgroundColor: "yellow" };
								return { backgroundColor: "red" };
							},
						},
					],
				})),
			};
			columnDefs.push(monthColumn);
		});

		return columnDefs;
	};

	if (loading) <Loading />;
	if (error) <ErrorPage error={error} />;
	return (
		<div className="h-full w-full overflow-auto bg-white p-2 rounded">
			<div className="mb-4">
				<select
					className="w-80 border-2 border-black rounded focus:border-black"
					name="store"
					id="store"
					value={selectedStore} // Correctly binding the selected value
					onChange={(e) => setSelectedStore(e.target.value)} // Move onChange here
				>
					<option value="all">All</option>
					{stores.map((store) => (
						<option key={store.id} value={store.id}>
							{store.label}
						</option>
					))}
				</select>
			</div>
			<div className="h-[500px] w-full overflow-x-auto text-black">
				<AgGridReact
					rowData={data}
					columnDefs={generateColumnDefs(data)}
					defaultColDef={{ flex: 1, resizable: true, minWidth: 100 }}
					className="ag-theme-alpine"
					domLayout="autoHeight"
				/>
			</div>
		</div>
	);
};

export default PlanningPage;
