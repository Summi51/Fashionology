import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { editProduct } from "../../Redux/productsReducers/action";
import Nav from "../../pages/AdminNavbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductAdminEdit = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editProduct(data, data._id))
      .then(() => {
        toast.success("Product updated successfully!");
      })
      .catch(() => {
        toast.error("Failed to update product!");
      });
  };

  useEffect(() => {
    axios
      .get(`https://fashionology-omega.vercel.app/products/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <PageWrapper>
      <Nav />
      <ToastContainer position="top-right" autoClose={2000} />
      <ContentWrapper>
        <FormWrapper>
          <Title>Edit Product: {id}</Title>

          <form onSubmit={handleEdit}>
            <FormGrid>
              {[
                { label: "Image URL", name: "images", type: "text" },
                { label: "Title", name: "name", type: "text" },
                { label: "Rating", name: "rating", type: "number" },
                { label: "Price", name: "price", type: "number" },
                { label: "Quantity", name: "quantity", type: "number" },
                { label: "Color", name: "color", type: "text" },
                { label: "Main Category", name: "mainCategory", type: "text" },
                { label: "Sub Category", name: "subCategory", type: "text" },
                { label: "Brand", name: "brand", type: "text" },
              ].map((field) => (
                <FormField key={field.name}>
                  <label>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={data[field.name] || ""}
                    onChange={handleChange}
                  />
                </FormField>
              ))}

              <FormField>
                <label>Sizes</label>
                <select
                  name="sizes"
                  value={data.sizes || ""}
                  onChange={handleChange}
                >
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
                  value={data.description || ""}
                  onChange={handleChange}
                  placeholder="Description"
                />
              </FormField>
            </FormGrid>

            <SubmitButton type="submit">Update Product</SubmitButton>
          </form>
        </FormWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default ProductAdminEdit;

/* ================= STYLES ================= */
const PageWrapper = styled.div`
  background: #f9f9fb;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const FormWrapper = styled.div`
  flex: 1;
  max-width: 900px;
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(163, 160, 226, 0.15);
`;

const Title = styled.h2`
  text-align: center;
  color: #a3a0e2;
  margin-bottom: 20px;
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