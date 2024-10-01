import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CarListing = pgTable("carListing", {
	id: serial("id").primaryKey(),
	auctionTitle: varchar("auctionTitle").notNull(),
	sellingPrice: varchar("sellingPrice").notNull(),
	bodyType: varchar("bodyType").notNull(),
	color: varchar("color").notNull(),
	transmission: varchar("transmission").notNull(),
	condition: varchar("condition").notNull(),
	fuelType: varchar("fuelType").notNull(),
	make: varchar("make").notNull(),
	model: varchar("model").notNull(),
	driveType: varchar("driveType").notNull(),
	engineSize: varchar("engineSize").notNull(),
	auctionDiscription: varchar("auctionDiscription").notNull(),
	features: json("features"),
	createdBy: varchar("createdBy").notNull(),
	postedOn: varchar("postedOn").notNull(),
});

export const CarImages = pgTable("carImages", {
	id: serial("id").primaryKey(),
	imageUrl: varchar("imageUrl").notNull(),
	carListingId: integer("carListingId")
		.notNull()
		.references(() => CarListing.id),
});
