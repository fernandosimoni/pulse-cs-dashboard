# PulseCS — Customer Success Dashboard

[Português](README.pt-BR.md)

A portfolio project by [Fernando Simoni](https://github.com/fernandosimoni), built with AI assistance to explore account monitoring, retention and Customer Success reporting. The interface is in Brazilian Portuguese and sample records are fictional.

## Business use case

Bring customer relationship indicators and a prioritized account list into one view, helping demonstrate how a Customer Success team might identify accounts needing attention.

## Features

- Illustrative active-customer, churn, NPS, CSAT, Health Score and SLA indicators.
- Portfolio evolution chart and health distribution.
- Five fictional accounts needing attention.
- Customer search, period selector and CSV export.
- CSV lead import preserving original columns, with search across imported fields.
- Responsive desktop and mobile layout.

## Try it

[Hosted PulseCS](https://pulse-cs-dashboard.fernandosimoniuk.chatgpt.site) is currently restricted to the owner's account. Reviewers can run the repository locally.

Requires Python 3 and a modern browser:

```bash
git clone https://github.com/fernandosimoni/pulse-cs-dashboard.git
cd pulse-cs-dashboard
python -m http.server 8000 --directory dist
```

Open http://localhost:8000. Chart.js and fonts load from the internet.

### Suggested walkthrough

1. Search for “Vitta”, then click “Limpar busca” to clear the search.
2. Change the period to view the illustrative series.
3. Export the sample account list.
4. Import a CSV with headers and search across its columns.

## Data and privacy

CSV import supports comma, semicolon or tab delimiters, UTF-8 and Windows-1252, up to 5 MB and 10,000 rows. Imported data stays in page memory only and must be imported again after refresh. It is not uploaded to a server or included in this repository. Export downloads the full current list, regardless of search.

Importing leads hides the fictional metrics and displays the file's original columns. A lead list alone cannot supply churn, NPS, CSAT or SLA measurements.

## Demo limitations

Dashboard metrics are predefined illustrative values, not calculated from the five table records. Changing the period updates selected metrics and the chart series, not every component. There is no database, persistent history, external CRM integration or multi-user synchronization.

This is a portfolio demonstration, not a claim of real customer outcomes.

## Stack

HTML5 · CSS3 · JavaScript · Chart.js
