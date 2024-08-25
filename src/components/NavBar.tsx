import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import me from "../assets/Me.jpg";
import { Link, useNavigate } from "react-router-dom";
import CookieServices from "../services/CookieServices";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectCart } from "../app/features/cartSlice";
import CartDrawerItem from "./CartDrawerItem";

interface Props {
  children: React.ReactNode;
}

const NavLink = ({ children }: Props) => {
  return (
    <Box
      as={Link}
      to={`${children}`?.toLowerCase()}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Box>
  );
};

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = CookieServices.get("jwt");
  const navigate = useNavigate();
  const btnRef = useRef<HTMLButtonElement>(null); // Typed reference for the button
  const { cartProducts } = useSelector(selectCart);

  const dispatch = useDispatch();

  // Handlers
  const handleLogout = () => {
    CookieServices.remove("jwt");
    navigate("/login", { replace: true });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} width={"100%"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Box as={Link} to={"/"}>
            Logo
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <NavLink>Home</NavLink>
            <NavLink>About</NavLink>
            <NavLink>Products</NavLink>
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
                Cart {cartProducts.length}
              </Button>
              <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef} // Correctly typed button reference
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Cart Products</DrawerHeader>

                  <DrawerBody>
                    {cartProducts.length ? (
                      cartProducts.map((item) => (
                        <CartDrawerItem key={item.id} {...item} />
                      ))
                    ) : (
                      <Text fontSize="xl">Your Cart is empty</Text>
                    )}
                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button onClick={handleClearCart} colorScheme="red">
                      Clear all
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              {token ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={me} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar size={"2xl"} src={me} />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <NavLink>Login</NavLink>
              )}
            </Stack>
          </Flex>
        </Flex>
        {isOpen && (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <NavLink>Home</NavLink>
              <NavLink>About</NavLink>
              <NavLink>Products</NavLink>
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
}
