import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { CustomerModule } from "src/customer/customer.module";
import { MailModule } from "src/mail/mail.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { JwtStrategy} from './jwt.strategy';
import { LocalStrategy } from "./local.strategy";


@Module({
    imports:[
        CustomerModule,
        PassportModule,
        JwtModule.register({
            secret:jwtConstants.secret,
            signOptions:{expiresIn:60000}
        }),MailModule
    ],
    controllers:[AuthController],
    providers:[AuthService, LocalStrategy,JwtStrategy],
    exports:[AuthService]
})
export class AuthModule{
    
}