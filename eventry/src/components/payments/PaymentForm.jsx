"use client";
import { addGoingEvent } from "@/action";
import { useAuth } from "@/hooks/useAuth";

export default function PaymentForm({ eventId }) {
  const { auth } = useAuth();
  return (
    <form
      action={() => addGoingEvent(eventId, auth)}
      className="max-w-lg mx-auto p-8 bg-[#1F1F1F] text-white rounded-xl shadow-lg border border-[#333]"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Secure Payment</h2>

      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-1 text-sm font-medium text-gray-300"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your full name"
          className="w-full bg-[#27292F] text-sm text-white border border-[#CCCCCC]/20 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-1 text-sm font-medium text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@email.com"
          className="w-full bg-[#27292F] text-sm text-white border border-[#CCCCCC]/20 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="cardNumber"
          className="block mb-1 text-sm font-medium text-gray-300"
        >
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="XXXX XXXX XXXX XXXX"
          className="w-full bg-[#27292F] text-sm text-white border border-[#CCCCCC]/20 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label
            htmlFor="expiry"
            className="block mb-1 text-sm font-medium text-gray-300"
          >
            Expiry Date
          </label>
          <input
            type="text"
            id="expiry"
            name="expiry"
            placeholder="MM/YY"
            className="w-full bg-[#27292F] text-sm text-white border border-[#CCCCCC]/20 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div>
          <label
            htmlFor="cvv"
            className="block mb-1 text-sm font-medium text-gray-300"
          >
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            placeholder="123"
            className="w-full bg-[#27292F] text-sm text-white border border-[#CCCCCC]/20 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 py-3 rounded-md text-white font-semibold text-sm tracking-wide shadow-md hover:shadow-lg"
      >
        Pay Now
      </button>
    </form>
  );
}
