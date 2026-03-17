import { Box, Button, Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import ProductCard from "../components/ProductCard";

export const Productpage = () => {

  const location = useLocation();
  const { category } = queryString.parse(location.search);

  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [order, setOrder] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const isPrevDisabled = page === 1;

  // 🔥 Main Products API
  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `https://fashionology-omega.vercel.app/products?mainCategory=${category}&limit=6&page=${page}&order=${order}&subCategory=${subCategory}&minRating=${rating}`
      )
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

  }, [category, page, order, subCategory, rating]);

  // 🔥 SubCategory API
  useEffect(() => {
    axios
      .get(
        `https://fashionology-omega.vercel.app/products?mainCategory=${category}`
      )
      .then((response) => {
        const uniqueSubCategories = [...new Set(
          response.data.map((item) => item.subCategory)
        )];

        setSubCategories(uniqueSubCategories);
      })
      .catch((error) => console.log(error));

  }, [category]);

  return (
    <>
      <Navbar />

      <Flex>

        {/* Sidebar */}
        <Flex
          direction="column"
          w="20%"
          ml="20px"
          mt="20px"
          display={{ base: "none", lg: "block" }}
        >

          {/* Price Filter */}
          <Text mt="20px" mb="20px" fontWeight="bold">
            Filter by Price
          </Text>

          <Box>
            <Box>
              <input
                type="radio"
                name="order"
                value="asc"
                checked={order === "asc"}
                onChange={(e) => setOrder(e.target.value)}
              />
              <label> Low to High</label>
            </Box>

            <Box>
              <input
                type="radio"
                name="order"
                value="desc"
                checked={order === "desc"}
                onChange={(e) => setOrder(e.target.value)}
              />
              <label> High to Low</label>
            </Box>
          </Box>

          {/* Category Filter */}
          <Text mt="30px" mb="20px" fontWeight="bold">
            Choose Category
          </Text>

          <Box>
            <Box>
              <input
                type="radio"
                name="subcategory"
                value=""
                checked={subCategory === ""}
                onChange={(e) => setSubCategory(e.target.value)}
              />
              <label> All</label>
            </Box>

            {subCategories.map((el) => (
              <Box key={el}>
                <input
                  type="radio"
                  name="subcategory"
                  value={el}
                  checked={subCategory === el}
                  onChange={(e) => setSubCategory(e.target.value)}
                />
                <label> {el}</label>
              </Box>
            ))}
          </Box>

          {/* Rating Filter */}
          <Text mt="30px" mb="20px" fontWeight="bold">
            Filter by Rating
          </Text>

          <Flex gap="10px">
            {[3.5, 4, 4.5].map((r) => (
              <Button
                key={r}
                size="sm"
                bg="#4B5666"
                color="white"
                onClick={() => setRating(r)}
              >
                {r}
              </Button>
            ))}
          </Flex>

        </Flex>

        {/* Product Grid */}
        <Flex direction="column" w="80%">

          {loading ? (
            <Spinner m="auto" size="xl" />
          ) : (
            <Grid
              templateColumns={{
                base: "repeat(1,1fr)",
                md: "repeat(2,1fr)",
                lg: "repeat(3,1fr)",
              }}
              gap={10}
              mt="60px"
            >
              {products.map((el) => (
                <ProductCard
                  key={el._id}
                  _id={el._id}
                  name={el.name}
                  images={el.images}
                  price={el.price}
                />
              ))}
            </Grid>
          )}

          {/* Pagination */}
          <Flex h="20vh" m="auto" gap="20px">

            <Button
              disabled={isPrevDisabled}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </Button>

            <Button
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>

          </Flex>

        </Flex>
      </Flex>

      <Footer />
    </>
  );
};