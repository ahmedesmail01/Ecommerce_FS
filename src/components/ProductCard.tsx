import {
  Box,
  Center,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";

import { IProduct } from "../interfaces";
import { addToCart } from "../app/features/cartSlice";
import { useDispatch } from "react-redux";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, attributes, itemNumber } = product;
  const { images, description, price, title, stock } = attributes || {};
  const imageUrl =
    images?.data?.[0]?.attributes?.url || "/placeholder-image.jpg";
  const dispatch = useDispatch();

  //handlers

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        id,
        attributes: { title, price, description, images, stock },
        itemNumber,
      })
    );
  };

  return (
    <>
      <Center py={12} key={id}>
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${
                import.meta.env.VITE_SERVER_URL
              }${imageUrl})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={`${import.meta.env.VITE_SERVER_URL}${imageUrl}`}
              alt={title}
            />
          </Box>
          <Stack pt={10} align={"center"}>
            <Text
              color={"gray.500"}
              fontSize={"lg"}
              textTransform={"uppercase"}
            >
              {title.slice(0, 20)}...
            </Text>
            <Heading fontSize={"xl"} fontFamily={"body"} fontWeight={500}>
              {description.slice(0, 80)}...{" "}
            </Heading>
            <Stack direction={"row"} align={"center"}>
              <Text fontWeight={800} fontSize={"xl"}>
                ${price}
              </Text>
            </Stack>
            <Button
              onClick={addToCartHandler}
              px={4}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
            >
              Add To Cart
            </Button>
          </Stack>
        </Box>
      </Center>
    </>
  );
};

export default ProductCard;
