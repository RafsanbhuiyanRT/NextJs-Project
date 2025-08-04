import AqiComponent from "@/components/AqiComponent";
import NoLocationInfo from "@/components/NoLocationInfo";
import { getResolvedLatLong } from "@/lib/location-info";

const AqiPage = async ({
  params: { location },
  searchParams: { latitude, longitude },
}) => {
  const resolved = await getResolvedLatLong(location, latitude, longitude);

  if (resolved?.lat && resolved.lon) {
    return <AqiComponent lat={resolved.lat} lon={resolved.lon} />;
  } else {
    return <NoLocationInfo />;
  }
};

export default AqiPage;
