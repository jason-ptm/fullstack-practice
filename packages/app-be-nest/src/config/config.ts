import { registerAs } from "@nestjs/config";

export default registerAs("config", () => ({
	port: parseInt(process.env.PORT, 10) || 3000,
	database: {
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT, 10),
		name: process.env.DB_NAME,
		password: process.env.DB_PASSWORD,
		user: process.env.DB_USER,
	},
}));
