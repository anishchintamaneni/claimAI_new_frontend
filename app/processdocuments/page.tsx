"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Input,
  Select,
  HStack,
  useToast,
} from "@chakra-ui/react";

const ProcessDocumentsPage = () => {
  const defaultOneChat = ["", "user"];
  const number = [];
  for (let i = 0; i < 10000; i++) number[i] = i;
  const defaultHistory = number.map((i) => defaultOneChat);

  const [chatHistory, setChatHistory] = useState(defaultHistory);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [length, setLength] = useState(0);
  const [message, setMessage] = useState("");
  const [filesname, setFilesname] = useState([]);
  const [isUserInput, setIsUserInput] = useState(false);
  const [method, setMethod] = useState("llama3.1");
  const [collection, setSelectedCollection] = useState("DOI");
  const divRef = useRef();
  const toast = useToast();

  const isImagePath = (path) => /\.(jpg|jpeg|png|gif)$/.test(path);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };

  const handleCollectionChange = (event) => {
    setSelectedCollection(event.target.value);
  };

  const handleEnter = () => {
    const newChatHistory = [...chatHistory];
    newChatHistory[length] = [message, "user"];
    setChatHistory(newChatHistory);
    setLength(length + 1);
    setIsUserInput(true);
    setIsLoading(true);
  };

  const getAnswer = async () => {
    try {
      const response = await axios.post("https://docquest.cogniai.com/api/get-answer", {
        question: message,
        method,
        collection,
      });
      setMessage("");
      const newChatHistory = [...chatHistory];
      const { files, source } = response.data;
      if (Array.isArray(files)) {
        setFilesname(files);
      } else {
        console.error("Expected files to be an array");
      }
      if (source) {
        newChatHistory[length] = [response.data.message, source, "bot"];
      }
      setChatHistory(newChatHistory);
      setLength(length + 1);
      setIsUserInput(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isUserInput) return;
    getAnswer();
  }, [isUserInput]);

  useEffect(() => {
    divRef.current?.scrollTo({
      behavior: "smooth",
      top: divRef.current.scrollHeight,
    });
  }, [chatHistory]);

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

  const uploadFile = (e) => {
    const formData = new FormData();
    const files = e.target.files;
    if (!files.length) return;
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    formData.append("method", method);
    formData.append("collection", collection);

    setIsLoading(true);
    axios
      .post("https://docquest.cogniai.com/api/get-file-analysis", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { files, message, source } = response.data;
        if (Array.isArray(files)) {
          setFilesname(files);
        }
        const newChatHistory = [...chatHistory];
        newChatHistory[length] = [message, source || "", "bot"];
        setChatHistory(newChatHistory);
        setLength(length + 1);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setIsLoading(false);
      });
  };

  return (
    <Box bg="#ececec" h="100vh" px={8} py={10}>
      <Box mb={20}>
        <HStack justifyContent="space-between" alignItems="center">
        </HStack>
      </Box>

      <HStack spacing={10} align="flex-start" h="full">
        <VStack
          w="40%"
          spacing={10}
          bg="white"
          p={6}
          borderRadius="lg"
          boxShadow="md"
          h="full"
          overflowY="auto"
        >

          <FormControl>
            <FormLabel fontWeight="bold">Upload single File for Analysis</FormLabel>
            <Input type="file" multiple onChange={handleFileUpload} accept=".pdf,.doc,.docx,.txt" />
          </FormControl>

          <HStack spacing={8} w="full">
            <Input type="file" onChange={uploadFile} multiple />
            <Button colorScheme="purple" onClick={handleEnter} isDisabled={isLoading}>
              Send
            </Button>
          </HStack>

          <FormControl>
            <FormLabel fontWeight="bold">LLM Selection</FormLabel>
            <Select value={method} onChange={handleMethodChange}>
              <option value="llama3.1">Llama 3.1</option>
              <option value="mistral">Mistral</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="bold">Catalog Selection</FormLabel>
            <Select value={collection} onChange={handleCollectionChange}>
              <option value="DOI">DOI</option>
              <option value="OEA">OEA</option>
              <option value="APEX">APEX</option>
              <option value="WCB">WCB</option>
              <option value="COR">COR</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="bold">Files in the Selected Catalog</FormLabel>
            <Box border="1px solid #e1e1e1" p={2} borderRadius="md">
              {filesname.length > 0 ? (
                filesname.map((file, index) => <Text key={index}>{file}</Text>)
              ) : (
                <Text>Catalog documents</Text>
              )}
            </Box>
          </FormControl>
        </VStack>

        <VStack
          w="60%"
          spacing={6}
          bg="white"
          p={6}
          borderRadius="lg"
          boxShadow="md"
          h="full"
          overflowY="auto"
        >
          <Box
            border="1px solid #e1e1e1"
            p={4}
            borderRadius="md"
            h="70%"
            overflowY="auto"
            w="full"
            ref={divRef}
          >
            {chatHistory.map((i, idx) =>
              i[0] !== "" ? (
                <Box key={idx} mb={4}>
                  <Text fontWeight="bold">{i[1] === "user" ? "User" : "AI"}</Text>
                  {isImagePath(i[0]) ? (
                    <img src={i[0]} alt={i[0]} style={{ maxWidth: "100%" }} />
                  ) : (
                    <Text>{i[0]}</Text>
                  )}
                </Box>
              ) : null
            )}
            {isLoading && <Text>Loading...</Text>}
          </Box>

          <FormControl>
            <Input
              placeholder="I am here to assist you. Let me know how I can help..."
              value={message}
              onChange={handleChange}
              isDisabled={isLoading}
            />
            <Button mt={4} colorScheme="blue" onClick={handleEnter} isDisabled={isLoading}>
              Enter
            </Button>
          </FormControl>

          
        </VStack>
      </HStack>
    </Box>
  );
};

export default ProcessDocumentsPage;
