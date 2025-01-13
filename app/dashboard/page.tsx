"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  VStack,
  Text,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  Avatar,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState({
    catalogs: [
      { name: "Wireless", numOfFiles: 15000000, desc: "aws box" },
      { name: "Enforcement", numOfFiles: 900134, desc: "box" },
      { name: "Media", numOfFiles: 159, desc: "aws" },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000); // Simulating delay
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Flex>
    );
  }

  return (
    <Box bg="#f8f9fc" minH="100vh" p={20}>
      <Flex justify="space-between" align="center" mb={20}>
        <Heading as="h1" size="lg">
          Dashboard
        </Heading>
        <Flex align="center" gap={4}>
          <Text fontSize="md" fontWeight="bold">
            {user.name}
          </Text>
          <Avatar name={user.name} />
        </Flex>
      </Flex>

      <Text mb={2} fontSize="sm" fontWeight="bold" color="gray.600">
        August 05, 2024 - Last Updated
      </Text>

      <Heading as="h2" size="md" mb={8}>
        Catalogs
      </Heading>

      <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={8}>
        {user.catalogs.map((catalog, index) => (
          <GridItem
            key={index}
            bg={index === 0 ? "#44BEE3" : index === 1 ? "#FCC24C" : "#04B2B5"}
            borderRadius="lg"
            p={6}
            color="white"
            boxShadow="lg"
          >
            <VStack align="start">
              <Text fontSize="xl" fontWeight="bold">
                {catalog.name}
              </Text>
              <Text fontSize="lg">{catalog.numOfFiles.toLocaleString()} Documents</Text>
              <Flex gap={2} mt={4}>
                {catalog.desc.split(" ").map((source, idx) => (
                  <Text key={idx} fontSize="sm" bg="white" color="black" px={2} py={1} borderRadius="md">
                    {source}
                  </Text>
                ))}
              </Flex>
            </VStack>
          </GridItem>
        ))}
      </Grid>

      <Flex justify="flex-end">
        <Button colorScheme="blue" leftIcon={<FontAwesomeIcon icon={faPlus} />}>
          Configure Catalog
        </Button>
      </Flex>
    </Box>
  );
};

export default Dashboard;
