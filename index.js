
const endpoint = "https://pimenta.cognitiveservices.azure.com"
const key = "0d9c4b7fb94c4e29b18aae5729dedd13"

const container = document.getElementById("container")
async function imagemAnalise(imageUrl) {
  fetch(`${endpoint}/vision/v3.1/analyze?visualFeatures=Tags&language=pt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': key
    },
    body: JSON.stringify({ url: imageUrl })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao fazer a solicitação: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    
    const tagsElement = document.createElement('ul');
    tagsElement.innerHTML = data.tags.map(tag => `<li>${tag.name} (${tag.confidence.toFixed(2)})</li>`).join('');
    container.appendChild(tagsElement);
  })
  .catch(error => {
   
    console.error('Erro:', error);
  });
  
}

 imagemAnalise("https://armazenandohoje.blob.core.windows.net/contentorimg/hisokinha.jpg")
 imagemAnalise("https://armazenandohoje.blob.core.windows.net/contentorimg/unomillinho.jpg")





