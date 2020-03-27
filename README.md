# Real Valor

## O Problema

A necessidade de criar uma SPA em React capaz de receber 3 inputs:

- Dois tipos de investimento ("Bitcoin" ou "Tesouro Direto Pré-Fixado")
- Data da realização do investimento (1 ano atrás ou 2 anos atrás)
- Valor total investido (R\$ 2 mil ou R\$ 10 mil)

Após os inputs, a aplicação deve mostrar um gráfico demonstrando o rendimento acumulado do investimento desde a data de início até hoje.

## Ferramentas Utilziadas

- [TypeScript](https://github.com/Microsoft/TypeScript): Linguagem que traz Type-Safety para o JavaScript, consequentemente gerando maior confiabilidade no código.
- [Create React App](https://github.com/facebook/create-react-app): Possibilita a rápida criação de projetos em React, oferecendo a possibilidade de utilizar tanto JavaScript quando TypeScript.
- [Redux](https://github.com/reduxjs/redux): Gerenciador de Estados comumente usado com React.
- [Recharts](https://github.com/recharts/recharts): Biblioteca de Gráficos declarativa que cria gráficos no formato SVG.
- [Material-UI](https://github.com/mui-org/material-ui): Biblioteca de Componentes React que segue as orientações do Material Design, que possibilita a rápida prototipação de interfaces de usuário responsivas.
- [Atomic Design](https://github.com/danilowoz/react-atomic-design): Orientações de organização de componentes e estruturação de código para projetos em React.

## Solução

Inicialmente, o usuário é apresentado com uma breve introdução sobre a aplicação e um formulário requisitando por um Ativo de Investimento, uma Data de Investimento e um Valor de Investimento. Estes campos já estão preenchidos por padrão com "Tesouro Direto Pré-Fixado", "1 ano atrás" e "R\$ 2.000" por padrão.

O usuário pode escolher um ativo de investimento entre "Tesouro Direto Pré-Fixado", "Bitcoin" e algumas outras criptomoedas. Ao escolher uma data de investimento, o usuário pode escolher tanto o ano quanto o mês, podendo ir até 2015. Já para o valor de investimento, há um menu dropdown no qual o usuário pode escolher entre "R$ 2.000" e "R$ 10.000", no entanto, é possível escrever qualquer valor desejado (limitado a valores na casa dos bilhões).

Ao selecionar os valores desejados o usuário pode clicar no botão de "Calcular", que executa uma ação que realiza uma requisição para a [API da CryptoCompare](https://min-api.cryptocompare.com/), que com os resultados obtidos calcula e salva o rendimento no estado da aplicação. O usuário pode voltar e recalcular o mesmo ativo para outras datas ou calcular novos valores para outro ativo.

Ao realizar uma simulação o usuário pode selecionar um ativo de investimento no menu de dropdown ao lado do gráfico para ver mais informações sobre o investimento, tais como a data do início do investimento, o valor total inicial, o valor total hoje e a rentabilidade acumulada até o dia de hoje.

Caso o usuário esteja vendo o app via desktop, basta passar o mouse acima do gráfico para ver o valor do investimento e a rentabilidade acumulada até data correspondente, caso esteja via mobile, basta pressionar o gráfico na área desejada. É possível navegar pelo histórico dos investimentos por uma série de abas acima do gráfico, agrupadas por mês e ano.

## Como Executar

```sh
# clonar este repositório
git clone https://github.com/Pucinelli/real-valor.git
cd real-valor

# instalar dependências
yarn install

# executar versão de development
yarn start

# executar versão de produção
yarn build
serve -s build
```

[Serve](https://github.com/zeit/serve) foi utilizado para testar a versão de produção, assim como recomendado após a execução do comando de build.

## Testes

### Lighthouse

O foco principal dos testes deste projeto foram as métricas do [Google Lighthouse](https://github.com/GoogleChrome/lighthouse), que analisa a qualidade de uma página web entre Performance, Acessibilidade, Boas Práticas, Otimização para Motores de Pesquisa e a possibilidade de transformar a aplicação em uma [PWA](https://web.dev/progressive-web-apps/).

#### Resultados

| Métrica             | Nota |
| :------------------ | :--: |
| Performance         |  90  |
| Acessibilidade      | 100  |
| Boas Práticas       |  93  |
| Motores de Pesquisa | 100  |

O resultado dos testes com Lighthouse podem ser visualizados [neste arquivo](./lighthouse-audit.html).
Para realizar os testes por si mesmo, basta instalar o pacote com o package manager de preferência.

```sh
# yarn
yarn global add lighthouse
# npm
npm install -g lighthouse
```

Para executar o lighthouse você precisa ter algum navegador derivado do Chromium e a variável `CHROME_PATH` apontando para o caminho do executável. Um exemplo da utilização do comando pode ser:

```sh
CHROME_PATH=/usr/bin/chrome lighthouse http://localhost:5000
```

### Testes Unitários

Alguns testes unitários foram feitos utilizando [Jest](https://github.com/facebook/jest), e podem ser executados com o comando `yarn test`.
