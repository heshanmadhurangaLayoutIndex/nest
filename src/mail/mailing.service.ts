/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MailingService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create a transporter object using SMTP
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }



  //sendMail function when employee is created
  async sendMail(to: string, subject: string, body: string): Promise<void> {
    try {
      // Send mail with defined transport object
      await this.transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to,
        subject,
        text: body,
      });
    } catch (error) {
      console.error('Error sending email', error);
    }
  }
}
