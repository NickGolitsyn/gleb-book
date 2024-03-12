"use client";
import React, { useState } from "react";
import { formatAmountForDisplay } from "@/utils/stripe-helpers";
import * as config from "@/config";
import { createCheckoutSession } from "@/app/actions/stripe";

export default function CheckoutForm(): JSX.Element {
  const [cartItems, setCartItems] = useState<number>(1);

  const handleAddToCart = (): void => {
    setCartItems(cartItems + 1);
  };

  const handleCheckout = async (): Promise<void> => {
    const data = new FormData();
    data.append("quantity", cartItems.toString());

    const { url } = await createCheckoutSession(data);
    if (url) window.location.assign(url);
  };

  return (
    <>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleCheckout}>
        Checkout {formatAmountForDisplay(config.BOOK_PRICE * cartItems, config.CURRENCY)}
      </button>
    </>
  );
}