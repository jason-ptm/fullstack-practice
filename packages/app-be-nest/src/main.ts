import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector)),
	);

	const config = new DocumentBuilder()
		.setTitle("Social red")
		.setDescription("Social red API")
		.setVersion("1.0")
		.addTag("social red")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api/document", app, document);
	app.setGlobalPrefix("api/v1");
	await app.listen(3000);
}
bootstrap();
