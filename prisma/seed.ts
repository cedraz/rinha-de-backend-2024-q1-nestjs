import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user1 = await prisma.client.upsert({
        where: { id: 1 },
        update: {
            id: 1,
            limite: 1000 * 100,
            saldo: 0
        },
        create: {
            id: 1,
            limite: 1000 * 100,
            saldo: 0
        }
    })

    const user2 = await prisma.client.upsert({
        where: { id: 2 },
        update: {
            id: 2,
            limite: 800 * 100,
            saldo: 0
        },
        create: {
            id: 2,
            limite: 800 * 100,
            saldo: 0
        }
    })

    const user3 = await prisma.client.upsert({
        where: { id: 3 },
        update: {
            id: 3,
            limite: 10000 * 100,
            saldo: 0
        },
        create: {
            id: 3,
            limite: 10000 * 100,
            saldo: 0
        }
    })

    const user4 = await prisma.client.upsert({
        where: { id: 4 },
        update: {
            id: 4,
            limite: 100000 * 100,
            saldo: 0
        },
        create: {
            id: 4,
            limite: 100000 * 100,
            saldo: 0
        }
    })

    const user5 = await prisma.client.upsert({
        where: { id: 5 },
        update: {
            id: 5,
            limite: 5000 * 100,
            saldo: 0
        },
        create: {
            id: 5,
            limite: 5000 * 100,
            saldo: 0
        }
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })