import { ReactElement } from "react";
import { GetStaticProps } from "next";

import { Box, SimpleGrid, Grid, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import Link from "next/link";
import { GetRoomsDocument, useGetRoomsQuery } from "../generated";

import { initializeApollo } from "../lib/apolloClient";
import { CardVertical } from "../components";

export interface PageProps {
  data: Record<string, unknown>;
}

const IndexPage = (props: PageProps): ReactElement => {
  const { loading, data, error } = useGetRoomsQuery();
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  const {
    getRooms: { rooms, error: serverError },
  } = data;
  if (serverError) return <div> {serverError}</div>;

  return (
    <SimpleGrid w="100%" minChildWidth="320px" spacing={6}>
      {rooms.map((room) => (
        <Link key={room.id} href={`/rooms/${room.id}`}>
          <a>
            <CardVertical room={room} />
          </a>
        </Link>
      ))}
    </SimpleGrid>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: GetRoomsDocument,
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default IndexPage;
