import retryOperation from "../utils/retryOperation.js";

let attempts = 0;

const fakeOperation = async () => {
  attempts++;

  console.log(`Operation attempt: ${attempts}`);

    const error = new Error("unauthorized");
    error.response = { status: 401 };


   throw error;
};

try {
  const result = await retryOperation(fakeOperation);

  console.log("Result:", result);
} catch (error) {
  console.error("Final error:", error.message);
}