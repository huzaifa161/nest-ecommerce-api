import { Module } from "@nestjs/common";
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { MailService } from "./mail.service";

@Module({
  imports: [
    SendGridModule.forRoot({
      apiKey: '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',
    }),
  ],
  providers:[MailService],
  exports:[MailService]
})
export class MailModule{

}