import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { AddCartType } from "@/types/AddCartType";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

const calculateOrderAmount = (items: AddCartType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);
  return totalPrice;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Get user
  const userSession = await getServerSession(req, res, authOptions);
  if (!userSession?.user) {
    res.status(403).json({ message: "Not logged in" });
    return;
  }
  //Extract data from the body
  const { items, payment_intent_id } = req.body;

  //Create the order data > this is all prisma code
  const orderData = {
    user: { connect: { id: userSession.user?.id } },
    amount: calculateOrderAmount(items),
    currency: "eu",
    status: "pending",
    payment_intent_ID: payment_intent_id,
    products: {
      create: items.map((item) => ({
        name: item.name,
        description: item.description,
        unit_amount: item.unit_amount,
        quantity: item.quanity,
      })),
    },
  };

  res.status(200).json({ userSession });
  return;
  //Data necessary for the order
  //   const orderData = {
  //     user: {conect: {id:userSession.user?.id}},

  //   }
}
