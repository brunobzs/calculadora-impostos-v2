const formulario = document.querySelector('#formulario')
const faturamentoAnual = document.querySelector('input[name="faturamento"]')
const resultado = document.querySelector('#resultado')

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

    resultado.innerHTML = ""

    const tipoPessoa = document.querySelector('input[name="tipoPessoa"]:checked')
    let faturamento = parseFloat(faturamentoAnual.value.replace(',', '.'))

    if (isNaN(faturamento)) {
        resultado.innerHTML = '<p><b>Por favor, insira um valor válido no campo Faturamento Anual.</b></p>'
    } else {
        let tipo = tipoPessoa.value
        let media = 0
        let aliquota = 0
        let regime = ''

        if (tipo === 'fisica') {
            // lógica para pessoa física
            if (faturamento <= 22847.76) {
                aliquota = 0
                media = 0
            } else if (faturamento <= 33919.80) {
                aliquota = 7.5
                media = (faturamento * aliquota) / 100
            } else if (faturamento <= 45012.60) {
                aliquota = 15
                media = (faturamento * aliquota) / 100 - 1347.00
            } else if (faturamento <= 55976.16) {
                aliquota = 22.5
                media = (faturamento * aliquota) / 100 - 2966.45
            } else {
                aliquota = 27.5
                media = (faturamento * aliquota) / 100 - 4704.08
            }

            if (aliquota === 0) {
                resultado.innerHTML = `<p><b>Você é isento de Imposto de Renda.</b></p>`
            } else {
                resultado.innerHTML = `<p><b>A sua alíquota de imposto de renda é de ${aliquota}% e o valor médio de imposto de renda é de R$${media.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.</b></p>`
            }

        } else if (tipo === 'juridica') {
            // lógica para pessoa jurídica
            const atividade = document.querySelector('select[name="tipoAtividade"]').value
            let aliquota = 0
            let aliquotaEfetiva = 0
            let pd = 0
            let simplesNacional = 0
            let lucroPresumido = 0
            let lucroReal = 0
            let guardaValor = []

            function calculaSimplesNacional (receitaBruta, tipoAtividade) {
                if (tipoAtividade === 'comercio') {
                    if (receitaBruta <= 180000) {
                        aliquota = 4
                        pd = 0
                    } else if (receitaBruta <= 360000) {
                        aliquota = 7.3
                        pd = 5940.00
                    } else if (receitaBruta <= 720000) {
                        aliquota = 9.5
                        pd = 13860.00
                    } else if (receitaBruta <= 1800000) {
                        aliquota = 10.7
                        pd = 22500.00
                    } else if (receitaBruta <= 3600000) {
                        aliquota = 14.3
                        pd = 87300.00
                    } else {
                        aliquota = 19
                        pd = 378000.00
                    }
                } else if (tipoAtividade === 'industria') {
                    if (receitaBruta <= 180000) {
                        aliquota = 4.5
                        pd = 0
                    } else if (receitaBruta <= 360000) {
                        aliquota = 7.8
                        pd = 5940.00
                    } else if (receitaBruta <= 720000) {
                        aliquota = 10
                        pd = 13860.00
                    } else if (receitaBruta <= 1800000) {
                        aliquota = 11.2
                        pd = 22500.00
                    } else if (receitaBruta <= 3600000) {
                        aliquota = 14.7
                        pd = 85500.00
                    } else {
                        aliquota = 30
                        pd = 720000.00
                    }
                } else if (tipoAtividade === 'servicos') {
                    if (receitaBruta <= 180000) {
                        aliquota = 6
                        pd = 0
                    } else if (receitaBruta <= 360000) {
                        aliquota = 11.2
                        pd = 9360.00
                    } else if (receitaBruta <= 720000) {
                        aliquota = 13.5
                        pd = 17640.00
                    } else if (receitaBruta <= 1800000) {
                        aliquota = 16
                        pd = 35640.00
                    } else if (receitaBruta <= 3600000) {
                        aliquota = 21
                        pd = 125640.00
                    } else {
                        aliquota = 33
                        pd = 648000.00
                    }
                }

                aliquotaEfetiva = (((receitaBruta * aliquota) - pd) / receitaBruta)
                regime = 'Simples Nacional'
                simplesNacional = receitaBruta * aliquotaEfetiva/100
                guardaValor.push({
                    regime: regime,
                    aliquota: aliquotaEfetiva,
                    imposto: simplesNacional
                })
            }

            // O calculo não retorna ainda o valor correto do imposto, precisa corrigir o cálculo e a aplicação dos impostos. Necessário rever a lógica.
            function calculaLucroPresumido (receitaBruta, tipoAtividade) {
                let ir = 4.8
                let adicionalIR = 10
                let csll = 9
                let pis = 0.65
                let cofins = 3
                let iss = 5

                aliquotaEfetiva = ir + adicionalIR + csll + pis + cofins + iss
                regime = 'Lucro Presumido'
                lucroPresumido = (receitaBruta * ir/100) + (receitaBruta * adicionalIR/100) + (receitaBruta * csll/100) + (receitaBruta * pis/100) + (receitaBruta * cofins/100) + (receitaBruta * iss/100)
                guardaValor.push({
                    regime: regime,
                    aliquota: aliquota,
                    imposto: lucroPresumido
                })
            }

            function calculaLucroReal (receitaBruta) {
                const aliquota = 15
                const aliquotaAdicional = 10
                const csll = 9
                const receitaMensal = receitaBruta / 12

                if (receitaMensal <= 20000) {
                    lucroReal = (receitaMensal * aliquota/100) + (receitaMensal * csll/100)
                } else {
                    lucroReal = (receitaMensal * (aliquota + aliquotaAdicional)/100) + (receitaMensal * csll/100)
                }

                regime = 'Lucro Real'
                guardaValor.push({
                    regime: regime,
                    aliquota: aliquota,
                    imposto: lucroReal
                })
            }

            function retornarMelhorOpcao(opcao) {
                calculaSimplesNacional(faturamento, atividade)
                calculaLucroPresumido(faturamento, atividade)
                calculaLucroReal(faturamento)

                let menorImposto = opcao.reduce((anterior, atual) => {
                    return (anterior.imposto < atual.imposto) ? anterior : atual
                })

                let melhorOpcao = []
                opcao.forEach(item => {
                    if (item.imposto === menorImposto.imposto) {
                        melhorOpcao.push(item)
                    }
                })

                return melhorOpcao
            }

            const resposta = retornarMelhorOpcao(guardaValor)

            if (aliquota === 0) {
                resultado.innerHTML = `<p><b>Você é isento de Imposto de Renda.</b></p>`
            } else {
                resposta.map(item => {
                    resultado.innerHTML += `<p><b>O melhor regime tributário para você é o ${item.regime}, com uma alíquota de ${item.aliquota.toFixed(2)}% e uma média ${item.regime === 'Lucro Presumido' ? 'trimestral' : 'mensal'} de imposto de R$${item.imposto.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2})}.</b></p>`
                })
            }
        }
    }
})