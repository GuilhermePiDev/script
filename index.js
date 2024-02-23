
const endpoint = "https://pimenta.cognitiveservices.azure.com"
const key = "0d9c4b7fb94c4e29b18aae5729dedd13"

const container = document.getElementById("container")
const nomeImg = document.getElementById("nome")


async function imagemAnalise() {
  fetch(`${endpoint}/vision/v3.1/analyze?visualFeatures=Tags&language=pt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': key
    },
    body: JSON.stringify({ url: "https://armazenandohoje.blob.core.windows.net/contentorimg/"+nomeImg.value })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao fazer a solicitação: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    const imgtag= document.createElement('div')
    imgtag.innerHTML= `<img src="https://armazenandohoje.blob.core.windows.net/contentorimg/${nomeImg.value}" alt="">`
    const tagsElement = document.createElement('ul');
    tagsElement.innerHTML = data.tags.map(tag => `<li>${tag.name} (${tag.confidence.toFixed(2)})</li>`).join('');
    imgtag.appendChild(tagsElement)
    container.appendChild(imgtag);
    
  })
   
}

 






