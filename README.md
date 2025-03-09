# OrganizThor - Detector de Organização de Quartos

![OrganizThor Logo](https://img.shields.io/badge/OrganizThor-1.0-blue)

## Sobre o Projeto

OrganizThor é uma aplicação web que utiliza inteligência artificial para analisar fotos de quartos e determinar se estão organizados ou bagunçados. A aplicação roda diretamente no navegador, utilizando a biblioteca Transformers.js para processamento de imagens sem depender de um servidor backend.

## Funcionalidades

- Upload de imagens do dispositivo
- Captura de fotos pela câmera do dispositivo
- Análise em tempo real do nível de organização do quarto
- Exibição do resultado com pontuação de confiança
- Interface responsiva e amigável para dispositivos móveis

## Tecnologias Utilizadas

- **HTML5, CSS3 e JavaScript** - Para a estrutura e interface do usuário
- **Transformers.js** - Para execução do modelo de IA no navegador
- **Vision Transformer (ViT)** - Modelo de classificação de imagens
- **Canvas API** - Para manipulação e processamento de imagens
- **MediaDevices API** - Para acesso à câmera do dispositivo
- **Node.js e Express** - Para servir a aplicação localmente

## Como Usar

1. Acesse a aplicação pelo navegador
2. Escolha uma das opções:
   - Clique em "Carregar Imagem" para selecionar uma foto da galeria
   - Clique em "Usar Câmera" para tirar uma foto do quarto
3. Aguarde a análise da imagem
4. Veja o resultado (Arrumado/Bagunçado) e o nível de confiança da análise
5. Para realizar uma nova análise, clique em "Nova Análise"

## Instalação e Execução Local

1. Clone este repositório:
   ```
   git clone https://github.com/seu-usuario/organizthor.git
   ```

2. Navegue até o diretório do projeto:
   ```
   cd organizthor
   ```

3. Instale as dependências:
   ```
   npm install
   ```

4. Inicie o servidor:
   ```
   npm start
   ```

5. Acesse o aplicativo em `http://localhost:3000`

### Desenvolvimento

Para desenvolvimento com reinicialização automática do servidor ao alterar arquivos:

```
npm run dev
```

## Importante

- Certifique-se de permitir o acesso à câmera quando solicitado pelo navegador
- A primeira execução pode demorar alguns segundos para carregar o modelo de IA

## Como Funciona

1. **Carregamento do Modelo**: A aplicação carrega o modelo Vision Transformer (ViT) usando a biblioteca Transformers.js
2. **Processamento de Imagem**: A imagem enviada ou capturada é processada usando a API Canvas
3. **Inferência**: O modelo analisa a imagem e gera classificações com pontuações
4. **Mapeamento de Classes**: As classificações são mapeadas para os estados "Arrumado" ou "Bagunçado"
5. **Exibição do Resultado**: O resultado é exibido com um indicador visual de confiança

## Limitações Atuais

- O modelo utilizado (ViT pré-treinado) não foi especificamente treinado para detectar organização em quartos
- Uma heurística é utilizada para mapear as classes do ImageNet para a classificação desejada
- Para obter resultados mais precisos, seria ideal treinar um modelo específico para esta tarefa

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.

## Contato

Email: seu-email@exemplo.com
GitHub: [seu-usuario](https://github.com/seu-usuario)

---

Desenvolvido com ❤️ e IA 