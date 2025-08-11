import { getBlurData } from "@/utils/blur-generator";
import Image from "next/image";
import ActionButton from "../ui/ActionButton";

export default async function HeroSection({ eventInfo }) {
  const { base64 } = await getBlurData(eventInfo?.imageUrl);
  return (
    <section className="container m-[50px]">
      <div className="bg-gradient-to-b from-slate-200/20 to-slate-800/30">
        <Image
          src={eventInfo?.imageUrl}
          alt="Event 1"
          height={900}
          width={1300}
          placeholder="blur"
          blurDataURL={base64}
        />
      </div>

      <div className="flex items-end">
        <div className="flex-auto py-4">
          <h1 className="font-bold text-2xl">{eventInfo?.name}</h1>
          <p className="text-[#9C9C9C] text-base mt-1">{eventInfo?.location}</p>
          <div className="text-[#737373] text-sm mt-1">
            <span>{eventInfo?.interestedId?.length} Interested</span>
            <span className="mx-1">|</span>
            <span>{eventInfo?.participantsId?.length} Going</span>
          </div>
        </div>

        <ActionButton
          eventId={eventInfo?.id}
          interestedUserId={eventInfo?.interestedId}
          goingUserIds={eventInfo?.participantsId}
          fromDetails={true}
        />
      </div>
    </section>
  );
}
