const comments = document.getElementById('boxComment')

document.getElementById('closeComments').addEventListener('click', () => {
    comments.style.display = "none";
})

//Manipulando DOM
function buscandoImagem(idImage) {
    const URL = 'http://localhost:8080/api/getImage';

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idImage })
    })
        .then((res) => {

            if (!res.ok) {
                throw new Error('Erro na resposta do servidor: ' + res.status);
            }
            return res.json();

        })
        .then((data) => {

            const dados = data.dados

            const headerComment = comments.querySelector('.headerComment h2');
            if (headerComment) {
                headerComment.innerText = `${dados.titulo}`;
            } else {
                console.log('Elemento headerComment não encontrado');
            }
            const imagem = comments.querySelector('.imgBox img');
            imagem.src = dados.link;

            const likes = comments.querySelector('.basicInfos .likeBox span:first-of-type ');
            likes.innerText = dados.likes;

            const chat = comments.querySelector('.basicInfos .chatBox span:first-of-type');
            chat.innerText = dados.comentarios;

        })
}

function likes(idImagem, idUsuario, likeIcon) {

    if (!idImagem) {
        return alert('Estamos com problemas internos, tente novamente mais tarde');
    }

    if (!idUsuario) {
        return alert('Faça login para conseguir interagir com as imagens')
    }

    const URL = 'http://localhost:8080/api/likes';

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idImagem, idUsuario })
    })
        .then((res) => {

            if (!res.ok) {
                throw new Error('Erro na resposta do servidor: ' + res.status);
            }
            return res.json();

        })
        .then((data) => {

            const item = likeIcon.closest('.item');
            const valorSpan = item.querySelector('.interac span:first-of-type');

            const valorAtual = parseInt(valorSpan.innerText) || 0;

            if (data.isLiked) {

                valorSpan.innerText = valorAtual + 1;
                likeIcon.src = './icons/coraçãoVermelho.svg';

            } else {

                valorSpan.innerText = valorAtual - 1;
                likeIcon.src = './icons/coração.svg';

            }

        })
}


document.addEventListener('DOMContentLoaded', () => {

    const items = document.querySelectorAll('.item');
    const chatIcons = document.querySelectorAll('.chat');
    const likeIcons = document.querySelectorAll('.interac img:first-of-type');

    items.forEach((item) => {

        item.addEventListener('click', () => {

            const img = item.querySelector('img');

            if (img) {

                const removeCh = img.id.replace(/^image-/, '');
                localStorage.setItem('idImage', removeCh);
                comments.style.display = "flex"

                const idImage = localStorage.getItem('idImage');

                buscandoImagem(idImage)

            } else {
                console.log('Nenhuma imagem encontrada dentro do item.');
            }
        });
    });

    chatIcons.forEach((chat) => {

        chat.addEventListener('click', (event) => {

            event.stopPropagation();

            const item = chat.closest('.item'); //Pega o .item mais proximo
            const img = item.querySelector('img');

            if (img) {

                const removeCh = img.id.replace(/^image-/, '');
                localStorage.setItem('idImage', removeCh);
                comments.style.display = "flex";

                const idImage = localStorage.getItem('idImage');

                buscandoImagem(idImage)

            } else {
                console.log('Nenhuma imagem encontrada dentro do item.');
            }
        });
    });

    // Evento no ícone de like
    likeIcons.forEach((likeIcon) => {
        likeIcon.addEventListener('click', (event) => {
            event.stopPropagation();

            const item = likeIcon.closest('.item');
            const img = item.querySelector('img');

            if (img) {
                const removeCh = img.id.replace(/^image-/, '');
                localStorage.setItem('idImage', removeCh);

                const idImagem = localStorage.getItem('idImage');
                const idUsuario = localStorage.getItem('userId');

                likes(idImagem, idUsuario, likeIcon);
            } else {
                console.log('Nenhuma imagem encontrada dentro do item.');
            }
        });
    });
});

//Enviando comentarios
document.getElementById('sendComment').addEventListener('click', () => {

    const comentario = document.getElementById('comentario').value;
    const idImagem = localStorage.getItem('idImage');
    const idUsuario = localStorage.getItem('userId');

    if (comentario.length <= 2) {
        return alert('O comentário deve conter mais de 2 caracteres');
    }

    if (!idImagem) {
        return alert('Estamos com problemas internos, tente novamente mais tarde');
    }

    if (!idUsuario) {
        return alert('Faça login para conseguir interagir com as imagens')
    }

    const URL = 'http://localhost:8080/api/comentar';

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comentario, idImagem, idUsuario })
    })
        .then((res) => {

            if (!res.ok) {
                throw new Error('Erro na resposta do servidor: ' + res.status);
            }
            return res.json();

        })
        .then((data) => {

            console.log(data)

            const chatBox = document.querySelector('.chatBox span:first-of-type')

            const valorSpan = parseInt(chatBox.innerText) || 0;
            const valorAtual = valorSpan + 1

            chatBox.innerText = valorAtual;

            alert(data.message);
            const comentarioInput = document.getElementById('comentario');
            if (comentarioInput) {
                comentarioInput.value = "";  // Limpar o campo de input corretamente
            }
        })

})

//like dentro do popup
document.querySelector('.like').addEventListener('click', () => {

    const URL = 'http://localhost:8080/api/likes';

    const idImagem = localStorage.getItem('idImage');
    const idUsuario = localStorage.getItem('userId');


    if (!idImagem) {
        return alert('Estamos com problemas internos, tente novamente mais tarde');
    }

    if (!idUsuario) {
        return alert('Faça login para conseguir interagir com as imagens')
    }


    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idImagem, idUsuario })
    })
        .then((res) => {

            if (!res.ok) {
                throw new Error('Erro na resposta do servidor: ' + res.status);
            }
            return res.json();

        })
        .then((data) => {

            if (data.isLiked) {
                const likeBox = document.querySelector(' .likeBox span:first-of-type');
                const icon = document.querySelector('.likeBox img:first-of-type');

                const valorSpan = parseInt(likeBox.innerText) || 0;
                const valorAtual = valorSpan + 1
                likeBox.innerText = valorAtual

                icon.src = './icons/coraçãoVermelho.svg';
            } else {

                const likeBox = document.querySelector(' .likeBox span:first-of-type');
                const icon = document.querySelector('.likeBox img:first-of-type');

                const valorSpan = parseInt(likeBox.innerText) || 0;
                const valorAtual = valorSpan - 1
                likeBox.innerText = valorAtual

                icon.src = './icons/coração.svg';

            }
        })

})