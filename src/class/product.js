
export const Product = (data) => ({
    id: data?.id,
    nome: data?.name,
    marca: data?.brand,
    descricao: data?.description,
    imagem: data?.photo,
    preco: data?.price,
    quantidade: 1
})