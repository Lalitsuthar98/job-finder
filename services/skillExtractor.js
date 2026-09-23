import skillDictionary from "./skillDictionary.js";
import { normalizeText } from "./textNormalizer.js";

const aliasMap = new Map();

let maxAliasWords = 1;

for (const [canonicalSkill, aliases] of Object.entries(skillDictionary)) {
  for (const alias of aliases) {
    const normalizedAlias = normalizeText(alias);

    aliasMap.set(normalizedAlias, canonicalSkill);

    const wordCount = normalizedAlias.split(" ").length;

    if (wordCount > maxAliasWords) {
      maxAliasWords = wordCount;
    }
  }
}

export const extractSkills = (text) => {
  if (!text || typeof text !== "string") {
    return [];
  }

  const normalizedText = normalizeText(text);
  const words = normalizedText.split(" ");

  const matchedSkills = new Set();
  const consumed = new Set();

  for (let i = 0; i < words.length; i++) {
    if (consumed.has(i)) {
      continue;
    }

    for (
      let length = maxAliasWords;
      length >= 1;
      length--
    ) {
      if (i + length > words.length) {
        continue;
      }

      const phrase = words
        .slice(i, i + length)
        .join(" ");

      const cleanPhrase = phrase
        .replace(
          /^[,;:!?()[\]{}]+|[,;:!?()[\]{}.,]+$/g,
          ""
        );

      const skill = aliasMap.get(cleanPhrase);

      if (skill) {
        matchedSkills.add(skill);

        // Mark these words as already used
        for (let j = i; j < i + length; j++) {
          consumed.add(j);
        }

        break;
      }
    }
  }

  return [...matchedSkills];
};

// this is skillExtractor.js  
