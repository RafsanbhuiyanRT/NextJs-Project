const baseUrl = "http://localhost:5274/api";

export const createUser = async (user) => {
  console.log("api ->", user);
  try {
    const response = await fetch(`${baseUrl}/Account/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return await response.json();
  } catch (e) {
    console.log("Fetch error -->", e.message);
  }
};

export const loginUser = async (user) => {
  try {
    const response = await fetch(`${baseUrl}/Account/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (e) {
    console.log("Fetch error -->", e.message);
  }
};
