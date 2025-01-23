import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RabbitMQController {
  private readonly logger = new Logger(RabbitMQController.name);

  @MessagePattern('default_queue') // Consumer lắng nghe queue 'default_queue'
  handleDefaultQueue(message: any): string {
    this.logger.log(`Received message: ${JSON.stringify(message)}`);
    return 'Message processed successfully';
  }
}
