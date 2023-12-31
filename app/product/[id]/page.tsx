import Image from "next/image";
import { SearchParamType } from "@/types/searchParamTypes";
import formatPrice from "@/util/PriceFormat";
import AddCart from "./AddCart";

export default async function Product({ searchParams }: SearchParamType) {
  console.log(searchParams);
  return (
    <div className="flex justify-between flex-col lg:gap-24 md:gap-12 sm:gap-4  lg:flex-row">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={700}
        height={700}
        className="w-fit rounded-lg "
        priority={true}
      />
      <div className="font-medium">
        <h1 className="text-2xl  py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <div className="flex gap-2">
          <p className="font-bold text-accent">
            {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
}
