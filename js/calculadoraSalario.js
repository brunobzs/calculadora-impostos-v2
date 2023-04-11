const formulario = document.querySelector('#formulario')
const salarioBruto = document.querySelector('#salario-bruto')
const resultado = document.querySelector('#resultado')


// Variáveis globais para o cálculo de CLT.
let inss = 0
let ir = 0
let salarioLiquido = 0
let descontoINSS = 0
let descontoIR = 0
let decimoTerceiroSal = 0
let umTercoFerias = 0
let descontoIRFerias = 0
let descontoINSSFerias = 0

// Variáveis globais para o cálculo de CLT.
let aliquota = 0
let pd = 0
let aliquotaEfetiva = 0
let descontoPJ = 0
let ganhosLiquidos = 0


function calculaSalarioCLT(salarioBruto, tipo) {
    let salario = salarioBruto

    if (tipo === 'por-ano') {
        salario = salario / 12
    }

    // Retorna a aliquota e INSS.
    if (salario <= 1302.00) {
        inss = 0.075
    }
    if (salario <= 2571.29) {
        inss = 0.09
    }
    if (salario <= 3856.94) {
        inss = 0.12
    } else {
        inss = 0.14
    }

    //Retorna a aliquota do IR.
    if (salario <= 1903.98) {
        ir = 0
    }
    if (salario <= 2826.65) {
        ir = 0.075
    }
    if (salario <= 3751.05) {
        ir = 0.15
    }
    if (salario <= 4664.68) {
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
    totalBeneficios = umTercoFeriasLiquido + decimoTerceiroSal

    return resultado.innerHTML += '<p><h3>Contrato - CLT</h3></p>' +
        '<p>Salário Bruto Mensal: R$ ' + salario.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        `<br>(-) INSS (${(inss * 100).toFixed(2)}%): R$ ` + descontoINSS.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        `<br>(-) IR (${(ir * 100).toFixed(2)}%): R$ ` + descontoIR.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        '<br> -----------------------------------------' +
        '<br>(=) Salário Líquido: R$ ' + salarioLiquido.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '</p>' +
        '<p>(+) 1/3 de Férias: R$ ' + umTercoFerias.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        `<br>(-) IR sobre Férias (${(ir * 100).toFixed(2)}%): R$ ` + descontoIRFerias.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        `<br>(-) INSS sobre Férias (${(inss * 100).toFixed(2)}%): R$ ` + descontoIRFerias.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        '<br>(+) 13º com descontos: R$ ' + salarioLiquido.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        '<br> -----------------------------------------' +
        '<br>(=) Resultado: ' +
        '<br>R$ ' + salarioLiquido.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/mês' +
        ' + R$ ' + totalBeneficios.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' de benefícios' +
        ' ou R$ ' + ((salarioLiquido * 12) + totalBeneficios).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/ano </p>' +
        '<center><hr size="50"></center>'
}

function calculaSalarioPJ(faturamento, tipo) {
    let receitaBruta = faturamento

    if (tipo === 'por-mes') {
        receitaBruta = receitaBruta * 12
    }

    // No caso de CLT vamos considerar o regime tributário do Simples Nacional - Anexo V, pois é o mais comum.
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

    return resultado.innerHTML += '<p><h3>PJ - Serviço</h3></p>' +
        '<p>Salário Bruto Mensal: R$ ' + (receitaBruta / 12).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        `<br>(-) Simples Nacional (${(aliquotaEfetiva * 100).toFixed(2)}%): R$ ` + (descontoPJ / 12).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/mês' +
        '<br> -----------------------------------------' +
        '<br>(=) Resultado: R$ ' + (ganhosLiquidos/12).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/mês' +
        ' ou R$ ' + (ganhosLiquidos).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/ano </p>' +
        '<br><p>* Para cálculo do PJ são utilizadas as aliquotas do Anexo V do Simples Nacional: aqui estão inseridas as empresas que prestam serviços de auditoria, jornalismo, tecnologia, publicidade, engenharia, entre outras.</p>'
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
