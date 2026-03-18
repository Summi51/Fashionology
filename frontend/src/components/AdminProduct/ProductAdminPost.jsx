import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Nav from "../../pages/AdminNavbar";
import AdminSidebar from "../../pages/AdminSidebar/AdminSidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const initialState = {
  name: "",
  rating: 0,
  price: 0,
  sizes: [],
  quantity: 0,
  color: "",
  mainCategory: "",
  subCategory: "",
  images: [],
  brand: "",
  description: "",
};

const ProductAdminPost = () => {
  const [product, setProduct] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const userData = JSON.parse(localStorage.getItem("userData")) || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://fashionology-omega.vercel.app/products/add", product, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then(() => {
        toast.success("Product added successfully!");
        setProduct(initialState);
      })
      .catch((err) => console.log(err));
  };

  return (
    <PageWrapper>
      <Nav />
           <ToastContainer position="top-right" autoClose={2000} />
      <ContentWrapper>
        <Sidebar>
          <AdminSidebar />
        </Sidebar>

        <FormWrapper>
          <Title>Add New Product</Title>
          <form onSubmit={handleSubmit}>
            <FormGrid>
              {[
                { label: "Image URL", name: "images", type: "text", placeholder: "Image URL" },
                { label: "Title", name: "name", type: "text", placeholder: "Product Name" },
                { label: "Rating", name: "rating", type: "number", placeholder: "Rating" },
                { label: "Price", name: "price", type: "number", placeholder: "Price" },
                { label: "Quantity", name: "quantity", type: "number", placeholder: "Quantity" },
                { label: "Color", name: "color", type: "text", placeholder: "Color" },
                { label: "Main Category", name: "mainCategory", type: "text", placeholder: "Main Category" },
                { label: "Sub Category", name: "subCategory", type: "text", placeholder: "Sub Category" },
                { label: "Brand", name: "brand", type: "text", placeholder: "Brand" },
              ].map((field) => (
                <FormField key={field.name}>
                  <label>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={product[field.name]}
                    placeholder={field.placeholder}
                    onChange={handleChange}
                  />
                </FormField>
              ))}

              <FormField>
                <label>Sizes</label>
                <select name="sizes" value={product.sizes} onChange={handleChange}>
                  <option value="">Select Size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </FormField>

              <FormField style={{ gridColumn: "1 / -1" }}>
                <label>Description</label>
                <textarea
                  name="description"
                  value={product.description}
                  placeholder="Description"
                  onChange={handleChange}
                />
              </FormField>
            </FormGrid>

            <SubmitButton type="submit">Add Product</SubmitButton>
          </form>
        </FormWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default ProductAdminPost;

/* ================= STYLES ================= */

const PageWrapper = styled.div`
  background: #f9f9fb;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
`;

const Sidebar = styled.div`
  flex: 0 0 220px;
`;

const FormWrapper = styled.div`
  flex: 1;
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(163, 160, 226, 0.15);
`;

const Title = styled.h2`
  text-align: center;
  color: #a3a0e2;
  margin-bottom: 35px;
  font-size: 28px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-weight: 600;
    color: #333;
  }

  input,
  select,
  textarea {
    padding: 10px;
    border: 1px solid #a3a0e2;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    transition: all 0.2s;

    &:focus {
      border-color: #5b57c4;
      box-shadow: 0 0 4px #a3a0e2;
    }
  }

  textarea {
    resize: vertical;
    min-height: 90px;
  }
`;

const SubmitButton = styled.button`
  margin-top: 30px;
  padding: 14px 30px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #a3a0e2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #7d79d9;
  }
`;