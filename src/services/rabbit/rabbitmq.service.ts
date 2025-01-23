// import {
//   Injectable,
//   Inject,
//   Logger,
//   OnModuleInit,
//   OnModuleDestroy,
// } from '@nestjs/common';
// import { ClientProxy } from '@nestjs/microservices';
// import { lastValueFrom } from 'rxjs';

// @Injectable()
// export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
//   private readonly logger = new Logger(RabbitMQService.name);

//   constructor(
//     @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
//   ) {}

//   async onModuleInit() {
//     try {
//       await this.client.connect();
//       this.logger.log('Successfully connected to RabbitMQ');
//     } catch (err) {
//       this.logger.error('Failed to connect to RabbitMQ', err);
//       throw err;
//     }
//   }

//   async onModuleDestroy() {
//     await this.client.close();
//   }

//   async sendMessage(pattern: string, message: any): Promise<any> {
//     try {
//       this.logger.log(
//         `Sending message to ${pattern}: ${JSON.stringify(message)}`,
//       );
//       const response = await lastValueFrom(this.client.send(pattern, message));
//       this.logger.log(`Response received: ${JSON.stringify(response)}`);
//       return response;
//     } catch (err) {
//       this.logger.error(`Failed to send message: ${err.message}`);
//       throw err;
//     }
//   }

//   async emitEvent(pattern: string, message: any): Promise<void> {
//     try {
//       this.logger.log(
//         `Emitting event to ${pattern}: ${JSON.stringify(message)}`,
//       );
//       this.client.emit(pattern, message);
//     } catch (err) {
//       this.logger.error(`Failed to emit event: ${err.message}`);
//       throw err;
//     }
//   }
// }

import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private readonly logger = new Logger(RabbitMQService.name);

  constructor(
    @Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy,
  ) {}

  async sendMessage(queue: string, message: any) {
    try {
      this.logger.log(
        `Sending message to queue ${queue}: ${JSON.stringify(message)}`,
      );
      return await this.client.send(queue, message).toPromise();
    } catch (error) {
      this.logger.error(`Error sending message: ${error.message}`);
      throw error;
    }
  }

  async processMessage(message: any) {
    this.logger.log(`Processing message: ${JSON.stringify(message)}`);
    // Thêm logic xử lý tại đây
    return {
      received: true,
      message,
      timestamp: new Date(),
    };
  }
}
