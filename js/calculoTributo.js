const formulario = document.querySelector('#formulario')
const faturamentoAnual = document.querySelector('input[name="faturamento"]')
const resultado = document.querySelector('#resultado')
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
    simplesNacional = (receitaBruta * (aliquotaEfetiva/100))/12
    guardaValor.push({
        regime: regime,
        aliquota: aliquotaEfetiva,
        imposto: simplesNacional
    })
}

/**
 * Calcula o imposto de renda de pessoa jurídica no regime tributário do Lucro Presumido.
 *
 * @param { int } receitaBruta - Recebe o valor da receita bruta anual.
 */
function calculaLucroPresumido (receitaBruta) {
    const ir = 4.8
    const adicionalIR = 10
    const csll = 9
    const pis = 0.65
    const cofins = 3
    const iss = 5

    aliquotaEfetiva = ir + adicionalIR + csll + pis + cofins + iss
    regime = 'Lucro Presumido'
    // O calculo não retorna ainda o valor correto do imposto, precisa corrigir o cálculo e a aplicação dos impostos. Necessário rever a lógica.
    lucroPresumido = ((receitaBruta * (ir/100)) + (receitaBruta * (adicionalIR/100)) + (receitaBruta * (csll/100)) + (receitaBruta * (pis/100)) + (receitaBruta * (cofins/100)) + (receitaBruta * (iss/100)))/4
    guardaValor.push({
        regime: regime,
        aliquota: aliquotaEfetiva,
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
    aliquota = 15
    const aliquotaAdicional = 10
    const csll = 9
    const receitaMensal = receitaBruta / 12

    if (receitaMensal > 200000) {
        return aliquota = aliquota + aliquotaAdicional
    }

    lucroReal = (receitaMensal * (aliquota/100)) + (receitaMensal * (csll/100))
    regime = 'Lucro Real'
    guardaValor.push({
        regime: regime,
        aliquota: aliquota,
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
                        Média ${item.regime === 'Lucro Presumido' ? 'trimestral' : 'mensal'} de imposto: <b>R$${item.imposto.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2})}.</b></p>`
    })

    melhorOpcao.map(item => {
        resultado.innerHTML += `<p><b>O melhor regime tributário para você é o ${item.regime},
                         com uma alíquota de ${item.aliquota.toFixed(2)}% 
                         e uma média ${item.regime === 'Lucro Presumido' ? 'trimestral' : 'mensal'} de imposto de R$${item.imposto.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2})}.</b></p>`
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
        calculaLucroPresumido(faturamento)
        calculaLucroReal(faturamento)

        return retornarMelhorOpcao(guardaValor)
    }
})