// Elementos da UI
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const placeholderText = document.getElementById('placeholder-text');
const cameraButton = document.getElementById('cameraButton');
const cameraModal = document.getElementById('cameraModal');
const closeModal = document.querySelector('.close-modal');
const cameraFeed = document.getElementById('cameraFeed');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const resultSection = document.getElementById('resultSection');
const resultText = document.getElementById('resultText');
const confidenceBar = document.getElementById('confidenceBar');
const confidenceValue = document.getElementById('confidenceValue');
const newAnalysisBtn = document.getElementById('newAnalysisBtn');
const loadingOverlay = document.getElementById('loadingOverlay');

// Variáveis globais
let classifier;
let stream;

// Inicialização da aplicação
async function init() {
    try {
        showLoading(true, 'Carregando modelo de IA...');
        
        // Carregar o modelo de classificação de imagens usando transformers.js
        // Agora usando a variável global do script carregado via CDN
        classifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');
        
        console.log('Modelo carregado com sucesso');
        showLoading(false);
    } catch (error) {
        console.error('Erro ao carregar o modelo:', error);
        showLoading(false, 'Erro ao carregar o modelo. Por favor, recarregue a página.');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', init);

// Evento para upload de imagem
imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            displayImage(e.target.result);
        };
        
        reader.readAsDataURL(file);
    }
});

// Evento para abrir a câmera
cameraButton.addEventListener('click', openCamera);

// Evento para fechar o modal da câmera
closeModal.addEventListener('click', closeCamera);

// Evento para capturar foto
captureBtn.addEventListener('click', capturePhoto);

// Evento para nova análise
newAnalysisBtn.addEventListener('click', resetUI);

// Funções da aplicação

// Exibir a imagem selecionada
function displayImage(imageSrc) {
    imagePreview.src = imageSrc;
    imagePreview.style.display = 'block';
    placeholderText.style.display = 'none';
    
    // Analisar a imagem após exibição
    analyzeImage(imageSrc);
}

// Analisar a imagem com o modelo
async function analyzeImage(imageSrc) {
    try {
        showLoading(true, 'Analisando imagem...');
        
        // Classificar a imagem
        const results = await classifier(imageSrc);
        console.log('Resultados da classificação:', results);
        
        // Mapear as classes do modelo para "Arrumado" ou "Bagunçado"
        // Nota: Estamos assumindo que o modelo tem classes relevantes
        // Na prática, precisaríamos treinar um modelo específico ou mapear classes existentes
        
        // Para demonstração, vamos criar uma lógica simples de mapeamento
        // baseada nas classes do ViT (que são 1000 classes do ImageNet)
        let isOrganized = determineIfOrganized(results);
        
        // Obter a confiança da previsão (maior score)
        const confidence = Math.max(...results.map(r => r.score)) * 100;
        
        // Mostrar os resultados
        showResults(isOrganized, confidence);
        
        showLoading(false);
    } catch (error) {
        console.error('Erro ao analisar imagem:', error);
        showLoading(false, 'Erro ao analisar a imagem. Por favor, tente novamente.');
    }
}

// Função para determinar se um quarto está organizado com base nos resultados
function determineIfOrganized(results) {
    // Esta é uma implementação de demonstração
    // Na prática, você teria um modelo treinado especificamente para esta tarefa
    
    // Palavras-chave que podem indicar organização/desorganização
    const organizedKeywords = ['neat', 'clean', 'organized', 'tidy', 'minimal', 'order'];
    const messyKeywords = ['messy', 'cluttered', 'disorganized', 'chaotic', 'dirty', 'untidy'];
    
    let organizedScore = 0;
    let messyScore = 0;
    
    // Analisar as classes e scores
    results.forEach(result => {
        const label = result.label.toLowerCase();
        const score = result.score;
        
        // Verificar se a classe contém palavras-chave
        organizedKeywords.forEach(keyword => {
            if (label.includes(keyword)) {
                organizedScore += score;
            }
        });
        
        messyKeywords.forEach(keyword => {
            if (label.includes(keyword)) {
                messyScore += score;
            }
        });
        
        // Verificar algumas classes específicas do ImageNet que podem ser relevantes
        if (label.includes('bookshelf') || label.includes('library')) {
            organizedScore += score * 0.7; // Estantes organizadas
        }
        
        if (label.includes('wardrobe') || label.includes('drawer')) {
            organizedScore += score * 0.6;
        }
    });
    
    // Se não encontrarmos palavras-chave suficientes, usamos uma heurística
    if (organizedScore < 0.1 && messyScore < 0.1) {
        // Calcular uma pontuação baseada na entropia visual das classes
        const entropy = calculateVisualEntropy(results);
        return entropy < 0.7; // Menor entropia = mais organizado
    }
    
    return organizedScore > messyScore;
}

