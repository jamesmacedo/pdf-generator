# Servidor de Exportação para PDF

Este projeto permite o envio de arquivos PDF via e-mail de maneira simples e eficiente. Utiliza tecnologias como Chromium e Node.js para oferecer uma solução.

## Requisitos do Sistema

Antes de iniciar, verifique se o seu sistema atende aos seguintes requisitos:

- **Chromium**: Certifique-se de que o Chromium está instalado no seu sistema. Ele é usado para renderizar os PDFs antes do envio.
- **Node.js 18.17**: É necessário ter o Node.js na versão 18.17 instalado. 

## Iniciar com Node.js

Siga os passos abaixo para configurar e iniciar o projeto utilizando o Node.js em sua maquina:

**INSTALAR TODOS AS REQUISITOS NECESSÁRIOS**

1. **Instalar Dependências:**
   `npm install`

3. **Configurar Variáveis de Ambiente:**
   Copie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente necessárias, como as credenciais do servidor de e-mail e página final para renderizar.

4. **Iniciar o Server:**
   `node app.js`
## Iniciar com Docker

Siga os passos abaixo para configurar e iniciar o server utilizando Docker:

1. **Construir e Iniciar o Container:**
   `docker-compose build`
   `docker-compose up`

3. **Iniciar como Daemon (Produção):**
   `docker-compose up -d`

## Utilização

Para exportar relatórios em PDF via e-mail, siga os passos abaixo:

1. Acesse a rota `POST /exportar` do server.

2. Envie um payload no formato JSON contendo as seguintes informações:

```json
{
  "page": "https://app.shelfin.com.br/exportar/comportamentais",
  "request": "?data=null&colaborador=null",  
}

```

- `"page"`: Pagina que será renderizada 
- `"request"`: Parametros de request que será injetada na page 


3. O PDF gerado será enviado para o endereço de e-mail fornecido.

Certifique-se de que o seu aplicativo está em execução e acessível para receber as solicitações.

