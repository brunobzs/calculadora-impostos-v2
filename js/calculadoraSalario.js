const formulario = document.querySelector('#formulario')
const salarioBruto = document.querySelector('#salario-bruto')
const resultado = document.querySelector('#resultado')


// Variáveis globais para o cálculo de CLT.
let salario
let inss = 0
let ir = 0
let salarioLiquido = 0
let descontoINSS = 0
let descontoIR = 0
let umTercoFerias = 0
let descontoIRFerias = 0
let descontoINSSFerias = 0

// Variáveis globais para o cálculo de PJ.
let receitaBruta = 0
let iss = 0
let aliquota = 0
let pd = 0
let aliquotaEfetiva = 0
let descontoPJ = 0
let ganhosLiquidos = 0


/**
 * Calcula o salário líquido no formato CLT.
 *
 * @param { int } salarioBruto - Salário bruto mensal ou anual.
 * @param { string } tipo - Tipo de salário (por-mes ou por-ano).
 * @returns {string} - Retorna o resultado do cálculo.
 */
function calculaSalarioCLT(salarioBruto, tipo) {
    salario = salarioBruto

    if (tipo === 'por-ano') {
        salario = salario / 12
    }

    // Retorna a aliquota e INSS.
    if (salario <= 1302.00) {
        inss = 0.075
    } else if (salario <= 2571.29) {
        inss = 0.09
    } else if (salario <= 3856.94) {
        inss = 0.12
    } else {
        inss = 0.14
    }

    //Retorna a aliquota do IR.
    if (salario <= 1903.98) {
        ir = 0
    } else if (salario <= 2826.65) {
        ir = 0.075
    } else if (salario <= 3751.05) {
        ir = 0.15
    } else if (salario <= 4664.68) {
        ir = 0.225
    } else {
        ir = 0.275
    }

    descontoINSS = salario * inss
    descontoIR = salario * ir
    salarioLiquido = salario - descontoINSS - descontoIR
    umTercoFerias = salario / 3
    descontoIRFerias = umTercoFerias * ir
    descontoINSSFerias = umTercoFerias * inss
    umTercoFeriasLiquido = umTercoFerias - descontoIRFerias - descontoINSSFerias
    totalBeneficios = umTercoFeriasLiquido + salarioLiquido

    return resultado.innerHTML += '<p><h3>Contrato - CLT</h3></p>' +
        '<p>Salário Bruto Mensal: R$ ' + salario.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        `<br>(-) INSS (${(inss * 100).toFixed(2)}%): R$ ` + descontoINSS.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        `<br>(-) IR (${(ir * 100).toFixed(2)}%): R$ ` + descontoIR.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        '<br> -----------------------------------------' +
        '<br>(=) Salário Líquido: R$ ' + salarioLiquido.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '</p>' +
        '<p>(+) 1/3 de Férias: R$ ' + umTercoFerias.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        `<br>(-) IR sobre Férias (${(ir * 100).toFixed(2)}%): R$ ` + descontoIRFerias.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        `<br>(-) INSS sobre Férias (${(inss * 100).toFixed(2)}%): R$ ` + descontoINSSFerias.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        '<br>(+) 13º com descontos: R$ ' + salarioLiquido.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        '<br> -----------------------------------------' +
        '<br>(=) Resultado: ' +
        'R$ ' + salarioLiquido.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/mês' +
        ' + R$ ' + totalBeneficios.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' de férias e 13º' +
        ', um total de R$ ' + ((salarioLiquido * 12) + totalBeneficios).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/ano. </p>' +
        '<center><hr size="50"></center>'
}

/**
 * Calcula o salário no regime de pessoa jurídica.
 *
 * @param { int } faturamento - Receita bruta anual.
 * @param { string } tipo - Tipo de faturamento (por-mes ou por-ano).
 * @returns {string} - Retorna o resultado do cálculo.
 */
function calculaSalarioPJ(faturamento, tipo) {
    receitaBruta = faturamento

    if (tipo === 'por-mes') {
        receitaBruta = receitaBruta * 12
    }

    if (receitaBruta <= 81000) {
        // No caso de comparação com CLT, vamos considerar o regime tributário do MEI como serviço, pois é o mais comum.
        let receitaBrutaMensal = receitaBruta / 12
        inss = 66
        iss = 5
        ganhosLiquidos = (receitaBrutaMensal - (inss + iss))

        return resultado.innerHTML += '<p><h3>PJ - MEI (Serviço)</h3></p>' +
            '<p>Salário Bruto Mensal: R$ ' + (receitaBrutaMensal).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
            `<br>(-) Contribuição MEI (${inss.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} de INSS + ${iss.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} de ISS): R$ ` + (inss + iss).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/mês' +
            '<br> -----------------------------------------' +
            '<br>(=) Resultado: R$ ' + (ganhosLiquidos).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/mês' +
            ' ou R$ ' + (ganhosLiquidos * 12).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/ano </p>'

    } else {
        // No caso de comparação com CLT, vamos considerar o regime tributário do Simples Nacional - Anexo V, pois é o mais comum.
        if (receitaBruta <= 180000) {
            aliquota = 0.155
            pd = 0
        } else if (receitaBruta <= 360000) {
            aliquota = 0.18
            pd = 4500.00
        } else if (receitaBruta <= 720000) {
            aliquota = 0.195
            pd = 9900.00
        } else if (receitaBruta <= 1800000) {
            aliquota = 0.205
            pd = 17100.00
        } else if (receitaBruta <= 3600000) {
            aliquota = 0.23
            pd = 62100.00
        } else {
            aliquota = 0.305
            pd = 540000.00
        }

        aliquotaEfetiva = ((receitaBruta * aliquota) - pd) / receitaBruta
        descontoPJ = receitaBruta * aliquotaEfetiva
        ganhosLiquidos = receitaBruta - descontoPJ

        return resultado.innerHTML += '<p><h3>PJ - Simples Nacional (Serviço)</h3></p>' +
            '<p>Salário Bruto Mensal: R$ ' + (receitaBruta / 12).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
            `<br>(-) Simples Nacional (${(aliquotaEfetiva * 100).toFixed(2)}%): R$ ` + (descontoPJ / 12).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/mês' +
            '<br> -----------------------------------------' +
            '<br>(=) Resultado: R$ ' + (ganhosLiquidos/12).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/mês' +
            ' ou R$ ' + (ganhosLiquidos).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/ano </p>' +
            '<br><p><i>*Para cálculo do PJ são utilizadas as aliquotas do Anexo V do Simples Nacional: aqui estão inseridas as empresas que prestam serviços de auditoria, jornalismo, tecnologia, publicidade, engenharia, entre outras.</i></p>'
    }
}


formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    resultado.innerHTML = ''

    const tipo = document.querySelector('input[name="tipo"]:checked')
    const salario =  parseFloat(salarioBruto.value.replace(',', '.'))

    if (isNaN(salario)) {
        resultado.innerHTML = '<p><b>Por favor, insira um valor válido no campo Salario Bruto.</b></p>'
    } else {
        calculaSalarioCLT(salario, tipo.value)
        calculaSalarioPJ(salario, tipo.value)
    }
})
