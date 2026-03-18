import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import styled from "styled-components";
import { getProducts } from "../../Redux/productsReducers/action";
import Nav from "../../pages/AdminNavbar";
import AdminSidebar from "../../pages/AdminSidebar/AdminSidebar";
import Productpagination from "./Productpagination";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ProductAdminCart from "./ProductAdminCart";
import "react-toastify/dist/ReactToastify.css";

const ProductAdminList = () => {
  const [ref, setRef] = useState(false);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("");

  const limit = 8;
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ initialize navigate

  const { products } = useSelector((store) => store.productsReducers);

  const userData = JSON.parse(localStorage.getItem("userData")) || {};

  useEffect(() => {
    dispatch(getProducts(page, limit, order));
  }, [ref, page, order, dispatch]);

  const updateRef = () => {
    setRef((prev) => !prev);
  };

  const paginate = (val) => {
    setPage(page + val);
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://fashionology-omega.vercel.app/products/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then(() => {
        updateRef();
        toast.success("Product deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to delete product!");
      });
  };

  // ✅ FIXED EDIT FUNCTION: Navigate to edit page
  const handleEdit = (id) => {
    // navigate(`/admin/edit/${id}`);
     navigate(`/adminedit/${id}`);
  };

  return (
    <Wrapper>
      <Nav />
      <ToastContainer position="top-right" autoClose={2000} />

      <Main>
        <Side>
          <AdminSidebar />
        </Side>

        <Content>
          <Title>Products Details</Title>

          <SelectWrapper>
            <select onChange={(e) => setOrder(e.target.value)}>
              <option value="">Sort By Price</option>
              <option value="desc">High to Low</option>
              <option value="asc">Low to High</option>
            </select>
          </SelectWrapper>

          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Brand</th>
                  <th>Stock</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: "20px" }}>
                      No products found
                    </td>
                  </tr>
                )}

                {products.map((el) => (
                  <tr key={el._id}>
                    <td>
                      <ProductImage src={el.images?.[0]} alt={el.name} />
                    </td>
                    <td>{el.name}</td>
                    <td>{el.mainCategory}</td>
                    <td>₹ {el.price}</td>
                    <td>{el.brand}</td>
                    <td>{el.quantity}</td>
                    <td>{el.rating}</td>
                    <td>
                      <ActionWrapper>
                        <EditBtn onClick={() => handleEdit(el._id)}>Edit</EditBtn>
                        <DeleteBtn onClick={() => handleDelete(el._id)}>Delete</DeleteBtn>
                      </ActionWrapper>
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </TableWrapper>

          <PaginationWrapper>
            <Productpagination page={page} paginate={paginate} />
          </PaginationWrapper>
        </Content>
      </Main>
    </Wrapper>
  );
};

export default ProductAdminList;

/* ================== STYLES ================== */
const Wrapper = styled.div`
  background: #f8f8ff;
  min-height: 100vh;
`;

const Main = styled.div`
  display: flex;
  gap: 20px;
`;

const Side = styled.div`
  flex: 0 0 240px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #a3a0e2;
  font-size: 32px;
  margin-bottom: 30px;
`;

const SelectWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;

  select {
    width: 260px;
    height: 45px;
    border-radius: 8px;
    border: 1px solid #a3a0e2;
    padding: 0 10px;
    font-size: 15px;
    cursor: pointer;
  }
`;

const TableWrapper = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(163, 160, 226, 0.15);
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead th {
    background: #a3a0e2;
    color: #222;
    padding: 14px;
    font-weight: 700;
    text-align: left;
  }

  tbody td {
    padding: 12px;
    font-size: 0.95rem;
  }

  tbody tr:nth-child(even) {
    background: #f4f3ff;
  }

  tbody tr:hover {
    background: #eceaff;
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
`;

const ActionWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const EditBtn = styled.button`
  background: transparent;
  border: 1px solid #a3a0e2;
  color: #a3a0e2;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #a3a0e2;
    color: white;
  }
`;

const DeleteBtn = styled.button`
  background: transparent;
  border: 1px solid #d9534f;
  color: #d9534f;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #d9534f;
    color: white;
  }
`;

const PaginationWrapper = styled.div`
  margin-top: 30px;
  text-align: center;

  button {
    padding: 8px 18px;
    background: #a3a0e2;
    border: none;
    color: white;
    border-radius: 6px;
    margin: 0 6px;
    cursor: pointer;
  }

  button:hover {
    background: #7d79d9;
  }
`;