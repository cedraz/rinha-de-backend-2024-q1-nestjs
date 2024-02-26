class Saldo {
    total: number
    data_extrato: Date
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