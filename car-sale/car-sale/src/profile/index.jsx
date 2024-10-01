import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import MyLisitng from "./components/MyListing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Profile() {
	return (
		<div>
			<Header />
			<div className="px-10 md:px-10 my-10"></div>
			<Tabs defaultValue="my-listing" className="w-full">
				<TabsList className="w-full flex justify-center">
					<TabsTrigger value="my-listing">My Auction</TabsTrigger>
					<TabsTrigger value="inbox">Inbox</TabsTrigger>
					<TabsTrigger value="profile">Profile</TabsTrigger>
				</TabsList>
				<TabsContent value="my-listing">
					<MyLisitng />
				</TabsContent>
				<TabsContent value="inbox">Inbox messages</TabsContent>
				<TabsContent value="profile">My profile</TabsContent>
			</Tabs>
		</div>
	);
}

export default Profile;
