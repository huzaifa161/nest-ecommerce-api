import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { AdminService } from './admin.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private adminService:AdminService,private authService:AuthService){

  }

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
  
    if(!authHeader) throw new UnauthorizedException();

    const token = authHeader.split(' ')[1];
    const verifiedToken = this.authService.verifyJwt(token);
    
    if(!verifiedToken) throw new UnauthorizedException();
    req.user = verifiedToken;
    next();
  }
}
