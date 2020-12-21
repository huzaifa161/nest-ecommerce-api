import { Body, Controller, Get, Param, Post, UseGuards, Request, Req } from "@nestjs/common";
import { CreateUserDto } from './dto';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from "./local-auth.guard";
@Controller('api/auth')
export class AuthController{
 

    constructor(private authService:AuthService){

    }

    @Post('forget-password')
    async forgetPassword(@Body() body,@Request() req){
        return await this.authService.createForgetPasswordToken(body.email, req.headers.host);
    }
    @Get('reset/:token')
    async verifyResetToken(@Param() param){
        return this.authService.verifyResetToken(param.token);
    }

    @Post('/reset/:token')
    async resetPassword(@Body() body,@Param() param){
        return this.authService.resetPassword(param.token,body.password,body.confirmPassword);
    }

    @Get('confirm-email/:token')
    confirmEmail(@Param() param){
        return this.authService.confirmEmail(param.token)
    }
    
    @Post('sign-up-user')
    createNewUser(@Body() createUserDto:CreateUserDto, @Request() req){
        return this.authService.signUpUser(createUserDto.name, createUserDto.email, createUserDto.password,req.headers.host)

    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
       return this.authService.login(req.user);
    }

    @Post('send-password-reset-link')
    sendPasswordResetLink(@Body() email:string){
        return null;
    }

    @Get('password-reset/:token')
    checkPasswordResetToken(@Param('token') token){
        return null
    }


}