export class Transaction {
    id: number
    valor: number
    tipo: string
    descricao: string
    realizada_em: Date
}

export type CreateTransactionRequestDto = {
    valor: number
    tipo: 'd' | 'c'
    descricao: string
}

export class CreateTransactionResponseDto {
    limite: number
    saldo: number
}