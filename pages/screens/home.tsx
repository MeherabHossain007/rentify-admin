import {
  Center,
  Flex,
  Heading,
  HStack,
  VStack,
  Wrap,
  WrapItem,
  Text,
  Stack,
  Container,
} from "@chakra-ui/react";
import React, { Component, useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import Navbar from "../components/navbar";
import ProRentCard from "../components/proCard";

export default function HomePage() {
  const [type, setType] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);
  const handleClick = (title: string) => {
    setType(title);
  };
  const getPosts = async () => {
    let { data: posts, error } = await supabase.from("posts").select("*");

    if (error) throw error;

    if (posts) {
      setPosts(posts);
    }
  };
  const Post = ({ posts }) => {
    console.log(posts);
    return (
      <Flex flex={1} flexDirection={"row"}>
        <Wrap>
          {posts.map((posts) => (
            <WrapItem>
              <ProRentCard
                amount={posts.price}
                location={posts.location}
                type={posts.type}
                title={posts.name}
                bed={posts.beds}
                bath={posts.baths}
                area={posts.area}
                phone={posts.number}
                image={`https://fahabcdzxgcwuzrpykgn.supabase.co/storage/v1/object/public/avatars/${posts.image}`}
                post_id={posts.post_id}
              >
                
              </ProRentCard>
            </WrapItem>
          ))}
        </Wrap>
      </Flex>
    );
  };
  return (
    <>
      <Navbar id={undefined} />
      <VStack justify="center" pl={170} pr={170} m={10}>
        <Post posts={posts} />
      </VStack>
    </>
  );
}
