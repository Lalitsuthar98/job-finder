export const matchSalary = (userSalary = {}, jobSalary) => {
  if (!userSalary || (!userSalary.min && !userSalary.max)) {
    return {
      matched: false,
      score: 0,
    };
  }

  if (!jobSalary || jobSalary === "Not disclosed") {
    return {
      matched: false,
      score: 0,
    };
  }

  const match = jobSalary.match(
    /(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/
  );

  if (!match) {
    return {
      matched: false,
      score: 0,
    };
  }

  const jobMin = Number(match[1]);
  const jobMax = Number(match[2]);

  const userMin = userSalary.min ?? 0;
  const userMax = userSalary.max ?? Infinity;

  const matched =
    jobMax >= userMin &&
    jobMin <= userMax;

  return {
    matched,
    score: matched ? 1 : 0,
  };
};