
const endpoint = "https://pimenta.cognitiveservices.azure.com"
const key = "0d9c4b7fb94c4e29b18aae5729dedd13";
const imageUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/celebrities.jpg"
import { computerVision } from "../script/script.js"; 


fetch(`${endpoint}/vision/v3.1/analyze?visualFeatures=Tags&language=en`, {
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
    console.log('Tags:', data.tags);
    const tagsElement = document.getElementById('tags');
    tagsElement.innerHTML = data.tags.map(tag => `<li>${tag.name} (${tag.confidence.toFixed(2)})</li>`).join('');
  })
  .catch(error => {
   
    console.error('Erro:', error);
  });

