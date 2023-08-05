import { Controller, Post, Body } from '@nestjs/common';
import { MailingService } from './mailing.service';

@Controller('mailing')
export class MailingController {
  constructor(private readonly mailerService: MailingService) {}

  //send Email once employee create (email&pwd)
  @Post('email')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('body') body: string,
  ): Promise<void> {
    await this.mailerService.sendMail(to, subject, body);
  }
}
