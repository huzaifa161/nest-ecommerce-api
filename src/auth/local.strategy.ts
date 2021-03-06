import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField:'email'});
  }

  async validate(username: string, password: string): Promise<any> {
    console.log(username)
    const user = await this.authService.validateCustomer(username, password);
    if (!user) {
      throw new UnauthorizedException('Wrong Credentials or Account not Verified');
    }
    return user;
  }
}