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

  // Lắng nghe tin nhắn từ RabbitMQ
  @MessagePattern('default_queue')
  async handleMessage(data: any) {
    return this.rabbitMQService.processMessage(data);
  }

  // // Lắng nghe sự kiện (tuỳ chọn)
  // @EventPattern('default_queue')
  // async handleEvent(data: any) {
  //   this.logger.log(`Received event: ${JSON.stringify(data)}`);
  //   // Gọi service để xử lý event
  //   await this.rabbitMQService.processMessage(data);
  // }
}
