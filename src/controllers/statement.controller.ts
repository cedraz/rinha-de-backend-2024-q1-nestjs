import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { CreateStatementResponseDto } from 'src/dto/statement.dto'
import { StatementService } from 'src/services/statement.service'

@Controller()
export class StatementController {
  constructor(private readonly statementService: StatementService) {}

  @Get('/clientes/:id/extrato')
  createStatement(@Param('id', ParseIntPipe) id: number) : Promise<CreateStatementResponseDto>
  {
    return this.statementService.createStatement(Number(id))
  }
}
