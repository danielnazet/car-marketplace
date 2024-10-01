import { Button } from "@/components/ui/button";
import { db } from "../../../configs";
import { CarImages, CarListing } from "../../../configs/schema";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { desc, eq } from "drizzle-orm";
import { useUser } from "@clerk/clerk-react";
import Service from "@/Shared/Service";
import CarItem from "@/components/CarItem";

function MyListing() {
	const { user } = useUser();
	const [carList, setCarList] = useState([]);

	// Funkcja, która pobiera dane z bazy
	const GetUserCarListing = async () => {
		try {
			const result = await db
				.select()
				.from(CarListing)
				.leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
				.where(
					eq(
						CarListing.createdBy,
						user?.primaryEmailAddress?.emailAddress
					)
				)
				.orderBy(desc(CarListing.id));

			// Formatujemy dane za pomocą funkcji Service.FormatResult
			const resp = Service.FormatResult(result);

			// Jeśli dane się zmieniły, aktualizujemy stan
			if (JSON.stringify(resp) !== JSON.stringify(carList)) {
				setCarList(resp);
				console.log("Aukcje:", resp);
			}
		} catch (error) {
			console.error("Błąd podczas pobierania aukcji:", error);
		}
	};

	// Wywołaj pobieranie danych po zmianie użytkownika
	useEffect(() => {
		if (user) {
			GetUserCarListing();
		}
	}, [user]);

	return (
		<div className="mt-6">
			<div className="flex justify-between items-center">
				<h2 className="font-bold text-2xl">My Auction</h2>
				<Link to={"/add-auction"}>
					<Button>+Add New Auction</Button>
				</Link>
			</div>

			{/* Renderowanie listy aukcji */}
			<div>
				{carList.length > 0 ? (
					carList.map((item, index) => (
						<div key={index}>
							<CarItem car={item} />
						</div>
					))
				) : (
					<p>Brak aukcji do wyświetlenia.</p>
				)}
			</div>
		</div>
	);
}

export default MyListing;
