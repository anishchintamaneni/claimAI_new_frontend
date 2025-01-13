"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Text,
  Radio,
  RadioGroup,
  Checkbox,
  Stack,
  useToast,
  Input,
} from "@chakra-ui/react";

const ProcessDocumentsPage = () => {
  const [selectedCatalog, setSelectedCatalog] = useState("");
  const [selectedRepositories, setSelectedRepositories] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const toast = useToast();

  const catalogNames = ["Wireless", "Enforcement", "Media"]; // Replace with actual catalog names
  const repositories = ["AWS", "Azure", "Box"];

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(files);
    toast({
      title: "Files Uploaded",
      description: `${files.length} file(s) uploaded successfully.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleProcessDocuments = () => {
    if (!selectedCatalog || selectedRepositories.length === 0 || uploadedFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please select a catalog, at least one repository, and upload files.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Processing",
      description: "Your documents are being processed. Please wait...",
      status: "info",
      duration: 3000,
      isClosable: true,
    });

    // Add logic for processing documents
    console.log("Selected Catalog:", selectedCatalog);
    console.log("Selected Repositories:", selectedRepositories);
    console.log("Uploaded Files:", uploadedFiles);
  };

  const handleRepositorySelection = (repository) => {
    setSelectedRepositories((prev) =>
      prev.includes(repository)
        ? prev.filter((repo) => repo !== repository)
        : [...prev, repository]
    );
  };

  return (
    <Box p={40}>
      <VStack spacing={8} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          Process Documents
        </Text>
        <Text fontSize="sm" color="gray.500">
          Last Updated: August 05, 2024
        </Text>

        {/* Step 1: Select Catalog */}
        <Box>
          <FormControl>
            <FormLabel fontSize="lg" fontWeight="bold">
              Step 1: Select a Catalog
            </FormLabel>
            <RadioGroup
              value={selectedCatalog}
              onChange={(value) => setSelectedCatalog(value)}
            >
              <Stack direction="row" spacing={6}>
                {catalogNames.map((catalog) => (
                  <Radio
                    key={catalog}
                    value={catalog}
                    colorScheme="blue"
                    size="lg"
                  >
                    {catalog}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Step 2: Choose Repositories */}
        <Box>
          <FormControl>
            <FormLabel fontSize="lg" fontWeight="bold">
              Step 2: Choose Repositories
            </FormLabel>
            <Stack direction="row" spacing={6}>
              {repositories.map((repo) => (
                <Checkbox
                  key={repo}
                  value={repo}
                  isChecked={selectedRepositories.includes(repo)}
                  onChange={() => handleRepositorySelection(repo)}
                  colorScheme="blue"
                  size="lg"
                >
                  {repo}
                </Checkbox>
              ))}
            </Stack>
          </FormControl>
        </Box>

        {/* Step 3: Upload Files */}
        <Box>
          <FormControl>
            <FormLabel fontSize="lg" fontWeight="bold">
              Step 3: Upload Documents
            </FormLabel>
            <Input
              type="file"
              multiple
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
            />
          </FormControl>
        </Box>

        {/* Process Documents Button */}
        <Button
          colorScheme="blue"
          size="lg"
          onClick={handleProcessDocuments}
          isDisabled={
            !selectedCatalog ||
            selectedRepositories.length === 0 ||
            uploadedFiles.length === 0
          }
        >
          Process Documents
        </Button>
      </VStack>
    </Box>
  );
};

export default ProcessDocumentsPage;
