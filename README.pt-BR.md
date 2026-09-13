# PulseCS — Customer Success Dashboard

Projeto de portfólio de Fernando Simoni, desenvolvido com assistência de IA para explorar acompanhamento de carteira, retenção e indicadores de Customer Success.

## Objetivo

Reunir indicadores de relacionamento com clientes e uma lista priorizada de contas para apoiar a análise de uma operação de Customer Success. A demonstração usa dados fictícios; não representa resultados profissionais reais.

## Funcionalidades

- Indicadores demonstrativos de clientes ativos, churn, NPS, CSAT, Health Score e SLA.
- Gráfico de evolução da carteira e distribuição de saúde.
- Lista de cinco contas fictícias que precisam de atenção.
- Busca por nome, seleção de período e exportação CSV.
- Importação de leads com preservação das colunas originais e busca em todos os campos.
- Layout responsivo para computador e celular.

## Demonstração

[PulseCS hospedado](https://pulse-cs-dashboard.fernandosimoniuk.chatgpt.site) — atualmente restrito à conta do proprietário. Para avaliar sem acesso, execute a cópia deste repositório conforme as instruções abaixo.

## Executar localmente

Requisitos: Python 3 e navegador moderno.

```bash
git clone https://github.com/fernandosimoni/pulse-cs-dashboard.git
cd pulse-cs-dashboard
python -m http.server 8000 --directory dist
```

Abra http://localhost:8000 no navegador. O Chart.js e as fontes são carregados pela internet.

## Roteiro de avaliação

1. Busque “Vitta” e depois use “Limpar busca”.
2. Altere o período para observar os dados demonstrativos.
3. Exporte a lista em CSV.
4. Importe um CSV com cabeçalhos e pesquise pelos campos do arquivo.

## Importação e privacidade

Aceita CSV separado por vírgula, ponto e vírgula ou tabulação, codificação UTF-8 ou Windows-1252, até 5 MB e 10.000 linhas. Os dados ficam somente na memória da página: importe novamente após recarregar. Nenhum lead importado é enviado ao servidor ou incluído neste repositório.

Ao importar, o painel oculta os indicadores fictícios e mostra as colunas do arquivo. Uma lista de leads não permite calcular churn, NPS, CSAT ou SLA automaticamente. A exportação baixa a lista completa, independentemente da busca.

## Limites da demonstração

Os indicadores são valores ilustrativos predefinidos, não calculados a partir dos cinco clientes da tabela. A seleção de período altera parte dos indicadores e a série do gráfico; não recalcula toda a página. Não há banco de dados, histórico, integração com CRM externo ou sincronização entre usuários.

## Tecnologias

HTML5, CSS3, JavaScript e Chart.js.

## Autor

[Fernando Simoni](https://github.com/fernandosimoni) — Economista.
