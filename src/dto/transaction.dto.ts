import { TransactionTypeEnum } from 'src/@types/enum'

export class Transaction {
    id: number
    valor: number
    tipo: TransactionTypeEnum
    descricao: string
    realizada_em: Date
}

export class CreateTransactionRequestDto {
    valor: number
    tipo: TransactionTypeEnum
    descricao: string
}

export class CreateTransactionResponseDto {
    limite: number
    saldo: number
}