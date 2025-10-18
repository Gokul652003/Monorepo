import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- Add this import
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

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
      migrationsRun: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
