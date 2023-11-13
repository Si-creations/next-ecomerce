export type ProductType = {
  name: string;
  image: string;
  unit_amount: number | null;
  id: string;
  description: string | null;
  quantity?: number | 1;
  metadata: MetadataType;
};

type MetadataType = {
  features: string;
};
