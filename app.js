// ============================================================
// DESENVOLVIMENTO WEB
// SEMANA - CONSUMO DE APIs E DOM
// ============================================================


// ============================================================
// PARTE 1 - MANIPULAÇÃO E VALIDAÇÃO DE DADOS
// ============================================================

console.log("===== PARTE 1 - PEDIDOS =====");


// Array de pedidos

const pedidos = [
    {
        cliente: "Bia",
        valor: 120,
        status: "pago"
    },

    {
        cliente: "Carlos",
        valor: 80,
        status: "pendente"
    },

    {
        cliente: "Ana",
        valor: 200,
        status: "pago"
    },

    {
        cliente: "",
        valor: 50,
        status: "pago"
    },

    {
        cliente: "João",
        valor: -20,
        status: "pago"
    },

    {
        cliente: "Maria",
        valor: 150,
        status: "pago"
    }
];


// Validar cada pedido

const pedidosValidos = pedidos.filter(function(pedido) {

    const clienteValido =
        pedido.cliente.trim() !== "";

    const valorValido =
        typeof pedido.valor === "number" &&
        pedido.valor > 0;

    return clienteValido && valorValido;

});


console.log("Pedidos válidos:", pedidosValidos);


// Filtrar somente pedidos pagos

const pedidosPagos = pedidosValidos.filter(function(pedido) {

    return pedido.status === "pago";

});


console.log("Pedidos pagos:", pedidosPagos);


// Calcular total faturado

const totalFaturado = pedidosPagos.reduce(function(
    acumulador,
    pedido
) {

    return acumulador + pedido.valor;

}, 0);


console.log(
    "Total faturado: R$",
    totalFaturado.toFixed(2)
);


// Gerar textos no formato:
// "Bia — R$ 120.00"

const textosPedidos = pedidosPagos.map(function(pedido) {

    return `${pedido.cliente} — R$ ${pedido.valor.toFixed(2)}`;

});


console.log("Pedidos formatados:");

textosPedidos.forEach(function(texto) {

    console.log(texto);

});


// ============================================================
// PARTE 2 - BUSCADOR DE CEP
// ============================================================

console.log("===== PARTE 2 - BUSCADOR DE CEP =====");


// Elementos do CEP

const formCep = document.querySelector("#formCep");

const campoCep = document.querySelector("#cep");

const botaoCep = document.querySelector("#botaoCep");

const statusCep = document.querySelector("#statusCep");

const resultadoCep = document.querySelector("#resultadoCep");

const historicoCep = document.querySelector("#historicoCep");


// Array para guardar o histórico

const historico = [];


// ------------------------------------------------------------
// Função para mostrar endereço
// ------------------------------------------------------------

function mostrarEndereco(dados) {

    // Limpa o resultado anterior

    resultadoCep.replaceChildren();


    // Cria um elemento DL

    const listaEndereco = document.createElement("dl");


    // Rua

    const dtRua = document.createElement("dt");

    dtRua.textContent = "Rua";

    const ddRua = document.createElement("dd");

    ddRua.textContent = dados.logradouro || "Não informado";


    // Bairro

    const dtBairro = document.createElement("dt");

    dtBairro.textContent = "Bairro";

    const ddBairro = document.createElement("dd");

    ddBairro.textContent = dados.bairro || "Não informado";


    // Cidade

    const dtCidade = document.createElement("dt");

    dtCidade.textContent = "Cidade";

    const ddCidade = document.createElement("dd");

    ddCidade.textContent = dados.localidade || "Não informado";


    // UF

    const dtUf = document.createElement("dt");

    dtUf.textContent = "UF";

    const ddUf = document.createElement("dd");

    ddUf.textContent = dados.uf || "Não informado";


    // Adicionar elementos

    listaEndereco.append(
        dtRua,
        ddRua,
        dtBairro,
        ddBairro,
        dtCidade,
        ddCidade,
        dtUf,
        ddUf
    );


    // Adicionar ao resultado

    resultadoCep.append(listaEndereco);

}


// ------------------------------------------------------------
// Mostrar histórico
// ------------------------------------------------------------

function atualizarHistorico() {

    historicoCep.replaceChildren();


    historico.forEach(function(item) {

        const li = document.createElement("li");

        li.textContent =
            `${item.cep} - ${item.cidade}/${item.uf}`;

        historicoCep.append(li);

    });

}


// ------------------------------------------------------------
// Buscar CEP
// ------------------------------------------------------------

