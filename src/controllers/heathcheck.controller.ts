import { Controller, Get, Body } from '@nestjs/common';
 
import { FirebaseAdminService } from '@services/firebase-admin.service';

@Controller('healthcheck')
export class AuthController {
  constructor() {}

  @Get('/')
  async HealthCheck(@Body('idToken') idToken: string) {
    
    return 'Ok!';
  }
}