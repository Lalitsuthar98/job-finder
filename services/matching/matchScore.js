export const calculateMatchScore = ({
  skillScore = 0,
  experienceScore = 0,
  locationScore = 0,
  salaryScore = 0,
}) => {
  const score =
    skillScore * 0.80 +
    experienceScore * 0.10 +
    locationScore * 0.05 +
    salaryScore * 0.05;

  return Number(score.toFixed(2));
};
