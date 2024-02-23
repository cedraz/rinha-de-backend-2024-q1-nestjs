import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user1 = await prisma.client.create({
        data: {
            id: 1,
            limite: 1000 * 100,
            saldo: 0
        }
    })

    const user2 = await prisma.client.create({
        data: {
            id: 2,
            limite: 800 * 100,
            saldo: 0
        }
    })

    const user3 = await prisma.client.create({
        data: {
            id: 3,
            limite: 10000 * 100,
            saldo: 0
        }
    })

    const user4 = await prisma.client.create({
        data: {
            id: 4,
            limite: 100000 * 100,
            saldo: 0
        }
    })

    const user5 = await prisma.client.create({
        data: {
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