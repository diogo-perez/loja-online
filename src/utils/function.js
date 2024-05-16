export function formatValor(value) {
    if (typeof value !== 'number') {
        value = parseFloat(value);
    }

    // Formata o valor para BRL
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}