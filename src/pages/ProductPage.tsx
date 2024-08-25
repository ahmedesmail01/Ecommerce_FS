import React from "react";
import {
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductSkeleton from "../components/ProductSkeleton";

interface ProductData {
  data: {
    attributes: {
      title: string;
      description: string;
      price: number;
      images: {
        data: Array<{
          attributes: {
            url: string;
          };
        }>;
      };
    };
  };
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const getProduct = async (): Promise<ProductData> => {
    const { data } = await axios.get<ProductData>(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products/${id}?populate=images,thumbnail,category`
    );
    return data;
  };

  const { data, isLoading, isError } = useQuery<ProductData, Error>({
    queryKey: ["product", id],
    queryFn: getProduct,
  });

  if (isLoading)
    return (
      <Box maxW={"sm"} mx={"auto"} my={20}>
        <ProductSkeleton />
      </Box>
    );

  if (isError) return <Box>Error loading product</Box>;

  if (!data) return <Box>No product data available</Box>;

  const { attributes } = data.data;
  const { images, description, price, title } = attributes;
  const imageUrl =
    images?.data?.[0]?.attributes?.url || "/placeholder-image.jpg";

  return (
    <Box>
      <Heading as="h3" mb={2} textAlign="center">
        Product Details
      </Heading>
      <Card bg="teal" color="white" marginInline={100}>
        <CardBody display={"flex"} flexDirection={"row"} gap={6}>
          <Image
            src={`${import.meta.env.VITE_SERVER_URL}${imageUrl}`}
            alt="Product Image"
            borderRadius="lg"
            width={300}
            height={300}
            objectFit={"cover"}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{title}</Heading>
            <Text>{description}</Text>
            <Text color="white" fontSize="2xl">
              ${price?.toFixed(2)}
            </Text>
          </Stack>
        </CardBody>
        <Button
          bg="darkblue"
          colorScheme="blue"
          width={"fit-content"}
          padding={"10px , 20px"}
          margin={"20px auto"}
        >
          Add to cart
        </Button>
      </Card>
    </Box>
  );
};

export default ProductPage;