async function buscarCep(cep) {

    // Estado CARREGANDO

    statusCep.textContent = "Buscando...";

    botaoCep.disabled = true;

    resultadoCep.replaceChildren();


    try {

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`,
            {
                signal: AbortSignal.timeout(5000)
            }
        );


        // Verificar erro HTTP

        if (!resposta.ok) {

            throw new Error("Erro HTTP");

        }


        // Converter resposta para JSON

        const dados = await resposta.json();


        // Estado VAZIO / NÃO ENCONTRADO

        if (dados.erro) {

            statusCep.textContent =
                "CEP não encontrado";

            return;

        }


        // Estado SUCESSO

        mostrarEndereco(dados);

        statusCep.textContent = "";


        // Adicionar ao histórico

        historico.push({

            cep: cep,

            cidade: dados.localidade,

            uf: dados.uf

        });


        atualizarHistorico();


    } catch (erro) {

        // Estado ERRO

        console.error("Erro ao buscar CEP:", erro);

        statusCep.textContent =
            "Falha na conexão. Tente novamente.";

    } finally {

        // Reativar botão

        botaoCep.disabled = false;

    }

}


// ------------------------------------------------------------
// Evento do formulário de CEP
// ------------------------------------------------------------

formCep.addEventListener("submit", function(e) {

    e.preventDefault();


    // trim() remove espaços

    const cepDigitado = campoCep.value.trim();


    // Validar somente números e exatamente 8 dígitos

    const cepValido = /^\d{8}$/.test(cepDigitado);


    if (!cepValido) {

        statusCep.textContent =
            "Digite um CEP válido com 8 números.";

        resultadoCep.replaceChildren();

        return;

    }


    buscarCep(cepDigitado);

});


// ============================================================
// PARTE 3 - MINI POKÉDEX
// ============================================================

console.log("===== PARTE 3 - MINI POKÉDEX =====");


// Elementos da Pokédex

const formPokemon =
    document.querySelector("#formPokemon");

const campoPokemon =
    document.querySelector("#pokemon");

const botaoPokemon =
    document.querySelector("#botaoPokemon");

const statusPokemon =
    document.querySelector("#statusPokemon");

const resultadoPokemon =
    document.querySelector("#resultadoPokemon");


// ------------------------------------------------------------
// Mostrar Pokémon
// ------------------------------------------------------------

function mostrarPokemon(dados) {

    // Limpar resultado anterior

    resultadoPokemon.replaceChildren();


    // Criar card

    const card = document.createElement("div");

    card.classList.add("pokemon-card");


    // Nome

    const nome = document.createElement("h3");

    nome.textContent = dados.name;


    // Imagem

    const imagem = document.createElement("img");

    imagem.src = dados.sprites.front_default;

    imagem.alt = `Imagem do Pokémon ${dados.name}`;


    // Tipos

    const tituloTipos = document.createElement("p");

    tituloTipos.textContent = "Tipos:";


    const containerTipos =
        document.createElement("div");


    dados.types.forEach(function(item) {

        const tipo = document.createElement("span");

        tipo.classList.add("tipo");

        tipo.textContent = item.type.name;

        containerTipos.append(tipo);

    });


    // Adicionar tudo ao card

    card.append(
        nome,
        imagem,
        tituloTipos,
        containerTipos
    );


    // Adicionar à tela

    resultadoPokemon.append(card);

}


// ------------------------------------------------------------
// Buscar Pokémon
// ------------------------------------------------------------

async function buscarPokemon(nomePokemon) {

    // Estado CARREGANDO

    statusPokemon.textContent =
        "Buscando Pokémon...";

    botaoPokemon.disabled = true;

    resultadoPokemon.replaceChildren();


    try {

        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${nomePokemon}`,
            {
                signal: AbortSignal.timeout(5000)
            }
        );


        // fetch não rejeita automaticamente em 404.
        // Por isso precisamos verificar response.ok.

        if (!resposta.ok) {

            if (resposta.status === 404) {

                throw new Error(
                    "POKEMON_NAO_ENCONTRADO"
                );

            }

            throw new Error("Erro HTTP");

        }


        // Converter para JSON

        const dados = await resposta.json();


        // Estado SUCESSO

        mostrarPokemon(dados);

        statusPokemon.textContent = "";


    } catch (erro) {

        console.error(
            "Erro ao buscar Pokémon:",
            erro
        );


        // Estado NÃO ENCONTRADO

        if (
            erro.message ===
            "POKEMON_NAO_ENCONTRADO"
        ) {

            statusPokemon.textContent =
                "Pokémon não encontrado.";

        } else {

            // Estado ERRO

            statusPokemon.textContent =
                "Falha na conexão. Tente novamente.";

        }

    } finally {

        // Reativar botão

        botaoPokemon.disabled = false;

    }

}


// ------------------------------------------------------------
// Evento do formulário da Pokédex
// ------------------------------------------------------------

formPokemon.addEventListener(
    "submit",
    function(e) {

        e.preventDefault();


        // trim()

        const nomeDigitado =
            campoPokemon.value.trim().toLowerCase();


        // Estado VAZIO

        if (nomeDigitado === "") {

            statusPokemon.textContent =
                "Digite o nome de um Pokémon.";

            resultadoPokemon.replaceChildren();

            return;

        }


        buscarPokemon(nomeDigitado);

    }
);


// ============================================================
// FINAL
// ============================================================

console.log(
    "===== PROJETO FINALIZADO ====="
);