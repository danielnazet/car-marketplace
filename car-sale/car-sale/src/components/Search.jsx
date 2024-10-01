import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "./ui/separator";
import { IoSearchOutline } from "react-icons/io5";
import Data from "@/Shared/Data";

function Search() {
	return (
		<div className="p-2 md:p-4 bg-white rounded-md md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%]">
			<Select>
				<SelectTrigger className="outline-none md:border-none w-full shadow-none">
					<SelectValue placeholder="Cars" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="Old">Old</SelectItem>
					<SelectItem value="New">New</SelectItem>
				</SelectContent>
			</Select>
			<Separator orientation="vertical" className="hidden md:block" />
			<Select>
				<SelectTrigger className="outline-none md:border-none w-full shadow-none">
					<SelectValue placeholder="Car Brands" />
				</SelectTrigger>
				<SelectContent>
					{Data.carBrands.map((maker, index) => (
						<SelectItem value={maker.name}>{maker.name}</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Separator orientation="vertical" className="hidden md:block" />
			<Select>
				<SelectTrigger className="outline-none md:border-none w-full shadow-none">
					<SelectValue placeholder="Pricing" />
				</SelectTrigger>
				<SelectContent>
					{Data.carPricing.map((price, index) => (
						<SelectItem value={price.amount}>
							{price.amount}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<div>
				<IoSearchOutline className="text-[50px] bg-primary rounded-full p-3 text-white hover:scale-110 transition-all cursor-pointer" />
			</div>
		</div>
	);
}

export default Search;
