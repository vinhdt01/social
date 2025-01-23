import { rabbitmqConfig } from '@config/rabbitmq.config';
import { Module } from '@nestjs/common';
import { RabbitMQService } from '@services/rabbit/rabbitmq.service';
import { MessageConsumer } from '@services/rabbit/rabbit.consumer.service';
import { RabbitMQController } from '@controllers/rabbitmq/rabbitmq.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
@Module({
  providers: [
    RabbitMQService,
    {
      provide: 'RABBITMQ_CLIENT',
      useFactory: () => {
        const { host, port, username, password, queue } = rabbitmqConfig;
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${username}:${password}@${host}:${port}`],
            queue: queue,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
    },
  ],
  controllers: [RabbitMQController, MessageConsumer],
  exports: [RabbitMQService, 'RABBITMQ_CLIENT'],
})
export class RabbitMQModule {}
