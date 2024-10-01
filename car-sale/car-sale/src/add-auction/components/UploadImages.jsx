import { storage } from "./../../../configs/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { CarImages } from "./../../../configs/schema";
import { db } from "./../../../configs";

function UploadImages({ triggleUploadImages, setLoader }) {
	const [selectedFileList, setSelectedFileList] = useState([]);

	// Hook that listens to triggleUploadImages state change
	useEffect(() => {
		if (triggleUploadImages) {
			UploadImagesToServer();
		}
	}, [triggleUploadImages]);

	// Handler for selecting files
	const onFileSelected = (event) => {
		const files = event.target.files;

		for (let i = 0; i < files?.length; i++) {
			const file = files[i];
			setSelectedFileList((prev) => [...prev, file]);
		}
	};

	// Handler for removing images from the selected list
	const onImageRemove = (image, index) => {
		const result = selectedFileList.filter((item) => item !== image);
		setSelectedFileList(result);
	};

	// Uploading selected images to the server
	const UploadImagesToServer = async () => {
		console.log(
			"Wartość carListingId (triggleUploadImages):",
			triggleUploadImages
		);

		if (!triggleUploadImages) {
			console.error("Brak carListingId. Nie można przesłać obrazów.");
			return;
		}

		setLoader(true);
		const uploadPromises = selectedFileList.map(async (file) => {
			const fileName = Date.now() + ".jpeg";
			const storageRef = ref(storage, "car-marketplace/" + fileName);
			const metaData = {
				contentType: "image/jpeg",
			};

			try {
				const snapShot = await uploadBytes(storageRef, file, metaData);
				console.log("Uploaded file:", snapShot);

				const downloadURL = await getDownloadURL(storageRef);
				console.log("Download URL:", downloadURL);

				// Zapisz obraz do bazy danych
				const result = await db.insert(CarImages).values({
					imageUrl: downloadURL,
					carListingId: triggleUploadImages, // Sprawdź, czy poprawnie przypisujesz ID aukcji
				});
				console.log("Insert result:", result); // Sprawdź, czy wstawienie jest poprawne
			} catch (error) {
				console.error(
					"Błąd podczas przesyłania obrazu lub zapisu do bazy danych:",
					error
				);
			}
		});

		try {
			await Promise.all(uploadPromises);
		} catch (error) {
			console.error("Błąd podczas przesyłania obrazów:", error);
		} finally {
			setLoader(false);
		}
	};

	return (
		<div>
			<h2 className="font-medium text-xl m-2">Upload Car image</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
				{selectedFileList.map((image, index) => (
					<div key={index} className="relative">
						<IoCloseSharp
							className="absolute m-2 text-lg text-white bg-black rounded-lg cursor-pointer"
							onClick={() => onImageRemove(image, index)}
						/>
						<img
							src={URL.createObjectURL(image)}
							className="w-full h-[180px] object-cover rounded-xl"
						/>
					</div>
				))}
				<label htmlFor="upload-images">
					<div className="cursor-pointer hover:shadow-lg border rounded-xl border-dotted border-primary bg-blue bg-blue-100 p-10">
						<h2 className="text-lg text-center text-primary">+</h2>
					</div>
				</label>
				<input
					type="file"
					multiple={true}
					id="upload-images"
					className="opacity-0"
					onChange={onFileSelected}
				/>
			</div>
		</div>
	);
}

export default UploadImages;
