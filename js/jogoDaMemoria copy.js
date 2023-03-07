// CONSTANTES

const header = document.querySelector('header')
const TABULEIRO = document.querySelector('.grid')
const CARTA = document.querySelector('.carta')
const IMAGENSCARTAS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const btnNovaPartida = document.querySelector('.btnNovaPartida')
const btnInfo = document.querySelector('.btnInfo')

// VARIÁVEIS

let tempo = document.querySelector('.tempo')
let cartaA = ''
let cartaB = ''
let temporizador = 0
const duracaoTempo = 3

// FUNÇÕES

/**
 * Criar elemento
 * 
 * SINTAXE: criarElemento('div', 'carta')
*/
function criarElemento(elemento, classe) {

    // Criar novo elemento
    const NOVOELEMENTO = document.createElement(elemento)

    // Adicionar classe no novo elemento
    NOVOELEMENTO.className = classe

    return NOVOELEMENTO
}

/**
 * Criar carta
*/
function criarCarta(imagem) {

    // Criando elementos
    const elementoCarta = criarElemento('div', 'carta')
    const cartaFrente = criarElemento('div', 'face frente')
    const cartaCostas = criarElemento('div', 'face costas')

    // Adicionando elementos
    elementoCarta.appendChild(cartaFrente)
    elementoCarta.appendChild(cartaCostas)

    // Adicionar uma imagem de fundo na frente da carta
    cartaFrente.style.backgroundImage = `url("./imagensCartas/${imagem}.gif")`

    // Criar evento de clique para virar a carta
    elementoCarta.addEventListener('click', virarCarta)

    // Adicionar data- para comparação das cartas viradas
    elementoCarta.setAttribute('data-imagensCartas', imagem)

    return elementoCarta
}

/**
 * Virar cartas
*/
function virarCarta({ target }) {

    // Pegando o elemento pai de target
    const cartaVirada = target.parentNode

    // Verificar se a carta está virada.
    if (cartaVirada.className.includes('virada')) {
        return
    }

    // Se a cartaA ainda não foi virada
    // Permite virar apenas uma carta
    if (cartaA === '') {

        // Adiciona a classe que vira a carta
        cartaVirada.classList.add('virada')

        // A cartaA recebe cartaVirada
        cartaA = cartaVirada
    }
    // Se a cartaB ainda não foi virada
    // Permite virar apenas duas cartas
    else if (cartaB === '') {

        // Adiciona a classe que vira a carta
        cartaVirada.classList.add('virada')

        // A cartaB recebe cartaVirada
        cartaB = cartaVirada

        // Verificar se as cartas clicadas são iguais
        verificarPares()
    }

}

/**
 * Montar tabuleiro
*/
function montarTabuleiro() {

    // Duplicar o número de cartas para formar os pares
    const IMAGENSCARTAS2 = IMAGENSCARTAS
    const IMAGENSDUPLICADAS = IMAGENSCARTAS2.concat(IMAGENSCARTAS)

    // Embaralhar cartas
    const IMAGENSEMBARALHADAS = IMAGENSDUPLICADAS.sort(() => gerarNumeroAleatorio(-0.9, 0.1))

    // Percorrer o a lista de imagens
    IMAGENSEMBARALHADAS.forEach((imagem) => {
        const carta = criarCarta(imagem)
        TABULEIRO.appendChild(carta)
    })
}

/**
 * Gerar número aleatório
*/
const gerarNumeroAleatorio = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

/**
 * Verificar pares
*/
function verificarPares() {

    // Pegar o atributo data-listaImagens das duas cartas viradas
    const cartaAVirada = cartaA.getAttribute('data-imagensCartas')
    const cartaBVirada = cartaB.getAttribute('data-imagensCartas')

    // verificar se as duas cartas são iguais. se acertou
    if (cartaAVirada === cartaBVirada) {

        // Incluir a class desabilitada no primeiro elemento filho
        cartaA.firstChild.classList.add('desabilitada')
        cartaB.firstChild.classList.add('desabilitada')

        // Limpar as variáveis para poder virar outras cartas após acertar o par
        // Sem isso não será possível virar mais cartas
        cartaA = ''
        cartaB = ''

        fimDoJogo()
    }
    else {

        // Adicionar um delay para poder ver as duas cartas viradas (só funciona com ele)
        setTimeout(() => {

            // Desvirar as duas cartas
            cartaA.classList.remove('virada')
            cartaB.classList.remove('virada')

            // Limpar as variáveis para poder virar outras cartas após errar o par
            // Sem isso não será possível virar mais cartas
            cartaA = ''
            cartaB = ''

        }, 500)
    }

}

