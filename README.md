# Desenvolvimento Web - Consumo de APIs

## Semana - Consumo de APIs e Manipulação Dinâmica do DOM

Este projeto foi desenvolvido para praticar conceitos de JavaScript assíncrono, manipulação de objetos e arrays, consumo de APIs e manipulação dinâmica do DOM.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Fetch API
- Async/Await
- Promises
- DOM
- ViaCEP API
- PokéAPI

---

# Parte 1 - Manipulação e Validação de Dados

Foi criado um array de objetos chamado `pedidos`.

Cada pedido possui:

- cliente
- valor
- status

Primeiramente, os pedidos são validados verificando se o cliente não está vazio e se o valor é um número maior que zero.

Depois são filtrados somente os pedidos com status `"pago"`.

O método `reduce` é utilizado para calcular o total faturado.

Também é utilizado `toFixed(2)` para formatar os valores com duas casas decimais.

Exemplo:

```text
Bia — R$ 120.00