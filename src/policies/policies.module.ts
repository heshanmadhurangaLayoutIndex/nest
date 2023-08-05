import { Module } from '@nestjs/common';
import { CaslModule } from 'src/casl/casl.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    CaslModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class PoliciesModule { }