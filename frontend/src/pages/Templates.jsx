// Responsiveness Shortcut
const breakpoints = {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  };

  return (
    <Stack direction={["column", "row"]} spacing="24px">
    <Box w={["100%", "50%", "25%"]} h="200px" bg="blue.500" />
    <Box w={["100%", "50%", "75%"]} h="200px" bg="red.500" />
  </Stack>
    );



// Flex in Center 

    <Flex justify="center"  >

    <Box width="80%" borderWidth="1px" borderRadius="lg" p={4} bg="gray.100">
       

<Grid
  templateColumns={{
    base: "1fr",
    sm: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(4, 1fr)",
  }}
  gap={6}
>
  <GridItem bg="blue.500" h="200px" />
  <GridItem bg="red.500" h="200px" />
  <GridItem bg="green.500" h="200px" />
  <GridItem bg="purple.500" h="200px" />
</Grid>
</Box>
</Flex>


//Conditional links position ---
const [isLargerThan768] = useMediaQuery("(min-width: 768px)");


<Box bg="blue.500" color="white" py={4}>
    <Container maxW="container.lg">
      <Flex align="center" justify="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          My Logo
        </Text>
        {isLargerThan768 ? (
          <HStack spacing={8}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </HStack>
        ) : (
          <IconButton
            icon={<HamburgerIcon />}
            aria-label="Open menu"
          />
        )}
      </Flex>
    </Container>
  </Box>