class RegimeTributario {
    simplesNacional = {
        // rbt12: Receita Bruta Total em 12 meses (ano anterior).
        // Aliquota: Alíquota do Simples Nacional.
        // PD: Parcela Dedutível do Simples Nacional.

        // Anexo I do Simples Nacional 2023.
        comercio: {
            faixa1: {
                rbt12: 180000.00,
                aliquota: 4,
                pd: 0,
            },
            faixa2: {
                rbt12: 360000.00,
                aliquota: 7.3,
                pd: 5940.00
            },
            faixa3: {
                rbt12: 720000.00,
                aliquota: 9.5,
                pd: 13860.00
            },
            faixa4: {
                rbt12: 1800000.00,
                aliquota: 10.7,
                pd: 22500.00
            },
            faixa5: {
                rbt12: 3600000.00,
                aliquota: 14.3,
                pd: 87300.00
            },
            faixa6: {
                rbt12: 4800000.00,
                aliquota: 19,
                pd: 378000.00
            }
        },
        // Anexo II do Simples Nacional 2023.
        industria: {
            faixa1: {
                rbt12: 180000.00,
                aliquota: 4.5,
                pd: 0,
            },
            faixa2: {
                rbt12: 360000.00,
                aliquota: 7.8,
                pd: 5940.00
            },
            faixa3: {
                rbt12: 720000.00,
                aliquota: 10,
                pd: 13860.00
            },
            faixa4: {
                rbt12: 1800000.00,
                aliquota: 11.2,
                pd: 22500.00
            },
            faixa5: {
                rbt12: 3600000.00,
                aliquota: 14.7,
                pd: 85500.00
            },
            faixa6: {
                rbt12: 4800000.00,
                aliquota: 30,
                pd: 720000.00
            }
        },
        // Somente ANEXO III do Simples Nacional 2023 por enquanto.
        servicos: {
            faixa1: {
                rbt12: 180000.00,
                aliquota: 6,
                pd: 0,
            },
            faixa2: {
                rbt12: 360000.00,
                aliquota: 11.2,
                pd: 9360.00
            },
            faixa3: {
                rbt12: 720000.00,
                aliquota: 13.5,
                pd: 17640.00
            },
            faixa4: {
                rbt12: 1800000.00,
                aliquota: 16,
                pd: 35640.00
            },
            faixa5: {
                rbt12: 3600000.00,
                aliquota: 21,
                pd: 125640.00
            },
            faixa6: {
                rbt12: 4800000.00,
                aliquota: 33,
                pd: 648000.00
            }
        }
    }
    lucroPresumido: {}
    lucroReal: {}
}

export default RegimeTributario;