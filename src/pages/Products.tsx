import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "../interfaces";
import ProductSkeleton from "../components/ProductSkeleton";
const Products = () => {
  const getProductsList = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products?populate=images,thumbnail`
    );
    return data;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsList,
  });

  if (isLoading)
    return (
      <div>
        <Grid
          margin={30}
          templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
          gap={6}
        >
          {Array.from({ length: 20 }, (_, idx) => (
            <ProductSkeleton key={idx} />
          ))}
        </Grid>
      </div>
    );

  return (
    <Grid
      margin={30}
      templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
      gap={6}
    >
      {data.data?.map((product: IProduct) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default Products;
