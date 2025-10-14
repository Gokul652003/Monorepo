import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- Add this import
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Profile } from './auth/core/entities/user-role.entity'; // <-- Import your entity

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or your DB type
      host: 'localhost',
      port: 54322,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // 🔥 turn off auto-sync
      migrations: [__dirname + '/migrations/*{.ts,.js}'], // migration files
      migrationsRun: true
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
