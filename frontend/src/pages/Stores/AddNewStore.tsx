import { useState } from "react";
import { useStoreStore, StoreType } from "../../store/storeStore";
import { City, ICity, State } from "country-state-city";
import DialogCard from "../../components/common/DialogCard";

const AddNewStore = ({ close }: { close: () => void }) => {
	const { data, setData } = useStoreStore();
	const [newData, setNewData] = useState<StoreType>({
		"S no": data.length,
		id: "",
		label: "",
		city: "",
		state: "",
	});
	const [stateCities, setStateCities] = useState<ICity[] | []>([]);
	const usStates = State.getStatesOfCountry("US") || [];

	const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const state = e.target.value;

		const selectedState = usStates.find((s) => s.isoCode === state);
		const cities = City.getCitiesOfState(
			selectedState?.countryCode as string,
			selectedState?.isoCode as string
		);
		setStateCities(cities);
		setNewData((prev) => ({
			...prev,
			state: selectedState?.isoCode || "",
		}));
	};

	const handleUpdate = () => {
		setData([...data, newData]);
		setNewData({
			"S no": 0,
			id: "",
			label: "",
			city: "",
			state: "",
		});
		close();
	};
	return (
		<DialogCard>
			<div className="h-full w-full space-y-2">
				<h2 className="text-lg font-semibold mb-4 text-center">
					Add new store
				</h2>
				<div>
					<label>
						Store ID
						<input
							type="text"
							placeholder="Enter new name"
							value={newData.id}
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
							value={newData.label}
							onChange={(e) =>
								setNewData((prev) => ({ ...prev, label: e.target.value }))
							}
							className="w-full p-2 mb-3 border rounded"
						/>
					</label>
				</div>

				<div>
					<label className="block text-lg font-medium">Select a State:</label>
					<select
						className="w-full p-2 border rounded-md"
						value={newData.state.length > 0 ? newData.state : ""}
						onChange={handleStateChange}>
						<option value="">-- Select City --</option>
						{usStates.map((state) => (
							<option
								key={state.name + state.latitude + state.longitude}
								value={state.isoCode}>
								{state.name + " " + state.isoCode}
							</option>
						))}
					</select>
				</div>
				{newData.state && (
					<div>
						<label className="block text-lg font-medium">Select a City:</label>
						<select
							className="w-full p-2 border rounded-md"
							value={newData.city.length > 0 ? newData.city : ""}
							onChange={(e) =>
								setNewData((prev) => ({ ...prev, city: e.target.value }))
							}>
							<option value="">-- Select City --</option>
							{stateCities.map((city) => (
								<option
									key={
										city.name + city.stateCode + city.latitude + city.longitude
									}
									value={city.name}>
									{city.name}
								</option>
							))}
						</select>
					</div>
				)}

				<div className="flex justify-center items-center gap-x-4 w-full mt-8">
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
			</div>
		</DialogCard>
	);
};

export default AddNewStore;
