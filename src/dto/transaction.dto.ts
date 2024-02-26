export class Transaction {
    id: number
    valor: number
    tipo: string
    descricao: string
    realizada_em: Date
}

export class CreateTransactionRequestDto {
    valor: number
    tipo: string
    descricao: string
}

export class CreateTransactionResponseDto {
    limite: number
    saldo: number
}