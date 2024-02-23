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
