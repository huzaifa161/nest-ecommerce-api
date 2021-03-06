import { Injectable } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';

@Injectable()
export class MailService {
  public constructor(@InjectSendGrid() private readonly client: SendGridService) {}

  async sendMail(to:string, html:string){
    try{
        await this.client.send({
            from:process.env.EMAIL,
            to,
            subject:'NoReply',
            html 
          })
    }catch(e){
        console.log('error',e);
    }

  }
}