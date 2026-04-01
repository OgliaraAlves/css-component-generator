let botao = document.querySelector(".botao-gerar")
let blocoCodigo = document.querySelector(".bloco-codigo")
let resultadoCodigo = document.querySelector(".resultado-codigo")
let caixaTexto = document.querySelector(".caixa-texto")
let botoesExemplo = document.querySelectorAll(".exemplo")
let botaoCopiar = document.querySelector(".botao-copiar")

let ultimoResultado = ""

function gerarResultado(textoUsuario) {
    let texto = textoUsuario.toLowerCase().trim()

    if (texto.includes("bola") && texto.includes("vermelha") && texto.includes("quicando")) {
        return `
<style>
    body {
        margin: 0;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #111;
        overflow: hidden;
    }

    .bola {
        width: 100px;
        height: 100px;
        background: red;
        border-radius: 50%;
        animation: quicar 1s infinite ease-in-out;
    }

    @keyframes quicar {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-120px);
        }
    }
</style>

<div class="bola"></div>
`
    }

    if (texto.includes("quadrado") && texto.includes("azul") && texto.includes("girando")) {
        return `
<style>
    body {
        margin: 0;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #111;
    }

    .quadrado {
        width: 120px;
        height: 120px;
        background: blue;
        animation: girar 2s linear infinite;
    }

    @keyframes girar {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>

<div class="quadrado"></div>
`
    }

    if (texto.includes("botão") && texto.includes("verde")) {
        return `
<style>
    body {
        margin: 0;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #111;
    }

    button {
        background: #22c55e;
        color: #090909;
        border: none;
        padding: 16px 28px;
        border-radius: 12px;
        font-size: 18px;
        font-weight: 700;
        box-shadow: 0 8px 24px rgba(34, 197, 94, 0.35);
        cursor: pointer;
    }
</style>

<button>Botão Verde</button>
`
    }

    return `
<style>
    body {
        margin: 0;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #111;
        color: white;
        font-family: Arial, sans-serif;
        padding: 20px;
        text-align: center;
    }

    .mensagem {
        max-width: 420px;
        font-size: 20px;
        line-height: 1.6;
    }

    strong {
        color: #22c55e;
    }
</style>

<div class="mensagem">
    Ainda não sei gerar esse exemplo.<br><br>
    Tente:<br>
    <strong>bola vermelha quicando</strong><br>
    <strong>quadrado azul girando</strong><br>
    <strong>botão verde com sombra</strong>
</div>
`
}

function mostrarResultado(resultado) {
    ultimoResultado = resultado
    blocoCodigo.textContent = resultado
    resultadoCodigo.srcdoc = resultado

    blocoCodigo.classList.remove("fade-in")
    resultadoCodigo.classList.remove("fade-in")

    void blocoCodigo.offsetWidth
    void resultadoCodigo.offsetWidth

    blocoCodigo.classList.add("fade-in")
    resultadoCodigo.classList.add("fade-in")
}

function gerarCodigo() {
    let textoUsuario = caixaTexto.value.trim()

    if (!textoUsuario) {
        blocoCodigo.textContent = "Digite um exemplo para gerar o código."
        resultadoCodigo.srcdoc = ""
        return
    }

    botao.textContent = "Gerando..."
    botao.disabled = true
    botao.style.opacity = "0.8"

    blocoCodigo.textContent = "Gerando componente..."
    resultadoCodigo.srcdoc = `
    <style>
        body {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #111;
        }

        .loader {
            width: 42px;
            height: 42px;
            border: 4px solid #2a2a2a;
            border-top: 4px solid #22c55e;
            border-radius: 50%;
            animation: girarLoader 0.8s linear infinite;
        }

        @keyframes girarLoader {
            to {
                transform: rotate(360deg);
            }
        }
    </style>

    <div class="loader"></div>
    `

    setTimeout(() => {
        let resultado = gerarResultado(textoUsuario)
        mostrarResultado(resultado)

        botao.textContent = "Gerar Código ⚡"
        botao.disabled = false
        botao.style.opacity = "1"
    }, 700)
}

botoesExemplo.forEach((botaoExemplo) => {
    botaoExemplo.addEventListener("click", () => {
        caixaTexto.value = botaoExemplo.dataset.texto
        gerarCodigo()
    })
})

botaoCopiar.addEventListener("click", async () => {
    if (!ultimoResultado) return

    await navigator.clipboard.writeText(ultimoResultado)
    botaoCopiar.textContent = "Copiado!"

    setTimeout(() => {
        botaoCopiar.textContent = "Copiar"
    }, 1200)
})

botao.addEventListener("click", gerarCodigo)