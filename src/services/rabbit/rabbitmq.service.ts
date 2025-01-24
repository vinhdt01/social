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
  async emitEvent(pattern: string, message: any): Promise<void> {
    try {
      this.logger.log(
        `Emitting event to ${pattern}: ${JSON.stringify(message)}`,
      );
      this.client.emit(pattern, message);
    } catch (err) {
      this.logger.error(`Failed to emit event: ${err.message}`);
      throw err;
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
