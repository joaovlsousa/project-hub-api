**Instruções para iniciar o projeto**

- Clonar o repositório 
```bash
git clone https://github.com/joaovlsousa/project-hub-api.git
```

- Instalar as depêndencias
```bash
pnpm i
``` 

- Criar um arquivo `.env` na raiz do projeto;

- Copiar as variáveis ambiente do arquivo `.env.example` para o arquivo `.env`;

- Executar os seguintes comandos  para subir um container docker com o banco de dados postgres e criar o schema da aplicação
```bash
docker compose up -d
```

- Executar o comando `pnpm dev` para iniciar o servidor;

- Acessar a aplicação através da url [http://localhost:3333](http://localhost:3333)