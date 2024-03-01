import { HttpException, Injectable } from '@nestjs/common'
import { CreateTransactionRequestDto, CreateTransactionResponseDto } from '../dto/transaction.dto'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

const bodySchema = z.object({
  valor: z.number().int().positive(),
  tipo: z.enum(['c', 'd']),
  descricao: z.string().min(1).max(10)
})

@Injectable()
export class TransactionService {

  async createTransaction(id: number, transactionRequest: CreateTransactionRequestDto): Promise<CreateTransactionResponseDto> {
    try {
      if (id < 1 || id > 5) {
        throw new HttpException('Client not found', 404)
      }

      const validateBody = bodySchema.safeParse(transactionRequest)

      if (!validateBody.success) {
        throw new HttpException('Invalid data', 422)
      }

      const { data: { valor, descricao, tipo } } = validateBody

      const client = await prisma.client.findUnique({
        where: {
          id
        }
      })

      if (!client) {
        throw new HttpException('Erro ao achar o usuário', 404)
      }

      if (tipo === 'c') {
        const newBalance = client.saldo + valor

        await prisma.client.update({
          where: {
            id
          },
          data: {
            saldo: { increment: valor },
            Transaction: {
              create: {
                descricao,
                tipo,
                valor
              }
            }
          }
        })

        return {
          limite: client.limite,
          saldo: newBalance
        }
      }

      const newBalance = client.saldo - valor

      if (Math.abs(newBalance) > client.limite) {
        throw new HttpException('Limite insuficiente', 422)
      }

      try {
        await prisma.$transaction(async (tx) => {
          const author = await tx.client.update({
            where: {
              id
            },
            data: {
              saldo: { decrement: valor },
              Transaction: {
                create: {
                  descricao,
                  tipo: 'd',
                  valor
                }
              }
            }
          })

          if (Math.abs(author.saldo) > author.limite) {
            throw new HttpException('Limite insuficiente', 422)
          }

          return author
        })
      } catch (error) {
        throw new HttpException('Internal server error', 422)
      }

      return {
        limite: client.limite,
        saldo: newBalance
      }
    } catch (error) {
      console.error(error)

      throw new HttpException('Internal server error', 422)
    }
  }
}
