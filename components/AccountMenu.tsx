import { ReactElement } from "react";
import { useApolloClient } from "@apollo/client";
import { useGetUserQuery } from "../generated";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

import { isLoggedInVar } from "../lib/cache";
import { useLoggedIn } from "../utils";

export const AccountMenu = (): ReactElement => {
  const client = useApolloClient();
  const toast = useToast();

  const { isLoggedIn, loading: loadingLogin } = useLoggedIn();
  const { data, error, loading } = useGetUserQuery();

  const logout = () => {
    client.cache.evict({ fieldName: "token" });
    client.cache.gc();
    // Remove user details from localStorage
    localStorage.removeItem("token");
    // Set the logged-in status to false
    isLoggedInVar(false);

    toast({
      title: "Successfully logged out",
      status: "success",
      duration: 4000,
    });
  };

  if (error) return <div>{JSON.stringify(error)}</div>;
  else if (!isLoggedIn) return null;
  else if (loading || loadingLogin || !data) return <div>loading</div>;

  return (
    <Box>
      <Menu placement="bottom-end">
        <MenuButton
          as={Button}
          leftIcon={
            <Avatar
              size="sm"
              name={data?.profile.user?.name}
              src={data?.profile.user?.avatar}
            />
          }
          rightIcon={<FiChevronDown />}
        >
          {data?.profile.user?.name}
        </MenuButton>
        <MenuList>
          <MenuItem>Account</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
