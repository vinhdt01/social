import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';
import { rabbitmqConfig } from '@config/rabbitmq.config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Tạo HTTP application
  const app = await NestFactory.create(AppModule);
  const { host, port, username, password, queue } = rabbitmqConfig;

  const logger = new Logger('Bootstrap');

  // Setup CORS
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use(cookieParser());

  // Connect microservice

  // Start all microservices và HTTP server
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${username}:${password}@${host}:${port}`],
      queue: queue,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  try {
    await app.listen(3000);
    logger.log('HTTP application started on port 3000');
  } catch (error) {
    logger.error('Failed to start application:', error);
  }
}
bootstrap();
