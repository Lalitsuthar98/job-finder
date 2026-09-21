const BASE_URL = "http://localhost:9000/user";

const testUser = {
  name: "Test User",
  age: 22,
  email: `test${Date.now()}@example.com`,
  phone: `9${Date.now().toString().slice(-9)}`,
  password: "Test@12345",
};

let cookie = "";

const request = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(cookie && { Cookie: cookie }),
      ...options.headers,
    },
  });

  const setCookie = response.headers.get("set-cookie");

  if (setCookie) {
    cookie = setCookie.split(";")[0];
  }

  const data = await response.json();

  console.log(`\n${options.method || "GET"} ${url}`);
  console.log("Status:", response.status);
  console.log("Response:", data);

  return data;
};

const runTests = async () => {
  try {
    console.log("🚀 Authentication testing started");

    // 1. Signup
    await request(`${BASE_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(testUser),
    });

    // 2. Login
    await request(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password,
      }),
    });

    // 3. Profile
    await request(`${BASE_URL}/profile`);

    // 4. Update preferences
    await request(`${BASE_URL}/preferences`, {
      method: "PATCH",
      body: JSON.stringify({
        skills: ["Node.js", "MongoDB"],
        jobTypes: ["full-time"],
        experienceLevels: ["fresher"],
        preferredLocations: ["Udaipur", "Remote"],
        salary: {
          min: 20000,
          max: 50000,
        },
      }),
    });

    // 5. Profile after preference update
    await request(`${BASE_URL}/profile`);

    // 6. Logout
    await request(`${BASE_URL}/logout`, {
      method: "POST",
    });

    console.log("\n✅ Authentication tests completed");
  } catch (error) {
    console.error("\n❌ Test failed:", error.message);
  }
};

runTests();