// Função simulada para calcular "entropia visual" como heurística
function calculateVisualEntropy(results) {
    // Quanto mais classes diferentes com alta pontuação, mais "caótica" a imagem
    // Esta é apenas uma aproximação para demonstração
    let sum = 0;
    const topK = results.slice(0, 10); // Considerar apenas as top 10 classes
    
    topK.forEach(result => {
        sum += result.score;
    });
    
    // Normalizar para um valor entre 0 e 1
    return sum / topK.length;
}

// Mostrar os resultados da análise
function showResults(isOrganized, confidence) {
    resultText.textContent = isOrganized ? 'Arrumado ✓' : 'Bagunçado ✗';
    resultText.className = isOrganized ? 'organized' : 'messy';
    
    confidenceBar.style.width = `${confidence}%`;
    confidenceValue.textContent = `${Math.round(confidence)}%`;
    
    resultSection.style.display = 'block';
}

// Abrir a câmera
async function openCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'environment' // Usar câmera traseira em dispositivos móveis
            } 
        });
        
        cameraFeed.srcObject = stream;
        cameraModal.style.display = 'block';
    } catch (error) {
        console.error('Erro ao acessar a câmera:', error);
        alert('Não foi possível acessar a câmera. Por favor, verifique as permissões do navegador.');
    }
}

// Fechar a câmera
function closeCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    cameraModal.style.display = 'none';
}

// Capturar foto da câmera
function capturePhoto() {
    const context = canvas.getContext('2d');
    
    // Definir as dimensões do canvas para corresponder ao vídeo
    canvas.width = cameraFeed.videoWidth;
    canvas.height = cameraFeed.videoHeight;
    
    // Desenhar o quadro atual do vídeo no canvas
    context.drawImage(cameraFeed, 0, 0, canvas.width, canvas.height);
    
    // Converter para URL de dados
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    
    // Exibir e analisar a imagem
    displayImage(imageDataUrl);
    
    // Fechar a câmera
    closeCamera();
}

// Resetar a UI para uma nova análise
function resetUI() {
    imagePreview.style.display = 'none';
    placeholderText.style.display = 'flex';
    resultSection.style.display = 'none';
    imageUpload.value = '';
}

// Exibir/ocultar overlay de carregamento
function showLoading(show, message = 'Carregando...') {
    if (show) {
        document.querySelector('.loading-overlay p').textContent = message;
        loadingOverlay.style.display = 'flex';
    } else {
        loadingOverlay.style.display = 'none';
    }
}

// Tratar erros de rede
window.addEventListener('offline', () => {
    alert('Você está offline. Algumas funcionalidades podem não estar disponíveis.');
});

// Adicionar tratamento de arrastar e soltar para o upload de imagens
const previewContainer = document.getElementById('preview-container');

previewContainer.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.classList.add('drag-over');
});

previewContainer.addEventListener('dragleave', function() {
    this.classList.remove('drag-over');
});

previewContainer.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            displayImage(e.target.result);
        };
        
        reader.readAsDataURL(file);
    }
});

// Função para acessar a API pipeline do transformers.js
// Essa função é necessária porque estamos acessando transformers.js via CDN
function pipeline(task, model) {
    return window.transformers.pipeline(task, model);
} 