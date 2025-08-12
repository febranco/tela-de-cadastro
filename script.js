//inicialização da pagina

document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('form-cadastro')
    const nome  = document.getElementById('nome')
    const email = document.getElementById('email')
    const telefone = document.getElementById('telefone')
    const lista = document.getElementById('lista-usuarios')
    const buscar = document.getElementById('buscar')
    const btnListar = document.getElementById('btn-listar');

    let usuario = []

    btnListar.addEventListener('click', function() {
  carregarUsuario()
    });

//carregar dados salvos localmente

    function carregarUsuario() {
        const  dadosSalvos = localStorage.getItem('usuarios')
        if (dadosSalvos){
        usuario = JSON.parse(dadosSalvos)
        renderizarLista(usuario)
        }
    }
    document.addEventListener('DOMContentLoaded', function(){
        carregarUsuario()
    })

    form.addEventListener('submit', function(e) {
        e.preventDefault()
        if (!nome.value || !email.value || !telefone.value){
            alert("preencha todos os campos")
            return
        }

        const novoUsuario = {
            id: Date.now(),
            nome: nome.value,
            email: email.value,
            telefone: telefone.value,
        }

        usuario.push(novoUsuario)
        localStorage.setItem("usuarios", JSON.stringify(usuario))
        renderizarLista(usuario)
        form.reset()
    })

    buscar.addEventListener('input', function(){    
    
        const termo = buscar.value.toLowerCase()
        const filtrados = usuario.filter( u => u.nome.toLowerCase().includes    (termo) ||  u.email.toLowerCase().includes(termo) 
        )
            renderizarLista(filtrados)
        })   
    
    function renderizarLista (listaUsuario){
        lista.innerHTML = ''
    listaUsuario.forEach(user => {
        const li = document.createElement('li')
        li.innerHTML =`
            <strong>Nome:</strong> ${user.nome} <br>
            <strong>Email:</strong> ${user.email} <br>
            <strong>Telefone:</strong> ${user.telefone} <br>
            <button onclick =  "excluirUsuario(${user.id})"> Excluir</button>`
        lista.appendChild(li)
    });
    }

    //função global 
    window.excluirUsuario = function(id) {
        usuario = usuario.filter(u => u.id !== id)
        localStorage.setItem('usuarios', JSON.stringify(usuario))
        renderizarLista(usuario)
       
    }
})

    