/**
 * Temporizado com contagem regressiva
*/
const contagemRegressiva = (tempoDoParametro) => {
    temporizador = setInterval(() => {

        tempo.textContent = tempoDoParametro

        tempoDoParametro--

        tempoDoParametro < 9 ? tempo.textContent = 0 + tempo.textContent : tempo.textContent

        if (tempoDoParametro < 0) {

            const textoTempo = document.querySelector('.contador p')
            textoTempo.textContent = 'tempo esgotado'
            clearInterval(temporizador)
            console.log('Tempo esgotado! Você não conseguiu virar todas as cartas a tempo.')

            cartaBloqueada = document.querySelectorAll('.carta')
            for (let i = 0; i < cartaBloqueada.length; i++) {
                cartaBloqueada[i].classList.add('desabilitada')
                cartaBloqueada[i].style.border = "none"
            }

            setTimeout(() => {
                TABULEIRO.classList.add('desativada')
                header.classList.add('desativada')

                abrirModal('#', 'modalPerdeu', 'btnFecharModalPerdeu')

            }, 2000)

        }
    }, 1000)
}

/**
 * Fim do jogo ou da rodada
*/
const fimDoJogo = () => {

    const cartas = TABULEIRO.querySelectorAll('.carta')
    const cartasDesabilitadas = document.querySelectorAll('.desabilitada')

    if (cartasDesabilitadas.length === cartas.length) {

        clearInterval(temporizador)

        setTimeout(() => {
            TABULEIRO.classList.add('desativada')
            header.classList.add('desativada')

            abrirModal('#', 'modalGanhou', 'btnFecharModalGanhou')

        }, 2000)

        console.log('Parabéns! Você virou todas as cartas a tempo.')
    }
}






// Função para virar todas as cartas de uma só vez
// const btnMacete = document.querySelector('.btnMacete')

// btnMacete.addEventListener('click', () => {

//     const CARTAS = document.querySelectorAll('.carta')

//     CARTAS.forEach((carta) => {
//         carta.classList.add('virada')
//         carta.firstChild.classList.add('desabilitada')
//     })

//     fimDoJogo()
// })

/**
 * Mensagem personalizada  
 * 
 * Parâmetros:
 * tipoDaMensagem = 'Pergeu', 'Ganhou'
 * Imagem = 'nomeDaImagem'
 * titulo e subtitulo = passar como variável
*/
let criarMensagem = (nomeModal, Imagem, titulo, subtitulo) => {
    const imagem = criarElemento('img', 'imagem')
    const tituloH1 = criarElemento('h1', 'tituloH1')
    const tituloH3 = criarElemento('h3', 'tituloH3')
    const conteudoDiv = criarElemento('div', 'conteudo')
    const btnNovaPartida = criarElemento('button', 'btnNovaPartida')

    nomeModal.appendChild(imagem)
    nomeModal.appendChild(conteudoDiv)
    conteudoDiv.appendChild(tituloH1)
    conteudoDiv.appendChild(tituloH3)
    nomeModal.appendChild(btnNovaPartida)

    imagem.setAttribute('src', `./imagensCartas/${Imagem}.png`)
    tituloH1.innerHTML = `<h1>${titulo}</h1>`
    tituloH3.innerHTML = `<h3>${subtitulo}</h3>`
    btnNovaPartida.innerHTML = 'nova partida'

    btnNovaPartida.addEventListener('click', () => {
        // location.reload()
        // modal.classList.remove('mostrarModal')
    })
}

/**
 * Tela de informação
*/
function abrirModal(simbolo, nomeModal, nomeBotao) {
    const modal = document.querySelector(simbolo + nomeModal)
    if (modal) {
        modal.classList.add('mostrarModal')
        modal.addEventListener('click', function (e) {
            if (e.target.id == nomeModal || e.target.id == nomeBotao) {
                modal.classList.remove('mostrarModal')
            }
        })
    }
}

// Abrir modal info
btnInfo.addEventListener('click', function () {
    abrirModal('#', 'modalInfo', 'btnFecharModalInfo')
})

// Abrir modal perdeu
const btnPerdeu = document.querySelector('#btnPerdeu')
btnPerdeu.addEventListener('click', function () {
    abrirModal('#', 'modalPerdeu', 'btnFecharModalPerdeu')
})



contagemRegressiva(duracaoTempo)
montarTabuleiro()

console.log('abriu')