import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

// Controllers
import { TransactionController } from './controllers/transaction.controller'
import { StatementController } from './controllers/statement.controller'

// Services
import { TransactionService } from './services/transaction.service'
import { StatementService } from './services/statement.service'

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [TransactionController, StatementController],
  providers: [TransactionService, StatementService],
})
export class AppModule {}
