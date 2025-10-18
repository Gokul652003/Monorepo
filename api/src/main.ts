import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SupabaseAuthGuard } from './platform/gaurd/supabase-auth.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import LokiTransport from 'winston-loki';
import { AllExceptionsFilter } from 'common/http-exception.filter';
import { RolesGuard } from './platform/gaurd/user-role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: 'debug',
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.printf(
              ({ timestamp, level, message, context, ...meta }) => {
                return `${timestamp} [${context || 'Application'}] ${level}: ${message} ${
                  Object.keys(meta).length ? JSON.stringify(meta) : ''
                }`;
              },
            ),
          ),
        }),
        new LokiTransport({
          host: 'http://localhost:3100',
          level: 'debug',
          labels: {
            app: 'nestjs',
            environment: 'development',
            service: 'api',
          },
          json: true,
          format: winston.format.json(),
          replaceTimestamp: true,
          onConnectionError: (err) =>
            console.error('Loki connection error:', err),
        }),
      ],
    }),
  });

  // Add global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

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

  const reflector = app.get(Reflector);

  // --- Global Guard ---
  app.useGlobalGuards(new SupabaseAuthGuard(), new RolesGuard(reflector));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
