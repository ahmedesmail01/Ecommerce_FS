import { createStandaloneToast } from "@chakra-ui/react";
import { IProduct } from "../interfaces";

const { toast } = createStandaloneToast();

export const addProductToCart = (product: IProduct, cart: IProduct[]) => {
  const exists = cart.find((item) => item.id === product.id);

  if (exists) {
    toast({
      title: "Added to Cart.",
      description:
        "you've Added this product to your cart before, the amount will be increased by one.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    return cart.map((item) =>
      item.id === product.id
        ? { ...item, itemNumber: item.itemNumber + 1 }
        : item
    );
  }

  toast({
    title: "Added to Cart.",
    description: "you Added this product to your cart.",
    status: "success",
    duration: 2000,
    isClosable: true,
  });
  return [...cart, { ...product, itemNumber: 1 }];
};
