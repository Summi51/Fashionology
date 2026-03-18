import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Nav from "../../pages/AdminNavbar";
import AdminSidebar from "../../pages/AdminSidebar/AdminSidebar";

//https://sleepy-erin-sheep.cyclic.app/users/all

  const UsersAdmin = ({ _id, fnc}) => {
  const [user, setUser] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData")) || {};

  const getUser = () => {
    axios
      .get(`https://fashionology-omega.vercel.app/users/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        setUser(res.data || []);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  //https://sleepy-erin-sheep.cyclic.app/users/delete/${id}

const handleDelete = (id) => {
  axios
    .delete(`https://fashionology-omega.vercel.app/users/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    })
    .then((res) => {
      getUser();
      if (typeof fnc === "function") fnc();
    })
    .catch((err) => console.log(err));
};
  return (
    <DIVUP>
      <Nav />

      <DivMain>
        <DIVSide>
          <AdminSidebar />
        </DIVSide>
        <DIVUser>
          <h1
            style={{
              textAlign: "center",
              color: "#430707",
              fontWeight: "bold",
              fontSize: "30px",
              margin:'20px 20px',
            }}
          >
            Users Details
          </h1>
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Role</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {user.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "24px 0" }}>
                      No users found
                    </td>
                  </tr>
                )}
                {user.map((el) => (
                  <tr key={el._id}>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td className="muted">{el.password}</td>
                    <td>{el.role}</td>
                    <td className="wrap">{el.address}</td>
                    <td>{el.phoneNumber}</td>
                    <td>
                      <DeleteButton onClick={() => handleDelete(el._id)}>Delete</DeleteButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </TableWrapper>
        </DIVUser>
      </DivMain>
    </DIVUP>
  );
};

export default UsersAdmin;

const DIVUP = styled.div``;

const DivMain = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const DIVSide = styled.div`
  margin-right: 20px;
  flex: 0 0 220px;
  max-width: 260px;
`;

const DIVUser = styled.div`
  margin-bottom: 20px;
  flex: 1 1 0;
  min-width: 0; /* allow children to shrink */
`;


const TableWrapper = styled.div`
  background: #f3f3f3;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(67,7,7,0.06);
  margin: 0 20px 40px 20px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    padding: 12px;
    margin: 0 12px 28px 12px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;

  thead th {
    background: #a3a0e2; /* softer accent replacing pink */
    color: #430707;
    font-weight: 700;
    padding: 12px 16px;
    text-align: left;
    position: sticky;
    top: 0;
    z-index: 2;
  }

  tbody td {
    background: #e9e9e9;
    padding: 10px 14px;
    vertical-align: middle;
    color: #222;
    font-size: 0.95rem;
  }

  tbody tr:nth-child(even) td {
    background: #f6f6f6;
  }

  tbody tr:hover td {
    background: #fff6f6;
  }

  td.wrap {
    max-width: 220px;
    white-space: pre-wrap;
    word-break: break-word;
  }

  td.muted {
    color: #6b6b6b;
    font-size: 0.92rem;
  }

  @media (max-width: 768px) {
    thead th {
      padding: 10px 8px;
      font-size: 0.95rem;
      position: static;
    }

    tbody td {
      padding: 8px 8px;
      font-size: 0.92rem;
    }

    td.wrap {
      max-width: 160px;
    }
  }
`;

const DeleteButton = styled.button`
  background: transparent;
  border: 1px solid #d9534f;
  color: #d9534f;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 120ms ease-in;

  &:hover {
    background: #d9534f;
    color: #fff;
    box-shadow: 0 4px 12px rgba(217,83,79,0.18);
    transform: translateY(-1px);
  }

  @media (max-width: 420px) {
    padding: 6px 8px;
    font-size: 0.9rem;
  }
`;
