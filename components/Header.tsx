import { ReactElement } from "react";
import { useReactiveVar } from "@apollo/client";
import NextLink from "next/link";
import { Link, Stack, HStack, StackProps, Text, Box } from "@chakra-ui/react";

import { isLoggedInVar } from "../lib/cache";
import { LayoutContainer } from "./Layout";
import { AlgoliaSearch } from "./Algolia/AlgoliaSearch";
import { AccountMenu } from "./index";
import { AuthModal } from "./Auth/AuthModal";

export const Header = (props: StackProps): ReactElement => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <LayoutContainer shadow="lg">
      <HStack py={4} justify="space-between" {...props}>
        <HStack justify="space-around" flex={1}>
          <NextLink href="/">
            <a>
              <Text px={4}>Bummer</Text>
            </a>
          </NextLink>
          <Box w="60%">
            <AlgoliaSearch />
          </Box>
        </HStack>

        <Stack direction="row" align="center" spacing={8} fontWeight="bold">
          <NextLink href="#">
            <Link>Booking</Link>
          </NextLink>
          <NextLink href="#">
            <Link>Saved</Link>
          </NextLink>
          {isLoggedIn ? <AccountMenu /> : <AuthModal />}
        </Stack>
      </HStack>
    </LayoutContainer>
  );
};
