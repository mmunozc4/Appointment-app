import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './create-appointment.dto';
import { UpdateAppointmentDto } from './update-appointment.dto';

@Injectable()
export class AppointmentService {
    constructor(private prisma: PrismaService) { }

    getAppointmentsByUser(userId: string) {
        return this.prisma.appointment.findMany({
            where: {
                OR: [
                    { clientId: userId },
                    { professionalId: userId },
                ]
            },
            include: {
                client: true,
                professional: true,
            },
        });
    }

    async create(data: CreateAppointmentDto) {
        return this.prisma.appointment.create({ data });
    }

    async findAll() {
        return this.prisma.appointment.findMany({
            include: {
                client: true,
                professional: true,
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.appointment.findUnique({
            where: { id },
            include: {
                client: true,
                professional: true,
            },
        });
    }

    async update(id: string, data: UpdateAppointmentDto) {
        return this.prisma.appointment.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.appointment.delete({
            where: { id },
        });
    }
}
