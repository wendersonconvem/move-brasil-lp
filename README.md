# Landing Page Programa MOVE BRASIL

Landing page estática para GitHub Pages, focada em captação de leads do
Programa MOVE BRASIL e continuidade do atendimento pelo WhatsApp.

## Publicação no GitHub Pages

Este projeto não depende de servidor, Node.js, build ou framework. Para
publicar:

1. Acesse `Settings > Pages` no repositório.
2. Selecione `Deploy from a branch`.
3. Escolha a branch `main`.
4. Escolha a pasta `/ (root)`.
5. Salve a configuração.

URL esperada:

```text
https://wendersonconvem.github.io/move-brasil-lp/
```

## Formulário

O formulário envia os dados diretamente para o webhook do Google Sheets definido
em `script.js`:

```js
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzvIg0ZUcsSahcTSfCQZt83JF4Nd8_UKDYrlsatrMD3jGZ6QXa3QwRry3YPY6fkehnQ/exec";
```

O envio usa JSON com `Content-Type: text/plain;charset=utf-8`, formato aceito
por Apps Script que lê `JSON.parse(e.postData.contents)`.

## Estrutura

- `index.html`: página principal.
- `styles.css`: estilos responsivos.
- `script.js`: validação, envio para Google Sheets e WhatsApp.
- `public/`: imagens usadas pela LP.

Quando o logo oficial da Honda estiver disponível, adicione-o em `public/` e
substitua o texto `HONDA` em `index.html` por uma imagem.
