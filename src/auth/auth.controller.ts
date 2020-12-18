import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from './dto';

import { AuthService } from './auth.service';
@Controller('api/auth')
export class AuthController{
 

    constructor(private authService:AuthService){

    }
    @Post('sign-up-user')
    createNewUser(@Body() createUserDto:CreateUserDto){
        return this.authService.signUpUser(createUserDto.name, createUserDto.email, createUserDto.password)

    }

    @Post('sign-in')
    signInUser(@Body() email:string, @Body() password:string){
        return null;
    }

    @Post('send-password-reset-link')
    sendPasswordResetLink(@Body() email:string){
        return null;
    }

    @Get('password-reset/:token')
    checkPasswordResetToken(@Param('token') token){
        return null
    }

    @Post('password-reset/reset')
    resetPassword(@Body() email, @Body() password, @Body() confirmPassword){
        return null
    }
}