const baseUrl = "https://api.openweathermap.org/data/2.5";

export const getWeatherData = async (lat, lon) => {
  try {
    const response = await fetch(
      `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=metric`
    );
    const data = await response.json();
    return data?.weather[0];
  } catch (e) {
    console.log(e.message);
  }
};

export const getTemperatureData = async (lat, lon) => {
  try {
    const response = await fetch(
      `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=metric`
    );
    const data = await response.json();
    return data?.main;
  } catch (e) {
    console.log(e.message);
  }
};

export const getWindData = async (lat, lon) => {
  try {
    const response = await fetch(
      `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=metric`
    );
    const data = await response.json();
    return data?.wind;
  } catch (e) {
    console.log(e.message);
  }
};

export const getAqiData = async (lat, lon) => {
  try {
    const response = await fetch(
      `${baseUrl}/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
    );
    const data = await response.json();
    return data?.list[0];
  } catch (e) {
    console.error(e.message);
  }
};
