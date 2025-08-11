import EventList from "@/components/landing/EventList";
import Navbar from "@/components/Navbar";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function Home({ searchParams: { query } }) {
  return (
    <>
      <Navbar />
      <section className="container ml-[50px]">
        <Suspense key={query} fallback={<Loading />}>
          <EventList query={query} />
        </Suspense>
      </section>
    </>
  );
}
