import Stripe from "stripe";
import Product from "./components/product";

const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });
  const products = await stripe.products.list();
  // console.log(products);
  const productWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id });
      const features = product.metadata.features || "No text found" //Exact features from metadata
      return {
        id: product.id,
        name: product.name,
        unit_amount: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency,
        description: product.description,
        metadata: { features },
      };
    }) 
  );
  return productWithPrices;
};

export default async function Home() {
  const products = await getProducts();
  console.log(products);
  return (
    <main className="grid grid-cols-fluid gap-12">
      {products.map((product) => (
        <Product {...product} key={product.id} />
      ))}
    </main>
  );
}

// {...product} are all props sent from product component
