import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import {
	ModuleRegistry,
	AllCommunityModule,
	themeAlpine,
} from "ag-grid-community";
import { useEffect, useState } from "react";
import { SKUType, useSKUStore } from "../../store/skuStore";
import { Trash2 } from "lucide-react";
import Loading from "../../components/common/Loading";
import ErrorPage from "../../components/common/ErrorPage";
import AddNewSKU from "./AddNewSKU";

ModuleRegistry.registerModules([AllCommunityModule]);

const DelIcon = () => {
	return <Trash2 className="h-full" />;
};

const SKUsPage = () => {
	const { data, loading, error, setData, fetchData } = useSKUStore();
	const [open, setOpen] = useState(false);
	useEffect(() => {
		fetchData();
	}, []);
	const [columnDefs] = useState<ColDef<SKUType>[]>([
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
		{ headerName: "id", hide: true },
		{
			field: "label",
			headerName: "SKU",
			pinned: "left",
			editable: true,
			onCellValueChanged: (event) => {
				const updatedData = data.map((ele) =>
					ele.id === event.data.id
						? { ...ele, label: String(event.newValue) || ele.label }
						: ele
				);
				setData(updatedData);
			},
		},
		{
			field: "price",
			headerName: "Price",
			editable: true,
			onCellValueChanged: (event) => {
				const updatedData = data.map((ele) =>
					ele.id === event.data.id
						? { ...ele, price: String(parseFloat(event.newValue)) || ele.price }
						: ele
				);
				setData(updatedData);
			},
			valueFormatter: (params) => "$ " + parseFloat(params.value).toFixed(2),
		},
		{
			field: "cost",
			headerName: "Cost",
			editable: true,
			onCellValueChanged: (event) => {
				const updatedData = data.map((ele) =>
					ele.id === event.data.id
						? { ...ele, cost: String(parseFloat(event.newValue)) || ele.cost }
						: ele
				);
				setData(updatedData);
			},
			valueFormatter: (params) => "$ " + parseFloat(params.value).toFixed(2),
		},
	]);
	if (loading) <Loading />;
	if (error) <ErrorPage error={error} />;
	return (
		<div className="h-10/12 w-full bg-white z-0">
			{open && <AddNewSKU close={() => setOpen(false)} />}
			<AgGridReact
				theme={themeAlpine}
				rowData={data}
				columnDefs={columnDefs}
				defaultColDef={{
					filter: true,
				}}
				className="z-0"
			/>
			<div className="h-2/12 bg-gray-100 w-full flex items-center">
				<button
					onClick={() => setOpen(true)}
					className=" py-2 px-4 bg-orange-300 rounded">
					Add SKU
				</button>
			</div>
		</div>
	);
};

export default SKUsPage;
