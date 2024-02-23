import { TransactionTypeEnum } from 'src/@types/enum'

class Saldo {
    total: number
    data_extrato: Date
    limite: number
}

class Transaction {
    valor: number
    tipo: TransactionTypeEnum
    descricao: string
    realizada_em: Date
}

export class CreateStatementResponseDto {
    saldo: Saldo
    ultimas_transacoes: Transaction[]
}