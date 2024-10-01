/** @type { import("drizzle-kit").Config } */
export default {
	schema: "./configs/schema.js",
	dialect: "postgresql",
	dbCredentials: {
		url: "postgresql://car_owner:YUEFVGC15xBm@ep-purple-glitter-a2h8vpye.eu-central-1.aws.neon.tech/car?sslmode=require",
	},
};
