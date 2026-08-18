# RISE Stats

Site de estatisticas da alianca **RISE** (Lineage 2 Reborn), inspirado no
[Iron Gates](https://iron-gates.vercel.app/statistics). Os dados vem direto
da planilha **Rise Attendance and Epics Control** no Google Sheets — sem
precisar copiar/colar nada, o site busca a versao mais recente automaticamente
(atualiza a cada 5 minutos).

Paginas:

- **Ranking** (`/`) — visao geral: CPs ativas, lider do ranking, top player,
  epics resgatados, ranking de CPs e de players.
- **Epics** (`/epics`) — distribuicao de epics por CP, com detalhamento por
  item (Core, Orfen, Queen Ant, Zaken, Frintezza, Baium, Antharas, Valakas).
- **Regras** (`/regras`) — regulamento de distribuicao de epics (pontos,
  fila, cooldowns).

## Como os dados sao lidos

O site le direto das abas da planilha via o endpoint publico do Google
Sheets (`/gviz/tq?tqx=out:csv&sheet=...`), que funciona para qualquer
planilha compartilhada como **"Qualquer pessoa com o link pode visualizar"**
— nao precisa nem publicar na web, so compartilhar assim.

Abas esperadas na planilha (os nomes precisam bater exatamente):

| Aba | Uso |
|---|---|
| `CP points` | Ranking de CPs / Callers / ADM |
| `Player Ranking` | Ranking individual de jogadores |
| `Epics Control` | Contagem de epics resgatados por CP |

Se voce mudar o nome de alguma aba na planilha, atualize `TAB_NAMES` em
`lib/sheets.ts`.

## Configuracao

1. Copie `.env.example` para `.env.local` e ajuste:

   ```
   NEXT_PUBLIC_SHEET_ID=1NA1RqU8OQVIrNcAR8Hy6I3l-1dw9s2BLBGopar8T5hM
   NEXT_PUBLIC_SIDE_NAME=RISE
   ```

   O `SHEET_ID` fica na URL da planilha, entre `/d/` e `/edit`.

2. Garanta que a planilha esta compartilhada como **"Qualquer pessoa com o
   link" -> Leitor** (Compartilhar, no canto superior direito do Google
   Sheets). Isso e obrigatorio para o site conseguir ler os dados sem login.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Deploy no Vercel (igual ao Iron Gates)

1. Crie um repositorio no GitHub e suba este projeto:

   ```bash
   git init
   git add .
   git commit -m "RISE stats site"
   git branch -M main
   git remote add origin <url-do-seu-repo>
   git push -u origin main
   ```

2. Entre em [vercel.com](https://vercel.com), clique em **Add New → Project**
   e importe o repositorio.
3. Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_SHEET_ID` = o ID da sua planilha
   - `NEXT_PUBLIC_SIDE_NAME` = `RISE` (ou o nome que preferir)
4. Clique em **Deploy**. Pronto — o Vercel builda e publica automaticamente,
   e a cada push no `main` ele atualiza o site sozinho.

O site fica publico num link tipo `rise-stats.vercel.app` (o Vercel sugere um
dominio, e da pra trocar depois nas configuracoes do projeto).

## Estrutura

```
app/            paginas (App Router do Next.js)
components/     componentes de UI (cards, tabelas, nav)
lib/sheets.ts   busca e parse dos dados da planilha (Google Sheets CSV)
lib/csv.ts      parser de CSV
lib/types.ts    tipos compartilhados
```

## Customizando o visual

As cores ficam em `tailwind.config.ts` (paleta `series.*`) e em
`app/globals.css` (fundo, cartoes). A paleta atual segue uma combinacao
validada para acessibilidade (contraste e daltonismo) — se for trocar as
cores, prefira manter tons com contraste parecido.
