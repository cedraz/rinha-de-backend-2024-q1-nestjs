import { HttpException, Inject, Injectable } from '@nestjs/common'
import { CreateStatementResponseDto } from 'src/dto/statement.dto'
import { prisma } from '../lib/prisma'

@Injectable()
export class StatementService {
  async createStatement(id: number): Promise<CreateStatementResponseDto> {
    try {
      if (id < 1 || id > 5) {
        throw new HttpException('Client not found', 404)
      }

      const client = await prisma.client.findUnique({
        where: {
          id
        },
        include: {
          Transaction: {
            take: 10,
            orderBy: {
              realizada_em: 'desc'
            }
          }
        }
      })

      if (!client) {
        throw new HttpException('Client not found', 404)
      }

      const lastTransactions = client.Transaction.map((transaction) => ({
        valor: transaction.valor,
        tipo: transaction.tipo,
        descricao: transaction.descricao,
        realizada_em: transaction.realizada_em
      }))

      return {
        saldo: {
          total: client.saldo,
          data_extrato: new Date().toISOString(),
          limite: client.limite
        },
        ultimas_transacoes: lastTransactions
      }

    } catch (error) {
      console.error(error)

      throw new HttpException('Internal server error', 422)
    }
  }
}
