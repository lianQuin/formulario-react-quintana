import { Container, Box, Heading } from "@chakra-ui/react";
import React from "react";

const Header = () => {
  return (
    <Box as="header" position="sticky" w="full">
      <Container justifyContent="center" maxW="500px"textAlign="center">
        <Heading  textAlign="center">Trabajo Práctico N°6</Heading>
      </Container>
    </Box>
  );
};

export default Header;
