import React from "react";
import { LuFuel } from "react-icons/lu";
import { SlSpeedometer } from "react-icons/sl";
import { TbManualGearbox } from "react-icons/tb";
import { MdOpenInNew } from "react-icons/md";
import { Separator } from "@/components/ui/separator";

function CarItem({ car }) {
	if (!car || !car.images || car.images.length === 0) {
		return <div>Brak danych o samochodzie</div>;
	}

	const imageUrl = car.images[0].imageUrl || "domyślny-url-obrazka"; // URL obrazu zapasowego

	return (
		<div className="flex flex-col items-center rounded-xl bg-white border hover:shadow-lg cursor-pointer">
			<img
				src={car?.images[0]?.imageUrl}
				width={"100%"}
				height={250}
				className="rounded-xl"
			/>
			<div className="p-3">
				<h2 className=" text-black text-lg mb-2">
					{car?.auctionTitle}
					<Separator />
					<div className="grid grid-cols-3 mt-5">
						<div className="flex flex-col items-center">
							<LuFuel className="text-lg mb-2" />
							<h2>{car.km}km</h2>
						</div>
						<div className="flex flex-col items-center">
							<SlSpeedometer className="text-lg mb-2" />
							<h2>{car.fuelType}</h2>
						</div>
						<div className="flex flex-col items-center">
							<TbManualGearbox className="text-lg mb-2" />
							<h2>{car.transmission}</h2>
						</div>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<h2 className="text-xl">${car.price}</h2>
						<h1 className="text-primary text-sm flex gap-2 items-center">
							View details <MdOpenInNew />
						</h1>
					</div>
				</h2>
			</div>
		</div>
	);
}

export default CarItem;
