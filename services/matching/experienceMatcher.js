export const matchExperience = (
  userExperienceLevels = [],
  jobExperience
) => {
  if (!userExperienceLevels.length || !jobExperience) {
    return {
      matched: false,
      score: 0,
    };
  }

  const matched = userExperienceLevels.includes(jobExperience);

  return {
    matched,
    score: matched ? 1 : 0,
  };
};