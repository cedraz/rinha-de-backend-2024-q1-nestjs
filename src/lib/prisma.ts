import { PrismaClient } from '@prisma/client'
import { CreateTransactionRequestDto } from 'src/dto/transaction.dto'

const prisma = new PrismaClient()

export class PrismaRepository {
    async createTransaction({id, data}: {id: number, data: CreateTransactionRequestDto}) {
        if (data.tipo === 'c') {
            await prisma.transaction.create({
                data: {
                    valor: data.valor,
                    tipo: data.tipo,
                    descricao: data.descricao,
                    realizada_em: new Date(),
                    client: {
                        connect: {
                            id
                        }
                    }
                }
            })

            const client = await prisma.client.update({
                where: {
                    id
                },
                data: {
                    saldo: {
                        increment: data.valor
                    }
                }
            })

            return client
        }

        if (data.tipo === 'd') {
            const clientFound = await prisma.client.findUnique({
                where: {
                    id
                }
            })

            if ((clientFound.saldo - data.valor) < (-1 * clientFound.limite)) {
                return false
            }

            await prisma.transaction.create({
                data: {
                    valor: data.valor,
                    tipo: data.tipo,
                    descricao: data.descricao,
                    realizada_em: new Date(),
                    client: {
                        connect: {
                            id
                        }
                    }
                }
            })

            const client = await prisma.client.update({
                where: {
                    id
                },
                data: {
                    saldo: {
                        decrement: data.valor
                    }
                }
            })

            return client
        }
    }

    async createStatement(id: number) {
        const client = prisma.client.findFirst({
            where: {
                id
            },
            include: {
                transactions: {
                    take: 10,
                    orderBy: {
                        realizada_em: 'desc'
                    },
                    select: {
                        id: false,
                        client: false,
                        valor: true,
                        tipo: true,
                        descricao: true,
                        realizada_em: true,
                    }
                }
            }
        })

        return client
    }
}