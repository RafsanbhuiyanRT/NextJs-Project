export async function GET() {
  console.log("RESEND_API_KEY from server:", process.env.RESEND_API_KEY);

  return Response.json({
    keyExists: !!process.env.RESEND_API_KEY,
  });
}
