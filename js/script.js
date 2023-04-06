const tipoPessoaRadios = document.querySelectorAll('input[name="tipoPessoa"]');
const tipoJuridicaFields = document.querySelectorAll('.tipo-juridica');

function toggleTipoJuridicaFields() {
    tipoJuridicaFields.forEach(field => {
        field.style.display = (tipoPessoaRadios[1].checked) ? 'block' : 'none';
    });
}

toggleTipoJuridicaFields();

tipoPessoaRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        toggleTipoJuridicaFields();
    });
});