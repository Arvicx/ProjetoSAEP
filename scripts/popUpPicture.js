const comments = document.getElementById('boxComment')

document.getElementById('closeComments').addEventListener('click',()=>{
    comments.style.display = "none";
})

function buscandoImagem(idImage){
    const URL = 'http://localhost:8080/api/getImage';

    fetch(URL,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({idImage})
    })

    .then((res)=>{
        if(!res.ok){
            throw new Error('Erro na resposta do servidor' + res.status);
        }
        return res.json();
    })

    .then((data) => {
        const dados = data.dados
        const headerComment = comments.querySelector('.headerComment h2');
        if(headerComment){
            headerComment.innerText = `${dados.titulo}`;
        }else{
            console.log('Elemento headerComment não encontrado');
        }

        const imagem = comments.querySelector('.imgBox img')
        imagem.src = dados.link;
        const likes = comments.querySelector('basicInfos.likeBox span:first-of-type');
        likes.innerText = dados.likes;
        const chat = comments.querySelector('basicInfos.chatBox span:first-of-type');
        chat.innerText = dados.comentarios;
    })
}

function likes(idImage,idUsuario,likeIcon){
    if(!idImage){
        return alert ("Estamos com problemas internos, tente novamente mais tarde");
    }
    if(!idUsuario){
        return alert ("Faça login para conseguir interagir com as imagens");
    }
    const URL = "http://localhost:8080/api/likes";

    fetch(URL,{
        method:"POST",
        headers:{'Content-Type':'application/json'
        },
        body:JSON.stringify({idImage,idUsuario})
    })
    .then((res) =>{
        if(!res.ok){
            throw new Error("Erro na resposta do servidor: " + res.status);
        }
        return res.json();
    })
    .then((data)=>{
        const item = likeIcon.closest('item');
        const valorSpan = item.querySelector('.interac span: first-of-type');
        const valorAtual = parseInt(valorSpan.innerText) || 0;

        if(data.isLiked){
            valorSpan.innerText = valorAtual + 1;
            likeIcon.src = "./Icons/coraçãoVermelho.svg";
        }else{
            valorSpan.innerText = valorAtual - 1;
            likeIcon.src = "./Icons/coração.svg";
        }
    })
}

document.addEventListener("DOMContentLoaded",()=>{
    const items = document.querySelectorAll('.item');
    const chatIcons = document.querySelectorAll('.chat');
    const likeIcon = document.querySelectorAll('.interac img:first-of-type');

    items.addEventListener('click',() =>{
        const img = item.querySelector('img');
        if(img){
            const removeCH = img.id.replace(/^image-/, '');
            localStorage.setItem('idImage','removeCH');
            comments.style.display = "flex"
            
            const idImage = localStorage.getItem('idImage');

            buscandoImagem(idImagem)
        }else{
            console.log("Nenhuma imagem encontrada dentro do item");
        }
   });
});

likeIcon.forEach((likeIcon) =>{
    likeIcon.addEventListener('click', (event)=>{
        event.stopPropagation();

        const item = likeIcon.closest('.item');
        const img = item.querySelector('img');

        if(img){
            const removeCH = img.id.replace(/^image-/, '');
            localStorage.setItem('idImage', removeCH);
            const idImage = localStorage.getItem('idImage');
            const idUsuario = localStorage.getItem('userId');

        }
    });
});

document.getElementById('sendComment').addEventListener('click',()=>{
    const comentarios = document.getElementById('comentario').value;
    const idImage = localStorage.getItem('idImage');
    const idUsuario = localStorage.getItem('userId');

    if(comentarios.lenght <= 2){
        return alert('O comentário deve conter mais de 2 caracteres');
    }
    if(!idImage){
        return alert('Estamos com problemas internos, tente novamente mais tarde');
    }
    if(!idUsuario){
        return alert('Faça login para conseguir interagir com as imagens');
    }

    const URL = 'http://localhost:8080/api/comentar';

    fetch(URL, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({comentarios, idImage, idUsuario})
    });
});