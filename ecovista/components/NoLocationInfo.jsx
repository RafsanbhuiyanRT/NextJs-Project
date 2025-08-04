import Image from "next/image";
import Link from "next/link";
import Card from "./Card";

export default function NoLocationInfo() {
  return (
    <Card>
      <div className="items-center">
        <Image
          src="/no-location.png"
          alt="LocationNotFound"
          height={300}
          width={300}
        />
        <div className="text-3xl items-center justify-center">
          Location Not Found
        </div>
        <Link href={`http://localhost:3000/`}>
          <p className="text-sm text-blue-300">current location</p>
        </Link>
      </div>
    </Card>
  );
}
