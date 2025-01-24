import { Controller, Post, Body, Logger } from '@nestjs/common';
import { RabbitMQService } from '@services/rabbit/rabbitmq.service';
import { MessagePattern, EventPattern } from '@nestjs/microservices';

@Controller('messages')
export class RabbitMQController {
  private readonly logger = new Logger(RabbitMQController.name);

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  // Endpoint để gửi tin nhắn
  @Post('send')
  async sendMessage(@Body() message: any) {
    try {
      return await this.rabbitMQService.sendMessage('default_queue', message);
    } catch (error) {
      this.logger.error(`Error sending message: ${error.message}`);
      throw error;
    }
  }
  @Post('emit')
  async emitEvent(@Body() payload: { exchange: string; message: any }) {
    const { message } = payload;
    try {
      console.log(payload, 'nè');
      return await this.rabbitMQService.emitEvent('default_queue', message);
    } catch (error) {
      this.logger.error(`Error emitting event: ${error.message}`);
      throw error;
    }
  }
  // Lắng nghe tin nhắn từ RabbitMQ
  @MessagePattern('default_queue')
  async handleMessage(data: any) {
    return this.rabbitMQService.processMessage(data);
  }
}
