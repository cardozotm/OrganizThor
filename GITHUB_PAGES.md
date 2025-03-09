# Guia de Publicação no GitHub Pages

Este documento orienta como publicar sua aplicação OrganizThor no GitHub Pages para que ela fique acessível publicamente.

## Passo 1: Criar um Repositório no GitHub

1. Acesse [GitHub](https://github.com) e faça login na sua conta
2. Clique no botão "+" no canto superior direito e selecione "New repository"
3. Dê um nome ao seu repositório (ex: "organizthor")
4. Escolha a visibilidade do repositório (público é recomendado para GitHub Pages)
5. Não inicialize o repositório com README, .gitignore ou licença
6. Clique em "Create repository"

## Passo 2: Enviar Seu Código para o GitHub

Após criar o repositório, você verá uma página com instruções. Para um projeto existente, use os seguintes comandos no terminal:

```bash
# Certifique-se de estar na pasta do seu projeto
cd /caminho/para/organizthor

# Inicialize um repositório Git local (se ainda não tiver feito)
git init

# Renomeie o .gitignore.txt para .gitignore
mv gitignore.txt .gitignore

# Adicione todos os arquivos ao controle de versão
git add .

# Faça o commit inicial
git commit -m "Versão inicial do OrganizThor"

# Adicione seu repositório GitHub como remoto
git remote add origin https://github.com/SEU-USUARIO/organizthor.git

# Envie o código para o GitHub
git push -u origin main
```

**Nota:** Se você receber um erro no último comando porque sua branch padrão é "master" em vez de "main", use:

```bash
git push -u origin master
```

## Passo 3: Configurar o GitHub Pages

1. Acesse seu repositório no GitHub
2. Clique em "Settings" (Configurações) na barra de navegação superior
3. Role para baixo até a seção "GitHub Pages"
4. Em "Source", selecione "main" ou "master" (dependendo do nome da sua branch principal)
5. Selecione "/" (root) como pasta
6. Clique em "Save"

O GitHub mostrará a URL onde seu site está hospedado (geralmente `https://SEU-USUARIO.github.io/organizthor/`).

## Passo 4: Verificar a Implantação

1. Aguarde alguns minutos para que o GitHub Pages publique seu site
2. Acesse a URL fornecida para verificar se a aplicação está funcionando corretamente
3. Teste as funcionalidades principais para garantir que tudo esteja operando como esperado

## Solução de Problemas

### 1. A página carrega, mas o app não funciona

Se o app carregar mas o modelo de IA não funcionar, verifique:

- Erros no console do navegador (F12)
- Problemas de CORS (Cross-Origin Resource Sharing)
- Se o Transformers.js está sendo carregado corretamente

### 2. Arquivos não aparecem no site

- Verifique se todos os arquivos foram enviados para o GitHub
- Aguarde alguns minutos para que as alterações sejam refletidas no GitHub Pages
- Limpe o cache do navegador

### 3. Outros problemas

- Verifique se a estrutura de arquivos está correta
- Certifique-se de que todos os links entre os arquivos estão usando caminhos relativos
- Confirme que não há chamadas AJAX para domínios não autorizados

## Melhorias Futuras

Para uma experiência de desenvolvimento mais robusta, considere:

1. **Automatizar a implantação**: Configure GitHub Actions para implantar automaticamente
2. **Otimizar os recursos**: Minifique o JavaScript e CSS para melhor desempenho
3. **Adicionar um domínio personalizado**: Configure um domínio personalizado nas configurações do GitHub Pages

## Recursos Adicionais

- [Documentação oficial do GitHub Pages](https://docs.github.com/pt/pages)
- [Usar um domínio personalizado com GitHub Pages](https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Solução de problemas do GitHub Pages](https://docs.github.com/pt/pages/getting-started-with-github-pages/troubleshooting-github-pages-sites) 