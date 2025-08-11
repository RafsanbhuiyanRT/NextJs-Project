import Image from "next/image";
import Link from "next/link";
import ActionButton from "../ui/ActionButton";

export default function EventCard({ event }) {
  return (
    <div className="overflow-hidden rounded-md bg-[#242526]">
      <Link href={`/details/${event?.id}`}>
        <Image
          src={event?.imageUrl}
          alt={event.name}
          height={300}
          width={500}
        />
      </Link>
      <div className="p-3">
        <Link href={`/details/${event?.id}`} className="font-bold text-lg">
          {event?.name}
        </Link>
        <p className="text-[#9C9C9C] text-sm mt-1">{event?.location}</p>
        <div className="text-[#737373] text-sm mt-1">
          <span>{event?.interestedId?.length} Interested</span>
          <span className="mx-1">|</span>
          <span>{event?.participantsId?.length} Going</span>
        </div>

        <div className="w-full flex gap-4 mt-4">
          <ActionButton
            eventId={event?.id}
            interestedUserId={event?.interestedId}
            goingUserIds={event?.participantsId}
          />
        </div>
      </div>
    </div>
  );
}
