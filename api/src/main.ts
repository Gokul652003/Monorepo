import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SupabaseAuthGuard } from './platform/gaurd/supabase-auth.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- Swagger Setup ---
  const config = new DocumentBuilder()
    .setTitle('Page Builder API')
    .setDescription('API documentation for the Page Builder service')
    .setVersion('1.0')
    .addBearerAuth() // optional, if you use JWT or Bearer tokens
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); // docs available at /api

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown properties
      forbidNonWhitelisted: true, // throw error if extra props exist
      transform: true, // auto-transform payloads to DTO classes
    }),
  );

  // --- Global Guard ---
  app.useGlobalGuards(new SupabaseAuthGuard());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
