import { Body, Controller, Post, Param, ParseIntPipe, HttpCode } from '@nestjs/common'
import { TransactionService } from '../services/transaction.service'
import { CreateTransactionRequestDto, CreateTransactionResponseDto } from '../dto/transaction.dto'

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/clientes/:id/transacoes')
  @HttpCode(200)
  createTransaction(@Param('id', ParseIntPipe) id: number, @Body() transaction: CreateTransactionRequestDto): Promise<CreateTransactionResponseDto> 
  {
    return this.transactionService.createTransaction(Number(id), transaction)
  }
}
