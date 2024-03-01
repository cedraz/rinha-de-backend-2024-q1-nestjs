class Saldo {
    total: number
    data_extrato: string
    limite: number
}

class Transaction {
    valor: number
    tipo: string
    descricao: string
    realizada_em: Date
}

export class CreateStatementResponseDto {
    saldo: Saldo
    ultimas_transacoes: Transaction[]
}