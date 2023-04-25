const formulario = document.querySelector('#formulario')
const faturamentoAnual = document.querySelector('input[name="faturamento"]')
const resultado = document.querySelector('#resultado')

// Variáveis globais
let aliquota = 0
let aliquotaEfetiva = 0
let pd = 0
let simplesNacional = 0
let lucroPresumido = 0
let lucroReal = 0
let regime = ''
let guardaValor = []


/**
 * Calcula o imposto de renda de pessoa jurídica no regime tributário do Simples Nacional.
 *
 * @param { int } receitaBruta - Recebe o valor da receita bruta anual.
 * @param { string } tipoAtividade - Recebe o tipo de atividade da empresa.
 */
function calculaSimplesNacional (receitaBruta, tipoAtividade) {
    if (tipoAtividade === 'comercio') {
        if (receitaBruta <= 180000) {
            aliquota = 0.04
            pd = 0
        } else if (receitaBruta <= 360000) {
            aliquota = 0.073
            pd = 5940.00
        } else if (receitaBruta <= 720000) {
            aliquota = 0.095
            pd = 13860.00
        } else if (receitaBruta <= 1800000) {
            aliquota = 0.107
            pd = 22500.00
        } else if (receitaBruta <= 3600000) {
            aliquota = 0.143
            pd = 87300.00
        } else {
            aliquota = 0.19
            pd = 378000.00
        }
    } else if (tipoAtividade === 'industria') {
        if (receitaBruta <= 180000) {
            aliquota = 0.045
            pd = 0
        } else if (receitaBruta <= 360000) {
            aliquota = 0.078
            pd = 5940.00
        } else if (receitaBruta <= 720000) {
            aliquota = 0.1
            pd = 13860.00
        } else if (receitaBruta <= 1800000) {
            aliquota = 0.112
            pd = 22500.00
        } else if (receitaBruta <= 3600000) {
            aliquota = 0.147
            pd = 85500.00
        } else {
            aliquota = 0.3
            pd = 720000.00
        }
    } else if (tipoAtividade === 'servicos') {
        if (receitaBruta <= 180000) {
            aliquota = 0.06
            pd = 0
        } else if (receitaBruta <= 360000) {
            aliquota = 0.112
            pd = 9360.00
        } else if (receitaBruta <= 720000) {
            aliquota = 0.135
            pd = 17640.00
        } else if (receitaBruta <= 1800000) {
            aliquota = 0.16
            pd = 35640.00
        } else if (receitaBruta <= 3600000) {
            aliquota = 0.21
            pd = 125640.00
        } else {
            aliquota = 0.33
            pd = 648000.00
        }
    }

    aliquotaEfetiva = (((receitaBruta * aliquota) - pd) / receitaBruta)
    regime = 'Simples Nacional'
    simplesNacional = (receitaBruta * (aliquotaEfetiva))/12
    guardaValor.push({
        regime: regime,
        aliquota: aliquotaEfetiva * 100,
        imposto: simplesNacional
    })
}

/**
 * Calcula o imposto de renda de pessoa jurídica no regime tributário do Lucro Presumido.
 *
 * @param { object } param
 * @param { int } param.receitaBruta - Recebe o valor da receita bruta anual.
 * @param { boolean } param.naoCumulativo - Recebe o valor true ou false para saber se a empresa é do regime não cumulativo.
 */
function calculaLucroPresumido ({ receitaBruta, naoCumulativo = false }) {
    const ir = 0.048
    const adicionalIR = 0.1
    const csll = 0.09
    const iss = 0.05
    const irpj = 0.08
    let pis = 0.0065
    let cofins = 0.03

    aliquotaEfetiva = ir + adicionalIR + csll + pis + cofins + iss
    regime = 'Lucro Presumido'

    if (naoCumulativo) {
        pis = 0.0165
        cofins = 0.076
            regime = 'Lucro Presumido - Não Cumulativo'
    }

    // O calculo não retorna ainda o valor correto do imposto, precisa corrigir o cálculo e a aplicação dos impostos. Necessário rever a lógica.
    lucroPresumido = ((receitaBruta * ir) + (receitaBruta * adicionalIR) + (receitaBruta * csll) + (receitaBruta * pis)
        + (receitaBruta * cofins) + (receitaBruta * iss) + (receitaBruta * irpj))/4
    guardaValor.push({
        regime: regime,
        aliquota: aliquotaEfetiva * 100,
        imposto: lucroPresumido
    })
}

/**
 * Calcula o imposto de renda de pessoa jurídica no regime tributário do Lucro Real.
 *
 * @param { int } receitaBruta - Recebe o valor da receita bruta anual.
 * @returns {number} - Retorna o valor do imposto de renda de pessoa jurídica no regime tributário do Lucro Real.
 */
function calculaLucroReal (receitaBruta) {
    aliquota = 0.15
    const aliquotaAdicional = 0.10
    const csll = 0.9
    const receitaMensal = receitaBruta / 12

    if (receitaMensal > 200000) {
        return aliquota = aliquota + aliquotaAdicional
    }

    lucroReal = (receitaMensal * aliquota) + (receitaMensal * csll)
    regime = 'Lucro Real'
    guardaValor.push({
        regime: regime,
        aliquota: aliquota * 100,
        imposto: lucroReal
    })
}

/**
 * Seleciona a opção com o menor valor de imposto para pessoa jurídica.
 *
 * @param { array } opcao - Recebe um array com as opções de imposto.
 */
function retornarMelhorOpcao(opcao) {
    let menorImposto = opcao.reduce((anterior, atual) => {
        return (anterior.imposto < atual.imposto) ? anterior : atual
    })

    let melhorOpcao = []
    opcao.forEach(item => {
        if (item.imposto === menorImposto.imposto) {
            melhorOpcao.push(item)
        }
    })

    guardaValor.forEach(item => {
        resultado.innerHTML += `<p><b>${item.regime}</b><br>
                        Alíquota: <b>${item.aliquota.toFixed(2)}%</b></br>
                        Média ${item.regime === 'Lucro Presumido' || 'Lucro Presumido - Não Cumulativo' ? 'trimestral' : 'mensal'} de imposto: <b>R$${item.imposto.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2})}.</b></p>`
    })

    melhorOpcao.map(item => {
        resultado.innerHTML += `<p><b>O melhor regime tributário para você é o ${item.regime},
                         com uma alíquota de ${item.aliquota.toFixed(2)}% 
                         e uma média ${item.regime === 'Lucro Presumido' || 'Lucro Presumido - Não Cumulativo' ? 'trimestral' : 'mensal'} de imposto de R$${item.imposto.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2})}.</b></p>`
    })
}


formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const tipoPessoa = document.querySelector('input[name="tipoPessoa"]:checked')
    let faturamento = parseFloat(faturamentoAnual.value.replace(',', '.'))

    guardaValor = []
    resultado.innerHTML = ""

    if (isNaN(faturamento)) {
        resultado.innerHTML = '<p><b>Por favor, insira um valor válido no campo Faturamento Anual.</b></p>'
    } else {
        const atividade = document.querySelector('select[name="tipoAtividade"]').value

        calculaSimplesNacional(faturamento, atividade)
        calculaLucroPresumido({receitaBruta: faturamento})
        calculaLucroPresumido({
            receitaBruta: faturamento,
            naoCumulativo: true
        })
        calculaLucroReal(faturamento)

        return retornarMelhorOpcao(guardaValor)
    }
})