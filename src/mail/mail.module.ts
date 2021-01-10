import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { MailService } from "./mail.service";

@Module({
  imports: [
    SendGridModule.forRoot({
      apiKey: process.env.SENDGRID_API_KEY,
    }),
  ],
  providers:[MailService],
  exports:[MailService]
})
export class MailModule{

}