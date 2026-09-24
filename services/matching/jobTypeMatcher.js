// jobtypeMatcher  code and logic  

export const matchJobType = (userJobTypes = [], jobType) => {
  if (!userJobTypes.length || !jobType) {
    return {
      matched: false,
      score: 0,
    };
  }

  const matched = userJobTypes.includes(jobType);

  return {
    matched,
    score: matched ? 1 : 0,
  };
};