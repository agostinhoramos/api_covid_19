# IPG

# Trab 03 - API COVID-19

Com os dados do ficheiro em anexo, pretende-se que os alunos criem uma API com as seguintes funções:
- GET para nº total de registos (localhost:55300/api/v1/covid/register)
- GET para saber o dia com mais casos ativos (localhost:55300/api/v1/covid/day_more_cases)
- GET para saber o dia com menos casos ativos (localhost:55300/api/v1/covid/day_less_cases)
- GET para saber os dados entre duas datas (localhost:55300/api/v1/covid/between_dates/26-06-2022/26-06-2022)

(POST para inserir dados)

(localhost:55300/api/v1/covid/register)
{
    "DATA": "16-06-2023",
    "Total Infetados": 240,
    "Recuperados": 32,
    "Óbitos": 1,
    "Total Ativos": 700
}