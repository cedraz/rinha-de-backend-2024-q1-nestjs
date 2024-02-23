import { PrismaClient } from '@prisma/client'
import { CreateTransactionRequestDto } from 'src/dto/transaction.dto'
import { TransactionTypeEnum } from '../@types/enum'

const prisma = new PrismaClient()

export class PrismaRepository {
    async createTransaction({id, data}: {id: number, data: CreateTransactionRequestDto}) {
        if (data.tipo === TransactionTypeEnum.CREDIT) {
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

        if (data.tipo === TransactionTypeEnum.DEBIT) {
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
                    }
                }
            }
        })

        return client
    }
}