import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";

export const revalidate = 0;

const fetchOrders = async () => {
  const prisma = new PrismaClient();
  //Get user
  const user = await getServerSession(authOptions);
  if (!user) {
    return null;
  }
  const orders = await prisma.order.findMany({
    where: { userId: user?.user?.id, status: "complete" },
    include: {
      products: true,
    },
  });
  return orders;
};

export default async function Dashboard() {
  const orders = await fetchOrders();
  // console.log(orders);
  if (orders === null)
    return <div>You need to be logged in to view your orders</div>;
  if (orders.length === 0) {
    return (
      <div>
        <h1>No orders placed</h1>
      </div>
    );
  }
  return (
    <div>
      <h1 className="md:pl-0  text-xl font-bold mb-5 text-center">Your orders</h1>
      <div className="font-medium">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg lg:p-8  mb-8 bg-base-200 p-4">
            <h2 className="text-xs font-medium">Order reference: {order.id}</h2>
            <p className="text-xs">
              Time: {new Date(order.createDate).toString()}
            </p>
            <p className="text-xs py-2">
              Status:{" "}
              <span
                className={`${
                  order.status === "complete" ? "bg-teal-500" : "bg-orange-500"
                } text-white py-1 rounded-md px-2 mx-2 text-sm`}
              >
                {order.status}
              </span>
            </p>

            <div className="text-sm lg:flex gap-4 items-center">
              {order.products.map((product) => (
                <div className="py-2 " key={product.id}>
                  <h2 className="py-2">Products: {product.name}</h2>
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={product.image!}
                      width={45}
                      height={45}
                      alt={product.name}
                      priority={true}
                    />
                    <p>{formatPrice(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                    {/* <p>Quantity: 1</p> */}
                  </div>
                </div>
              ))}
            </div>
            <p className="font-medium ">Total: {formatPrice(order.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
