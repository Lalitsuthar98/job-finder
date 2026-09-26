import skillDictionary from "../skillDictionary.js";

const normalizeSkill = (skill) => {
  if (!skill || typeof skill !== "string") {
    return null;
  }

  const normalizedSkill = skill.toLowerCase().trim();

  for (const [canonicalSkill, aliases] of Object.entries(skillDictionary)) {
    if (
      canonicalSkill.toLowerCase() === normalizedSkill ||
      aliases.some(
        (alias) => alias.toLowerCase() === normalizedSkill
      )
    ) {
      return canonicalSkill;
    }
  }

  return normalizedSkill;
};

export const matchSkills = (userSkills = [], jobSkills = []) => {
  if (!userSkills.length || !jobSkills.length) {
    return {
      matchedSkills: [],
      score: 0,
    };
  }

  const normalizedJobSkills = new Set(
    jobSkills.map(normalizeSkill).filter(Boolean)
  );

  const matchedSkills = userSkills.filter((skill) => {
    const normalizedUserSkill = normalizeSkill(skill);

    return normalizedJobSkills.has(normalizedUserSkill);
  });

  const score = matchedSkills.length / userSkills.length;

  return {
    matchedSkills,
    score,
  };
};