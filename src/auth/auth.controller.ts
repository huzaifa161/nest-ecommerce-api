import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from './dto';
@Controller('api/auth')
export class AuthController{
 
    @Post('sign-up-user')
    createNewUser(@Body() createUserDto:CreateUserDto){
        return createUserDto;

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