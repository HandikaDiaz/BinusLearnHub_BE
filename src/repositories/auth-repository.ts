import type { loginDto, registerDto } from "../dto/auth-dto";
import { prisma } from "../libs/primsa";

export async function findUserByEmailOrUsername(UsernameOrEmail: string) {
    return prisma.user.findFirst({
        where: {
            OR: [
                { email: UsernameOrEmail },
                { name: UsernameOrEmail }
            ]
        }
    })
}

export async function createUser(data: registerDto) {
    return prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            password: data.password,
            grade: data.grade,
            school: data.school,
            level: data.level || 1,
            experience: data.experience || 0,
            nextLevelExp: data.nextLevelExp || 100
        }
    })
}

export async function findUser(data: loginDto) {
    return prisma.user.findUnique({
        where: {
            email: data.email,
            password: data.password
        },
        select: {
            id: true,
            email: true,
            name: true,
            school: true,
            grade: true,
            level: true,
            experience: true,
            nextLevelExp: true,
        }
    })
}