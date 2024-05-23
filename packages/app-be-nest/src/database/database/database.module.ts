import { Global, Module } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "src/config/config";

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [config.KEY],
			useFactory: (configService: ConfigType<typeof config>) => {
				const {
					host,
					password,
					user: username,
					port,
					name: database,
				} = configService.database;

				return {
					type: "postgres",
					host,
					port,
					username,
					password,
					database,
					synchronize: true,
					autoLoadEntities: true,
				};
			},
		}),
	],
	exports: [TypeOrmModule],
})
export class DatabaseModule {}
