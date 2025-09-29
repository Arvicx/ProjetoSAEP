// Suponha que você tenha os dados necessários para enviar
const idImagem = 1;  // ID da imagem
const idUsuario = 123; // ID do usuário

fetch('/likes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ idImagem, idUsuario })
})
.then(response => response.json())
.then(data => {
    if (data.message === "Like adicionado com sucesso" || data.message === "Like removido com sucesso") {
        console.log(data.message);
        // Atualizar a UI para mostrar a nova contagem de likes
        // Por exemplo, atualizar o contador de likes na interface
        // Exibir data.likeCount para mostrar o número atualizado de likes
    }
})
.catch(error => console.error("Erro ao processar o like:", error));