import { Button, Divider, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { IProduct } from "../interfaces";
import { useDispatch } from "react-redux";
import { RemoveFromCart } from "../app/features/cartSlice";

const CartDrawerItem = ({ id, attributes, itemNumber }: IProduct) => {
  const { title, price, images } = attributes;
  const imageUrl = images?.data?.[0]?.attributes?.url;
  const dispatch = useDispatch(); // Assuming useDispatch is hooked up to the Redux store

  //handlers
  const handleRemoveFromCart = () => {
    // Implement removing item from the cart
    dispatch(RemoveFromCart(id));
  };

  if (!attributes) {
    return null; // or handle the error gracefully
  }

  return (
    <>
      <Flex alignItems={"center"} mb={3} py={2}>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${imageUrl}`}
          alt="Product thumbnail"
          w={"70px"}
          rounded={"md"}
          mr={4}
          objectFit={"cover"}
        />
        <Stack>
          <Text fontSize={"small"}>{title}</Text>
          <Text color={"gray.500"} fontSize={"sm"}>
            Price: ${price.toFixed(2)}
          </Text>
          <Text color={"gray.500"} fontSize={"sm"}>
            Quantity: {itemNumber}
          </Text>
          <Button
            variant={"solid"}
            colorScheme="red"
            size="xs"
            width={"fit-content"}
            onClick={handleRemoveFromCart}
          >
            Remove
          </Button>
        </Stack>
      </Flex>
      <Divider />
    </>
  );
};

export default CartDrawerItem;
