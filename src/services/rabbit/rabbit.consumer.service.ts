import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, MessagePattern } from '@nestjs/microservices';

@Controller()
export class MessageConsumer {
  private readonly logger = new Logger(MessageConsumer.name);

  @MessagePattern('default_queue')
  async handleMessage(@Payload() data: any) {
    this.logger.log(`Consuming message from queue: ${JSON.stringify(data)}`);

    // Custom message processing logic
    try {
      // Example: Processing different message types
      switch (data.type) {
        case 'user_created':
          await this.processUserCreation(data);
          break;
        case 'order_placed':
          await this.processOrder(data);
          break;
        default:
          this.logger.warn(`Unknown message type: ${data.type}`);
      }

      return {
        status: 'processed 1',
        receivedAt: new Date(),
      };
    } catch (error) {
      this.logger.error(`Message processing error: ${error.message}`);
      throw error;
    }
  }

  private async processUserCreation(data: any) {
    // Specific user creation logic
    this.logger.log(`Processing user creation: ${data.userId}`);
  }

  private async processOrder(data: any) {
    // Specific order processing logic
    this.logger.log(`Processing order: ${data.orderId}`);
  }
}
