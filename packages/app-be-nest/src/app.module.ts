import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import config from "./config/config";
import configSchema from "./config/config.schema";
import { DatabaseModule } from "./database/database/database.module";
import { PostModule } from "./modules/post/post.module";
import { UserModule } from "./modules/user/user.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ".env",
			isGlobal: true,
			load: [config],
			validationSchema: configSchema,
		}),
		DatabaseModule,
		UserModule,
		PostModule,
	],
})
export class AppModule {}
