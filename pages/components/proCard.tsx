import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  useBoolean,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBed, FaBath, FaBorderAll } from "react-icons/fa";
import React, { Component, ReactDOM, useEffect, useState } from "react";
import router from "next/router";
import { supabase } from "../../utils/supabaseClient";

export default function ProRentCard({
  amount,
  location,
  type,
  title,
  bed,
  bath,
  area,
  image,
  post_id,
  phone,
  children,
}) {
  var isBooked: boolean;
  const [bookId, setId] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    getReview();
  },);

  const PostDelete = async (post_id: any) => {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("post_id", post_id);
  };

  const getReview = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("review")
      .eq("post_id", post_id)
      .single();
    if (error) throw error;

    if (data) {
      setReview(data.review);
      console.log(review);
    }
  };
  const Approve = async () => {
    const { data, error } = await supabase
      .from("posts")
      .update([{ review: 'true' }])
      .eq("post_id", post_id);
    if (error) throw error;
  };
  return (
    <Center>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={"70%"}
        height={"100%"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"lg"}
        padding={4}
      >
        <Center
          py={6}
          as={"button"}
          onClick={() => {
            router.push({
              pathname: "/components/rentDetails",
              query: post_id,
            });
          }}
        >
          <Stack
            borderWidth="1px"
            borderRadius="lg"
            w={"100%"}
            height={"45vh"}
            direction={{ base: "column", md: "row" }}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"lg"}
            padding={4}
          >
            <Flex flex={1} bg="blue.200" borderRadius={"lg"}>
              <Image
                objectFit="cover"
                boxSize="100%"
                borderRadius={"lg"}
                src={image}
              />
            </Flex>
            <Stack
              flex={1}
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
              p={1}
              pl={10}
            >
              <Stack direction="row" alignItems="baseline">
                <Text
                  fontSize="18"
                  fontWeight="bold"
                  textAlign={"match-parent"}
                >
                  BDT
                </Text>
                <Text fontSize="40" fontWeight="bold">
                  {amount}
                </Text>
              </Stack>
              <Text>{location}</Text>
              <Badge>{type}</Badge>
              <Heading
                fontSize={20}
                overflow={"hidden"}
                orientation={"horizontal"}
                noOfLines={1}
              >
                {title}
              </Heading>
              <HStack spacing={7} pt={3} alignItems={"baseline"}>
                <HStack>
                  <FaBed size={20} />
                  <Text>{bed}</Text>
                </HStack>
                <HStack>
                  <FaBath size={20} />
                  <Text>{bath}</Text>
                </HStack>
                <HStack>
                  <FaBorderAll size={20} />
                  <Text>{area}</Text>
                </HStack>
              </HStack>
              <Flex
                justifyContent={"flex-end"}
                flexDirection={"column"}
                flex={1}
              >
                <HStack py={4} justifyContent={"start"}>
                  {children}
                </HStack>
              </Flex>
            </Stack>
          </Stack>
        </Center>
        <Center>
          {review === "true" ? (
            <Button
              w={"100%"}
              fontSize={"sm"}
              fontWeight={400}
              color="white"
              variant={"solid"}
              bg="green.400"
              style={{
                fontWeight: "bold",
              }}
            >
              Approved
            </Button>
          ) : (
            <Stack direction={"row"} flex={1}>
              <Button
                w={"100%"}
                fontSize={"sm"}
                fontWeight={400}
                color="white"
                variant={"solid"}
                bg="gray.200"
                textColor={"black"}
                style={{
                  fontWeight: "bold",
                }}
                _hover={{
                  bg: "green.400",
                  textColor: "white",
                }}
                onClick={() => {
                  Approve();
                  
                }}
              >
                Approved
              </Button>
              <Button
                w={"100%"}
                fontSize={"sm"}
                fontWeight={400}
                color="white"
                variant={"solid"}
                bg="gray.200"
                textColor={"black"}
                style={{
                  fontWeight: "bold",
                }}
                _hover={{
                  bg: "red.400",
                  textColor: "white",
                }}
                onClick={() => {
                  PostDelete(post_id);
                  window.location.reload();
                }}
              >
                Reject
              </Button>
            </Stack>
          )}
        </Center>
      </Stack>
    </Center>
  );
}
