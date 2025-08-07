import { Body, Controller, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private usersService: UserService) { }

    @Post('profile')
    createProfile(@Body() data: any, @Req() req) {
        const userId = req.body.userId;
        return this.usersService.createProfile(userId, data);
    }
}
