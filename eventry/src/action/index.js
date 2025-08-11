"use server";

import { createUser, loginUser } from "@/lib/auth-info";
import { getEventById, updateInterested } from "@/lib/event-info";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

export async function registerFormAction(formData) {
  const user = Object.fromEntries(formData.entries());
  const cleanUser = Object.fromEntries(
    Object.entries(user).filter(([key]) => !key.startsWith("$ACTION_ID"))
  );
  const created = await createUser(cleanUser);
  redirect("/login");
}

export async function loginFormAction(formData) {
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const data = loginUser(credential);
    return await data;
  } catch (err) {
    throw err;
  }
}

export async function AddInterestedEvent(eventId, userId) {
  try {
    await updateInterested(eventId, userId);
  } catch (err) {
    throw err;
  }
  revalidatePath("/");
}

export async function addGoingEvent(eventId, auth) {
  try {
    await updateParticipants(eventId, auth?.id);
    await sendEmail(eventId, auth);
  } catch (err) {
    console.log(err.message);
  }
  revalidatePath("/");
  redirect("/");
}

export async function sendEmail(eventId, auth) {
  if (!auth?.email) throw new Error("No recipient email provided");
  if (!process.env.RESEND_API_KEY) throw new Error("Missing Resend API key");

  try {
    const event = await getEventById(eventId);
    if (!event) throw new Error("Event not found");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const message = `Dear ${auth?.name}, you have been successfully registered for the event, 
    ${event?.name}. Please carry this email and your official ID to the venue. 
    We are excited to have you here.`;

    const sent = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: auth.email,
      subject: "Successfully Registered for the event!",
      html: `<p>${message}</p>`,
    });

    return sent;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}
