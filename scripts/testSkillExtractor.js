import { extractSkills } from "../services/skillExtractor.js";

const testCases = [
  "Looking for a Node.js developer with MongoDB and React experience.",

  "Experience with Node JS, ExpressJS, Mongo DB and Docker.",

  "Strong knowledge of JavaScript, TypeScript and ReactJS.",

  "Looking for a C++ developer with C# experience.",

  "Experience with Spring Boot and Amazon Web Services.",

  "Python developer with PostgreSQL and Redis experience.",

  "Java developer with Spring Boot experience.",
];

for (const text of testCases) {
  console.log("\nDescription:");
  console.log(text);

  const skills = extractSkills(text);

  console.log("Extracted skills:", skills);
}