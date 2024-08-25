export interface IProduct {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: number;
    stock: number;
    images: {
      data: Array<{
        attributes: {
          url: string;
        };
      }>;
    };
    category?: string; // Optional category property
  };
  itemNumber: number | 1;
}
