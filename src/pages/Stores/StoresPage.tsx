import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import {
	ModuleRegistry,
	AllCommunityModule,
	themeAlpine,
} from "ag-grid-community";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useStoreStore, StoreType } from "../../store/storeStore";
import Loading from "../../components/common/Loading";
import ErrorPage from "../../components/common/ErrorPage";
import AddNewStore from "./AddNewStore";

ModuleRegistry.registerModules([AllCommunityModule]);

const DelIcon = () => {
	return <Trash2 className="h-full" />;
};

const StoresPage = () => {
	const { data, loading, error, fetchData, setData } = useStoreStore();
	const [open, setOpen] = useState(false);
	const [columnDefs] = useState<ColDef<StoreType>[]>([
		{
			headerName: "",
			cellRenderer: DelIcon,
			onCellClicked: (event) => {
				const updatedData = data.filter((ele) => ele.id !== event.data?.id);
				setData(updatedData);
			},
			pinned: "left",
			maxWidth: 100,
		},
		{
			headerName: "S.No",
			valueGetter: (params) =>
				params?.node?.rowIndex ? params.node.rowIndex + 1 : 1,
			maxWidth: 100,
			pinned: "left",
		},
		{
			field: "label", // Assuming "store" is an object with a "name" field
			headerName: "Store",
			width: 200,
			pinned: "left",
			editable: true,
			onCellValueChanged: (event) => {
				console.log(event.newValue);
				const updatedData = data.map((ele) =>
					ele.id === event.data.id
						? { ...ele, label: event.newValue || ele.label }
						: ele
				);
				setData(updatedData);
			},
		},
		{
			field: "city",
			headerName: "City",
			width: 120,
			sortable: true, // Allow sorting
			filter: "agTextColumnFilter", // Enable text filtering
		},
		{
			field: "state",
			headerName: "State",
			width: 120,
			sortable: true,
			filter: "agTextColumnFilter",
		},
	]);
	useEffect(() => {
		fetchData();
	}, []);

	if (loading) <Loading />;
	if (error) <ErrorPage error={error} />;
	return (
		<div className="h-10/12 w-full">
			{open && <AddNewStore close={() => setOpen(false)} />}
			<AgGridReact
				theme={themeAlpine}
				rowData={data}
				columnDefs={columnDefs}
				defaultColDef={{
					filter: true,
				}}
			/>
			<div className="h-2/12 bg-gray-100 w-full flex items-center">
				<button
					onClick={() => setOpen(true)}
					className=" py-2 px-4 bg-orange-300 rounded">
					Add Store
				</button>
			</div>
		</div>
	);
};

export default StoresPage;
