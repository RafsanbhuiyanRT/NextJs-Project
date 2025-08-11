const baseUrl = "http://localhost:5274/api";

export const getAllEvents = async (query) => {
  try {
    const response = await fetch(
      `${baseUrl}/Event/GetAllEvents?query=${query ?? ""}`
    );

    return await response.json();
  } catch (e) {
    console.log("Fetch error-->", e.message);
  }
};

export const getEventById = async (eventId) => {
  try {
    const response = await fetch(`${baseUrl}/Event/GetEventById?id=${eventId}`);
    return await response.json();
  } catch (e) {
    console.log("Fetch error-->", e.message);
  }
};

export const updateInterested = async (eventId, userId) => {
  try {
    const response = await fetch(`${baseUrl}/Event/UpdateInterested`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        userId,
      }),
    });

    return await response.json();
  } catch (e) {
    console.log("Fetch error-->", e.message);
  }
};

export const updateParticipants = async (eventId, userId) => {
  console.log("Update databse---", eventId, userId);
  try {
    const response = await fetch(`${baseUrl}/Event/UpdateParticipants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        userId,
      }),
    });
    return await response.json();
  } catch (e) {
    console.log(e.message);
  }
};
