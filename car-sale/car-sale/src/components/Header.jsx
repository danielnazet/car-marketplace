import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function Header() {
	const { user, isSignedIn } = useUser();
	return (
		<div className="flex justify-between items-center shadow-sm p-5">
			<img src="/logo.svg" width={150} height={100} />

			<ul className="hidden md:flex gap-16 cursor-pointer">
				<li className="font-medium hover:scale-125 transition-all cursor-pointer hover:text-primary">
					Home
				</li>
				<li className="font-medium hover:scale-125 transition-all cursor-pointer hover:text-primary">
					Search
				</li>
				<li className="font-medium hover:scale-125 transition-all cursor-pointer hover:text-primary">
					New
				</li>
				<li className="font-medium hover:scale-125 transition-all cursor-pointer hover:text-primary">
					Preowned
				</li>
			</ul>
			<div>
				<SignInButton forceRedirectUrl="/">
					<Button>Sign In</Button>
				</SignInButton>
			</div>
			{isSignedIn ? (
				<div className="flex items-center gap-5 cursor-pointer">
					<UserButton />
					<Link to={"/profile"}>
						<Button>My Auction</Button>
					</Link>
				</div>
			) : (
				<Button>Submit Listing</Button>
			)}
		</div>
	);
}

export default Header;
