import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin, userLogin } from "../app/features/LoginSlice";
import { AppDispatch } from "../app/store";
import { useNavigate } from "react-router-dom";
import CookieServices from "../services/CookieServices";

interface LoginPageProps {
  isAuthenticated: boolean;
}

export default function LoginPage({ isAuthenticated }: LoginPageProps) {
  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector(selectLogin);

  //navigation protected route
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  useEffect(() => {
    // Check if authenticated and redirect to home
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]); //handlers

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!user.identifier && !user.password) {
      setIsEmail(true);
      setIsPassword(true);
      return;
    }
    if (!user.identifier) {
      setIsEmail(true);
      return;
    }
    if (!user.password) {
      setIsPassword(true);
      return;
    }
    setIsEmail(false);
    setIsPassword(false);
    await dispatch(userLogin(user));

    // Optionally, you can also manually check the presence of the token in the cookie
    const token = CookieServices.get("jwt");
    if (token) {
      navigate("/", { replace: true });
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack
          as={"form"}
          spacing={4}
          w={"full"}
          maxW={"md"}
          onSubmit={handleSubmit}
        >
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              value={user.identifier}
              type="email"
              onChange={onChangeHandler}
              name="identifier"
              isInvalid={isEmail}
            />
            {isEmail ? (
              <FormHelperText color={"orangered"}>
                Email is required
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                value={user.password}
                type={showPassword ? "text" : "password"}
                onChange={onChangeHandler}
                name="password"
                isInvalid={isPassword}
              />

              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {isPassword ? (
              <FormHelperText color={"orangered"}>
                Password is required
              </FormHelperText>
            ) : null}
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Text color={"blue.500"}>Forgot password?</Text>
            </Stack>
            <Button
              type="submit"
              colorScheme={"blue"}
              variant={"solid"}
              isLoading={loading}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
