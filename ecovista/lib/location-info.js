export const getLocationData = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e.message);
  }
};

export const getLocationLatLong = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/location`);
    const data = await response.json();

    return data;
  } catch (e) {
    console.error(e.message);
  }
};

export const getResolvedLatLong = async (location, lat, lon) => {
  if (lat && lon) return { lat, lon };
  const res = await getLocationLatLong(location);

  if (res.latitude && res.longitude) {
    const lat = res.latitude;
    const lon = res.longitude;
    return { lat, lon };
  }
};
