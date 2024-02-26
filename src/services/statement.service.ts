import { HttpException, Injectable } from '@nestjs/common'
import { CreateStatementResponseDto } from 'src/dto/statement.dto'
import { PrismaRepository } from '../lib/prisma'

@Injectable()
export class StatementService {
  async createStatement(id: number): Promise<CreateStatementResponseDto> {
        if (id < 1 || id > 5) {
            throw new HttpException('Client not found', 404)
        }
    
        const prismaRepository = new PrismaRepository()
        const client = await prismaRepository.createStatement(id)
        
        const extrato: CreateStatementResponseDto = {
          saldo: {
            total: client.saldo,
            data_extrato: new Date(),
            limite: client.limite
          },
          ultimas_transacoes: client.transactions
        }
        
        return extrato
  }
}
