import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { UserModule } from './user/user.module';
import { AuthorizationRequiredGuard } from './utils/guards/authorization-required.guard';

@Module({
  imports: [UrlModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthorizationRequiredGuard,
    },
  ],
})
export class AppModule {}
