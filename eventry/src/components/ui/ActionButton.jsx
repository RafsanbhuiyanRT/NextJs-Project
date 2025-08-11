"use client";
import { AddInterestedEvent } from "@/action";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function ActionButton({
  eventId,
  interestedUserId,
  goingUserIds,
  fromDetails,
}) {
  const { auth } = useAuth();
  const router = useRouter();

  const isInterested = interestedUserId?.find((x) => x.userId === auth?.id);
  const isGoing = goingUserIds?.find((x) => x.userId === auth?.id);

  const [interested, setInterested] = useState(isInterested);
  const [going, setGoing] = useState(isGoing);
  const [isPending, startTransition] = useTransition();

  const toggleInterest = async () => {
    if (auth?.id) {
      await AddInterestedEvent(eventId, auth?.id);
      setInterested(!interested);
    } else {
      router.push("/login");
    }
  };

  const markGoing = () => {
    if (auth?.id) {
      router.push(`/payment/${eventId}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
      <button
        onClick={toggleInterest}
        className={`w-full py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer transition-colors active:translate-y-1 ${
          interested
            ? "bg-indigo-600 hover:bg-indigo-800"
            : "bg-[#464849] hover:bg-[#3C3D3D]"
        }`}
      >
        Interested
      </button>

      <button
        disabled={auth && going}
        onClick={markGoing}
        className={`w-full text-center ${
          isGoing ? "bg-[#067419]" : "bg-[#464849]"
        }  py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1`}
      >
        Going
      </button>
    </div>
  );
}
