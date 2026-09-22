export const normalizeText = (text) => {
  if (!text || typeof text !== "string") {
    return "";
  }

  return text
    .toLowerCase()
    .replace(/[,;:!?()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};