# 🎰 Jump Ghost!

**Jump Ghost** é um protótipo experimental feito pra aprender JavaScript na prática — um jogo simples, visual e direto, com spawn de obstáculos, colisão e HUD.

> ⚠️ **Obs:** o projeto está pausado por enquanto. Este repositório é um registro do que aprendi — posso reescrever no futuro, mas por enquanto fica assim.

----

## 📌 Objetivo

O principal objetivo do projeto é **aprender JavaScript praticando**.  
Este jogo foi **inspirado no Flappy Bird**, recriado do zero apenas para fins de estudo.

----

## 🕹️ Como jogar

- Clique / toque para pular.  
- Passe entre os canos para somar pontos.  
- A dificuldade escala com o score: canos aparecem mais rápido e com menos espaço conforme você avança.

----

## 🛠️ Tecnologias

- **HTML5** — estrutura.  
- **CSS3** — estilos e animações.  
- **JavaScript (vanilla)** — lógica do jogo (física simples, spawn, colisões, HUD).  
- **Gráficos:** artes feitas por mim.

> ⚠️ **Áudio:** não há áudio embutido (decidi não incluir).

----

## 📝 Observações / lições aprendidas

Este foi meu primeiro projeto focado em JS; hoje eu faria muitas coisas diferente, por exemplo:

- Agrupar estado em objetos/módulos (evitar variáveis globais espalhadas).
- Substituir múltiplos `setInterval` por um único loop com `requestAnimationFrame` + `deltaTime`.
- Criar um sistema de entidades (spawn/movimento/destruição) para reduzir churn no DOM.
- Separar lógica (regras, RNG) da renderização para facilitar manutenção e testes.

**OBS (atualização):** originalmente o jogo não usava deltaTime, o que deixava a física dependente do Hz do dispositivo. Adicionei um ajuste simples de deltaTime para tornar a jogabilidade consistente em diferentes taxas de atualização. Mantive a solução intencionalmente direta — o objetivo foi deixar o jogo jogável, não refatorar tudo agora.

Manter o protótipo aqui faz sentido como registro de aprendizado.

----

## ▶️ Como executar (rápido)

Abra `index.html` no navegador (não precisa de servidor).  
Ou rode um servidor local se preferir: `python -m http.server` ou `npx http-server` na pasta do projeto.

----