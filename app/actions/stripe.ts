"use server";

import type { Stripe } from "stripe";
import { headers } from "next/headers";
import { CURRENCY, BOOK_PRICE } from "@/config";
import { formatAmountForStripe } from "@/utils/stripe-helpers";
import { stripe } from "@/lib/stripe";

export async function createCheckoutSession(
  data: FormData,
): Promise<{ client_secret: string | null; url: string | null }> {
  const origin: string = headers().get("origin") as string;
  const quantity = Number(data.get("quantity") as string);

  const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity,
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: "Book",
          },
          unit_amount: formatAmountForStripe(BOOK_PRICE, CURRENCY),
        },
      },
    ],
    ui_mode: "hosted",
    success_url: `${origin}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout`,
  });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}