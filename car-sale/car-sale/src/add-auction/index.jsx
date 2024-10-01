import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import carDetails from "./../Shared/carDetails.json";
import InputField from "./components/InputField";
import DropdownField from "./components/DropdownField";
import { Separator } from "@/components/ui/separator";
import { features } from "./../Shared/features.json";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { db } from "./../../configs";
import { CarListing } from "./../../configs/schema";
import TextAreaField from "./components/TextAreaField";
import UploadImages from "./components/UploadImages";
import { RiLoader2Fill } from "react-icons/ri";
import { Toaster } from "./../components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";

function AddAuction() {
	const [formData, setFormData] = useState({});
	const [featuresData, setFeaturesData] = useState({});
	const [triggerUploadImage, setTriggerUploadImage] = useState();
	const [loader, setLoader] = useState(false);
	const navigate = useNavigate();
	const { user } = useUser();

	useEffect(() => {
		console.log("Form Data Updated:", formData);
	}, [formData]);

	useEffect(() => {
		console.log("Features Data Updated:", featuresData);
	}, [featuresData]);

	const handleInputChange = (name, value) => {
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleFeatureChange = (name, value) => {
		setFeaturesData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoader(true);
		console.log(formData);
		// Toaster("Please wait...");

		try {
			const result = await db
				.insert(CarListing)
				.values({
					...formData,
					features: featuresData,
					createdBy: user?.primaryEmailAddress.emailAddress,
					postedOn: moment().format("DD/MM/yyyy"),
				})
				.returning({ id: CarListing.id });

			if (result) {
				console.log("Data Saved");
				setTriggerUploadImage(result[0]?.id);
				navigate("/profile");
			}
		} catch (e) {
			console.log("Error", e);
		} finally {
			setLoader(false);
		}
	};

	return (
		<div>
			<Header />
			<div className="px-10 md:px-10 my-10">
				<h2 className="font-bold text-2xl">Add new auction</h2>
				<form className="p-5 border rounded-xl mt-5">
					{/* Car details */}
					<div>
						<h2 className="font-medium text-xl mb-6">
							Car Details
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							{carDetails.carDetails.map((item, index) => (
								<div key={index}>
									<label className="text-sm">
										{item?.label}
										{item.required && (
											<span className="text-red-500">
												*
											</span>
										)}
									</label>
									{item.fieldType === "text" ||
									item.fieldType === "number" ? (
										<InputField
											item={item}
											handleInputChange={
												handleInputChange
											}
										/>
									) : item.fieldType === "dropdown" ? (
										<DropdownField
											item={item}
											handleInputChange={
												handleInputChange
											}
										/>
									) : item.fieldType === "textarea" ? (
										<TextAreaField
											item={item}
											handleInputChange={
												handleInputChange
											}
										/>
									) : null}
								</div>
							))}
						</div>
					</div>
					<Separator className="my-6" />
					{/* Features List */}
					<div>
						<h2 className="font-medium text-xl mb-6">Features</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{features.map((item, index) => (
								<div
									key={index}
									className="flex gap-2 item-center"
								>
									<Checkbox
										onCheckedChange={(value) =>
											handleFeatureChange(
												item.name,
												value
											)
										}
									/>
									<h2>{item.label}</h2>
								</div>
							))}
						</div>
					</div>
					{/* Car images */}
					<Separator className="my-6" />
					<UploadImages
						triggerUploadImage={triggerUploadImage}
						setLoader={(v) => {
							setLoader(v);
							console.log("Navigating to /profile");
							if (!v) navigate("/profile");
						}}
					/>
					<div className="mt-10 flex justify-end">
						<Button
							type="button"
							disabled={loader}
							onClick={(e) => onSubmit(e)}
						>
							{!loader ? (
								"Submit"
							) : (
								<RiLoader2Fill className="animate-spin text-lg" />
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddAuction;
