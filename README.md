
# DevFolio - Portfólio Futurista Next.js

Um site de portfólio moderno, responsivo e animado construído com a mais refente stack tecnológica.

## 🚀 Stack

- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4
- **Animações:** Framer Motion
- **Ícones:** Lucide React

## 🛠️ Como Rodar

1. **Instale as dependências:**
   ```bash
   npm install
   ```
   *Nota: Se encontrar erros de permissão com npm/npx, tente rodar o terminal como administrador ou usar `cmd /c` antes dos comandos.*

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acesse:** `http://localhost:3000`

## 📝 Customização

### Projetos
Edite o arquivo `src/data/projects.ts`. Aqui você pode adicionar, remover ou editar seus projetos.
Cada projeto tem:
- `id`: Identificador único
- `title`: Título do projeto
- `description`: Descrição curta
- `tags`: Categorias para filtro (ex: "Automacao", "Web")
- `stack`: Tecnologias usadas
- `githubUrl`/`liveUrl`: Links opcionais

### Contato e Textos
- **Textos Gerais:** Edite diretamente em `src/components/Hero.tsx`, `src/components/About.tsx`, etc.
- **Email de Contato:** O formulário usa `mailto`. Para configurar, edite `src/components/Contact.tsx` e troque o email na função `handleSubmit`.

### Cores e Tema
As cores principais estão definidas em `src/app/globals.css`:
- `--background`: Cor de fundo (#0B0F14)
- `--accent`: Cor de destaque (#1E4DFF - Azul Royal)

## 📦 Deploy

Este projeto está pronto para deploy na Vercel (recomendado).

1. Suba o código para o GitHub.
2. Importe o projeto na Vercel.
3. Clique em Deploy.
