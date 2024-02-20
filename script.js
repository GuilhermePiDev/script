const { ComputerVisionClient } = require('@azure/cognitiveservices-computervision');
const { ApiKeyCredentials } = require('@azure/ms-rest-js');

const key = "0d9c4b7fb94c4e29b18aae5729dedd13";
const endpoint = "https://pimenta.cognitiveservices.azure.com";


const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);

async function computerVision(tagsURL) {
  try {
    console.log('-------------------------------------------------');
    console.log('TAGS MOSTRADAS');
    console.log();
    console.log();

    console.log('Análise', tagsURL.split('/').pop());
    const tags = (await computerVisionClient.analyzeImage(tagsURL, { visualFeatures: ['Tags'] })).tags;
    console.log(`Tags: ${formatTags(tags)}`);
    console.log(tags.tags[0]);

    console.log();
    console.log('-------------------------------------------------');
    console.log('fim');

    return tags.tags;
  } catch (error) {
    throw error;
  }
}

function formatTags(tags) {
  return tags.map(tag => (`${tag.name} (${tag.confidence.toFixed(2)})`)).join(',');
}

exports.module= computerVision;


