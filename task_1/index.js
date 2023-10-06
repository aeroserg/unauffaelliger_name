console.log("Let's rock")
// console.log(encodedData, translations)

import { encodedData, translations } from './data.js';

function decodeFields(data) {
  const decodedData = data.map(item => {
    const decodedItem = {};
    for (const key in item) {
      if (key.endsWith('Id') && translations[item[key]] !== undefined && key !== 'groupId') {
        decodedItem[key] = translations[item[key]];
      } else {
        decodedItem[key] = item[key];
      }
    }
    return decodedItem;
  });
  return decodedData;
}

function getUniqueIds(data) {
  const uniqueIds = new Set();
  data.forEach(item => {
    for (const key in item) {
      if (key.endsWith('Id')) {
        uniqueIds.add(item[key]);
      }
    }
  });
  return Array.from(uniqueIds);
}

const decoded = decodeFields(encodedData);
const uniqueIds = getUniqueIds(encodedData);

export { decoded, uniqueIds };

 console.log(decoded, uniqueIds)
