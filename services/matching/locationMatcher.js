export const matchLocation = (
  userLocations = [],
  jobLocation
) => {
  if (!userLocations.length || !jobLocation) {
    return {
      matched: false,
      score: 0,
    };
  }

  const normalizedJobLocation = jobLocation.toLowerCase().trim();

  const matched = userLocations.some((location) =>
    normalizedJobLocation.includes(
      location.toLowerCase().trim()
    )
  );

  return {
    matched,
    score: matched ? 1 : 0,
  };
};