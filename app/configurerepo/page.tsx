"use client";

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';

const Page = () => {
  const [catalogName, setCatalogName] = useState('');
  const [description, setDescription] = useState('');
  const [repository, setRepository] = useState('');
  const [bucketName, setBucketName] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [secret, setSecret] = useState('');
  const [step, setStep] = useState(1);
  const toast = useToast();

  const catalogNames = ['Wireless', 'Catalog A', 'Catalog B']; // Replace with actual catalog names
  const repositories = ['AWS', 'Azure', 'Box'];

  const handleCatalogSubmit = async () => {
  if (!catalogName || !description) {
    toast({
      title: 'Error',
      description: 'Please fill out all fields.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
    return;
  }

  try {
    const response = await fetch('https://docquest.cogniai.com/api/addCatalog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ catalog_name: catalogName, description }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to add catalog');
    }

    toast({
      title: 'Success',
      description: 'Catalog added successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setStep(2); // Move to the repository configuration step
  } catch (err) {
    toast({
      title: 'Error',
      description: (err as Error).message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  }
};

const handleRepositorySubmit = async () => {
  if (!repository || !bucketName || !accessKey || !secret) {
    toast({
      title: 'Error',
      description: 'Please fill out all fields.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
    return;
  }

  try {
    const response = await fetch('https://docquest.cogniai.com/api/configRepo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        catalog_name: catalogName,
        repository,
        bucket_name: bucketName,
        access_key: accessKey,
        secret,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to configure repository');
    }

    toast({
      title: 'Success',
      description: 'Repository configured successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    // Reset form state
    setCatalogName('');
    setRepository('');
    setBucketName('');
    setAccessKey('');
    setSecret('');
    setStep(1); // Move back to the catalog step if needed
  } catch (err) {
    toast({
      title: 'Error',
      description: (err as Error).message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  }
};


  return (
    <Box p={40}>
      {step === 1 && (
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl" fontWeight="bold">
            Add A Catalog
          </Text>
          <FormControl id="catalog-name" isRequired>
            <FormLabel>Catalog Name</FormLabel>
            <Input
              placeholder="Enter catalog name"
              value={catalogName}
              onChange={(e) => setCatalogName(e.target.value)}
            />
          </FormControl>
          <FormControl id="description" isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleCatalogSubmit}>
            Add Catalog
          </Button>
        </VStack>
      )}

      {step === 2 && (
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl" fontWeight="bold">
            Configure Repository
          </Text>
          <FormControl id="catalog-name" isRequired>
            <FormLabel>Catalog Name</FormLabel>
            <Select
              placeholder="Select catalog"
              value={catalogName}
              onChange={(e) => setCatalogName(e.target.value)}
            >
              {catalogNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="repository" isRequired>
            <FormLabel>Choose a Repository</FormLabel>
            <Select
              placeholder="Select repository"
              value={repository}
              onChange={(e) => setRepository(e.target.value)}
            >
              {repositories.map((repo) => (
                <option key={repo} value={repo}>
                  {repo}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="bucket-name" isRequired>
            <FormLabel>Bucket Name</FormLabel>
            <Input
              placeholder="Enter bucket name"
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
            />
          </FormControl>
          <FormControl id="access-key" isRequired>
            <FormLabel>Access Key</FormLabel>
            <Input
              placeholder="Enter access key"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
            />
          </FormControl>
          <FormControl id="secret" isRequired>
            <FormLabel>Secret</FormLabel>
            <Input
              placeholder="Enter secret"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleRepositorySubmit}>
            Configure Repository
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Page;
