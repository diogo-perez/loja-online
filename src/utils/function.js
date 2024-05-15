export function formatValor(value) {
    if (typeof value !== 'number') {
        // Se não for um número, converte para número
        value = parseFloat(value);
    }

    // Formata o valor para BRL
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

export function formatPriceToNumber(price) {
    // Remove os pontos
    const priceWithoutDot = price.replace(/\./g, '');
    // Substitui a vírgula por ponto e converte para número
    return parseFloat(priceWithoutDot.replace(',', '.'));
};