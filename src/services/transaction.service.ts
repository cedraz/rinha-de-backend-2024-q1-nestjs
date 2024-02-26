import { HttpException, Injectable } from '@nestjs/common'
import { CreateTransactionRequestDto, CreateTransactionResponseDto } from '../dto/transaction.dto'
import { PrismaRepository } from '../lib/prisma'

type transactionType = CreateTransactionResponseDto | false;

@Injectable()
export class TransactionService {
  async createTransaction(id: number, transactionRequest: CreateTransactionRequestDto): Promise<CreateTransactionResponseDto> {

    if (id < 1 || id > 5) {
      throw new HttpException('Client not found', 404)
    }

    if (!(Number.isInteger(transactionRequest.valor) && transactionRequest.valor > 0)) {
      throw new HttpException('Valor inválido', 422)
    }

    if (!(transactionRequest.tipo === 'c' || transactionRequest.tipo === 'd')) {
      throw new HttpException('Tipo inválido', 422)
    }

    if (transactionRequest.descricao) {
      if (transactionRequest.descricao.length < 1 || transactionRequest.descricao.length > 10) {
        throw new HttpException('Descrição inválida', 422)
      }
    } else {
      throw new HttpException('Descrição inválida', 422)
    }

    const prismaRepository = new PrismaRepository()
    const transaction: transactionType = await prismaRepository.createTransaction({id, data: transactionRequest})

    if (transaction === false) {
      throw new HttpException('Saldo insuficiente', 422)
    }

    return {
      limite: transaction.limite,
      saldo: transaction.saldo
    }
  }
}
