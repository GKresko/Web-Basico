const btnTema = document.getElementById("btnTema");

btnTema.addEventListener("click", function () {
    document.body.classList.toggle("claro");

    if (document.body.classList.contains("claro")) {
        btnTema.textContent = "☀️";
    } else {
        btnTema.textContent = "🌙";
    }
});

const cards = document.querySelectorAll(".card");

const detalhe = document.getElementById("detalhe");
const detalheNome = document.getElementById("detalheNome");
const detalheInfo = document.getElementById("detalheInfo");

cards.forEach(function (card) {
    card.addEventListener("click", function () {
        cards.forEach(function (c) {
            c.classList.remove("selecionado");
        });

        card.classList.add("selecionado");

        detalheNome.textContent = card.dataset.nome;
        detalheInfo.textContent = card.dataset.info;

        detalhe.classList.remove("escondido");
    });
});

const busca = document.getElementById("busca");

busca.addEventListener("input", function () {
    const texto = busca.value.toLowerCase();

    cards.forEach(function (card) {
        const nome = card.dataset.nome.toLowerCase();

        if (nome.includes(texto)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

const curiosidades = [
    "A luz do Sol leva cerca de 8 minutos para chegar à Terra.",
    "Um dia em Vênus é mais longo que um ano em Vênus!",
    "O Sol representa 99,8% de toda a massa do Sistema Solar.",
    "Em Marte, o pôr do sol é azul.",
    "Júpiter tem mais de 90 luas conhecidas.",
    "As pegadas deixadas na Lua podem durar milhões de anos.",
    "Plutão deixou de ser considerado planeta em 2006.",
    "Netuno leva 165 anos terrestres para dar uma volta no Sol."
];

const btnCuriosidade = document.getElementById("btnCuriosidade");
const textoCuriosidade = document.getElementById("textoCuriosidade");

btnCuriosidade.addEventListener("click", function () {
    const indice = Math.floor(Math.random() * curiosidades.length);

    textoCuriosidade.textContent = "🔭 " + curiosidades[indice];
});

const perguntas = [
    {
        pergunta: "Qual é o maior planeta do Sistema Solar?",
        opcoes: ["Terra", "Júpiter", "Saturno", "Netuno"],
        correta: 1
    },
    {
        pergunta: "Qual planeta é conhecido como Planeta Vermelho?",
        opcoes: ["Marte", "Vênus", "Mercúrio", "Urano"],
        correta: 0
    },
    {
        pergunta: "Quantos planetas existem no Sistema Solar?",
        opcoes: ["7", "9", "8", "10"],
        correta: 2
    },
    {
        pergunta: "Qual planeta é o mais quente?",
        opcoes: ["Mercúrio", "Marte", "Júpiter", "Vênus"],
        correta: 3
    }
];

let perguntaAtual = 0;
let acertos = 0;

const elPergunta = document.getElementById("pergunta");
const elOpcoes = document.getElementById("opcoes");
const elResultado = document.getElementById("resultado");
const btnProxima = document.getElementById("btnProxima");

function mostrarPergunta() {
    const p = perguntas[perguntaAtual];

    elPergunta.textContent = (perguntaAtual + 1) + ". " + p.pergunta;

    elOpcoes.innerHTML = "";
    elResultado.textContent = "";

    btnProxima.classList.add("escondido");

    p.opcoes.forEach(function (opcao, indice) {
        const botao = document.createElement("button");
        botao.textContent = opcao;
        botao.classList.add("opcao");

        botao.addEventListener("click", function () {
            verificarResposta(indice, botao);
        });

        elOpcoes.appendChild(botao);
    });
}

function verificarResposta(indiceEscolhido, botaoClicado) {
    const p = perguntas[perguntaAtual];
    const botoes = elOpcoes.querySelectorAll(".opcao");

    botoes.forEach(function (b) {
        b.disabled = true;
    });

    if (indiceEscolhido === p.correta) {
        botaoClicado.classList.add("certa");
        elResultado.textContent = "✅ Acertou!";
        acertos++;
    } else {
        botaoClicado.classList.add("errada");
        botoes[p.correta].classList.add("certa");
        elResultado.textContent = "❌ Errou! A resposta certa é: " + p.opcoes[p.correta];
    }

    btnProxima.classList.remove("escondido");

    if (perguntaAtual === perguntas.length - 1) {
        btnProxima.textContent = "Ver resultado";
    }
}

btnProxima.addEventListener("click", function () {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        elPergunta.textContent = "Fim do quiz! Você acertou " + acertos + " de " + perguntas.length + ".";
        elOpcoes.innerHTML = "";
        elResultado.textContent = "";
        btnProxima.textContent = "Jogar de novo";

        perguntaAtual = -1;
        acertos = 0;
    }

    if (perguntaAtual === 0) {
        btnProxima.textContent = "Próxima pergunta";
    }
});

mostrarPergunta();

document.getElementById("ano").textContent = new Date().getFullYear();

const tabela = document.getElementById("tabelaPlanetas");
const cabecalhos = tabela.querySelectorAll("th");

let ordemCrescente = true;
let ultimaColuna = -1;

cabecalhos.forEach(function (th) {
    th.addEventListener("click", function () {
        const coluna = Number(th.dataset.coluna);
        const tipo = th.dataset.tipo;
        const corpo = tabela.querySelector("tbody");

        const linhas = Array.from(corpo.querySelectorAll("tr"));

        if (coluna === ultimaColuna) {
            ordemCrescente = !ordemCrescente;
        } else {
            ordemCrescente = true;
        }
        ultimaColuna = coluna;

        linhas.sort(function (a, b) {
            const valorA = a.children[coluna].textContent;
            const valorB = b.children[coluna].textContent;
            let comparacao;

            if (tipo === "numero") {
                comparacao = Number(valorA) - Number(valorB);
            } else {
                comparacao = valorA.localeCompare(valorB);
            }

            if (ordemCrescente) {
                return comparacao;
            } else {
                return -comparacao;
            }
        });

        linhas.forEach(function (linha) {
            corpo.appendChild(linha);
        });
    });
});

const gravidades = [
    { nome: "Mercúrio", gravidade: 0.38 },
    { nome: "Vênus", gravidade: 0.91 },
    { nome: "Terra", gravidade: 1 },
    { nome: "Lua", gravidade: 0.17 },
    { nome: "Marte", gravidade: 0.38 },
    { nome: "Júpiter", gravidade: 2.53 },
    { nome: "Saturno", gravidade: 1.07 },
    { nome: "Urano", gravidade: 0.89 },
    { nome: "Netuno", gravidade: 1.14 }
];

const inputPeso = document.getElementById("inputPeso");
const btnCalcular = document.getElementById("btnCalcular");
const erroPeso = document.getElementById("erroPeso");
const resultadoPeso = document.getElementById("resultadoPeso");

function calcularPeso() {
    const peso = Number(inputPeso.value);

    if (inputPeso.value === "" || peso <= 0) {
        erroPeso.textContent = "⚠️ Digite um peso válido!";
        resultadoPeso.innerHTML = "";
        return;
    }

    erroPeso.textContent = "";
    resultadoPeso.innerHTML = "";

    const maiorPeso = peso * 2.53;

    gravidades.forEach(function (lugar) {
        const pesoNoLugar = peso * lugar.gravidade;

        const porcentagem = (pesoNoLugar / maiorPeso) * 100;

        const item = document.createElement("div");
        item.classList.add("item-peso");

        item.innerHTML =
            "<strong>" + lugar.nome + "</strong>" +
            pesoNoLugar.toFixed(1) + " kg" +
            "<div class='barra-fundo'><div class='barra'></div></div>";

        resultadoPeso.appendChild(item);

        setTimeout(function () {
            item.querySelector(".barra").style.width = porcentagem + "%";
        }, 50);
    });
}

btnCalcular.addEventListener("click", calcularPeso);

inputPeso.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        calcularPeso();
    }
});

const btnTopo = document.getElementById("btnTopo");

function verificarBotaoTopo() {
    if (window.scrollY > 400) {
        btnTopo.classList.add("mostrar");
    } else {
        btnTopo.classList.remove("mostrar");
    }
}

btnTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const secoes = document.querySelectorAll("main section");
const linksMenu = document.querySelectorAll("nav a");

function destacarMenu() {
    let secaoAtual = "";

    secoes.forEach(function (secao) {
        if (window.scrollY >= secao.offsetTop - 150) {
            secaoAtual = secao.id;
        }
    });

    linksMenu.forEach(function (link) {
        link.classList.remove("ativo");

        if (link.getAttribute("href") === "#" + secaoAtual) {
            link.classList.add("ativo");
        }
    });
}

window.addEventListener("scroll", function () {
    verificarBotaoTopo();
    destacarMenu();
});

verificarBotaoTopo();
destacarMenu();
