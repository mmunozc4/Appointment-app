import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    createProfile(userId: string, data: any) {
        return this.prisma.profile.create({
            data: {
                ...data,
                user: { connect: { id: userId } }
            }
        });
    }
}
