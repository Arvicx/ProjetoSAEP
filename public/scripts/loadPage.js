document.addEventListener("DOMContentLoaded", () => {

    const URL = 'http://localhost:8080/api/imagens';
    const container = document.querySelectorAll('.item');

    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((res) => {

            if (!res.ok) {
                throw new Error('Erro na resposta do servidor: ' + res.status);
            }
            return res.json();

        })
        .then((data) => {

            console.log("Dados recebidos" + data)
            const dados = data.dados;

            dados.forEach((dado, index) => {
                const itemDiv = container[index];  // Pega cada div correspondente ao index

                if (itemDiv) {
                    const imgElement = itemDiv.querySelector('img');
                    imgElement.src = dado.link || imgElement.src;

                    imgElement.id = `image-${dado.id}`;

                    imgElement.alt = dado.titulo

                    // Atualiza o número de likes
                    const likeSpan = itemDiv.querySelector('.interac span:nth-child(1)');  // Pega o primeiro <span> para likes
                    if (likeSpan) {
                        likeSpan.textContent = dado.likes || '0';
                    }

                    // Atualiza o número de comentários
                    const comentarioSpan = itemDiv.querySelector('.interac span:nth-child(3)');  // Pega o segundo <span> dentro de .interac (para comentários)
                    if (comentarioSpan) {
                        comentarioSpan.textContent = dado.comentarios || '0';
                    }
                }

            })

        })

})