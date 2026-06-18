const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/shared/vocabularyItems/vocabularyItems.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Using regex to parse the objects. We look for lessonId, wordEn, and sentenceEn.
const regex = /{\s*lessonId:\s*(\d+),[\s\S]*?wordEn:\s*"(.*?)",[\s\S]*?sentenceEn:\s*"(.*?)",/g;

let match;
let missingCount = 0;

console.log("Слова, в которых отсутствует {{target}} в sentenceEn:");
console.log("-----------------------------------------------------");

while ((match = regex.exec(content)) !== null) {
  const lessonId = match[1];
  const wordEn = match[2];
  const sentenceEn = match[3];

  if (!sentenceEn.includes('{{target}}')) {
    console.log(`Lesson ID: ${lessonId} | Word: "${wordEn}"`);
    missingCount++;
  }
}

console.log("-----------------------------------------------------");
console.log(`Всего слов без {{target}}: ${missingCount}`);
