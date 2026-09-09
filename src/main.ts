import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.use(cookieParser('Rahasia'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
