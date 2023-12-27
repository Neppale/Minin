import { Controller, Get } from '@nestjs/common';

@Controller('health-check')
export class HealthCheckController {
  @Get('ping')
  healthCheck(): string {
    return 'I am alive!';
  }
}
