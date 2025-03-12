import { useState } from "react";
import { useSKUStore } from "../../store/skuStore";
import DialogCard from "../../components/common/DialogCard";
import { SKUType } from "../../store/skuStore";

const AddNewSKU = ({ close }: { close: () => void }) => {
	const { data, setData } = useSKUStore();
	const [newData, setNewData] = useState<SKUType>({
		id: "",
		label: "",
		price: "",
		cost: "",
	});
	const handleUpdate = () => {
		setData([...data, newData]);
	};
	return (
		<DialogCard>
			<h2 className="text-lg font-semibold mb-4 text-center">Add new SKU</h2>
			<div>
				<label>
					SKU ID
					<input
						type="text"
						placeholder="Enter new name"
						value={newData?.id ? newData.id : ""}
						onChange={(e) =>
							setNewData((prev) => ({
								...prev,
								id: e.target.value.toUpperCase(),
							}))
						}
						className="w-full p-2 mb-3 border rounded"
					/>
				</label>
			</div>
			<div>
				<label>
					label
					<input
						type="text"
						placeholder="Enter new name"
						value={newData?.label ? newData.label : ""}
						onChange={(e) =>
							setNewData((prev) => ({ ...prev, label: e.target.value }))
						}
						className="w-full p-2 mb-3 border rounded"
					/>
				</label>
			</div>
			<div>
				<label>
					Price
					<input
						type="number"
						placeholder="Enter new Price"
						value={newData?.price ? Number(newData.price) : ""}
						onChange={(e) =>
							setNewData((prev) => ({ ...prev, price: String(e.target.value) }))
						}
						className="w-full p-2 mb-3 border rounded"
					/>
				</label>
			</div>
			<div>
				<label>
					Cost
					<input
						type="number"
						placeholder="Enter new Cost"
						value={newData?.cost ? Number(newData.cost) : 0}
						onChange={(e) =>
							setNewData((prev) => ({ ...prev, cost: String(e.target.value) }))
						}
						className="w-full p-2 mb-3 border rounded"
					/>
				</label>
			</div>

			<div className="flex justify-center items-center gap-x-4 w-full">
				<button
					onClick={close}
					className="min-w-6 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition shadow-md">
					Cancel
				</button>
				<button
					onClick={handleUpdate}
					className="min-w-6 text-white px-6 py-2 rounded-lg transition shadow-md bg-blue-500 hover:bg-blue-600">
					Add Store
				</button>
			</div>
		</DialogCard>
	);
};

export default AddNewSKU;
