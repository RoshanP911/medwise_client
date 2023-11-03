import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { departmentList } from "../../services/APIs.js";
import Loader from "../Loader.jsx";

const DepartmentListContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;

  @media (max-width: 768px) {
    margin: 10px;
    padding: 10px;
  }
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.button`
  background-color: ${(props) => (props.active ? "#1959FD" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border: 1px solid #ddd;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
`;

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];
  const [isLoading, setIsLoading] = useState(true);


  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <Loader />;
  }


  return (
    <PaginationContainer>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={number === currentPage ? "active" : ""}>
            <PageNumber
              active={number === currentPage}
              onClick={() => paginate(number)}
            >
              {number}
            </PageNumber>
          </li>
        ))}
      </ul>
    </PaginationContainer>
  );
};

const DepartmentList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await departmentList();
        if (response.data.success) {
          setUsers(response.data.departmentData);
        } else {
          console.error("API request failed with:", response.data.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, [refresh]);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <DepartmentListContainer>
        <h1>Departments List</h1>
        <Link to={"/admin/add-department"} style={{ textDecoration: "none" }}>
          <Typography
            sx={{ color: "#1959FD", cursor: "pointer" }}
            variant="h6"
            component="div"
          >
            Add Department
          </Typography>
        </Link>

        <div>
          <SearchBar
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <Table>
          <thead>
            <tr>
              <TableHeader>Image</TableHeader>
              <TableHeader>Name</TableHeader>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img
                    src={user.image}
                    alt={user.name}
                    width="100"
                    height="100"
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredUsers.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </DepartmentListContainer>
    </>
  );
};

export default DepartmentList;
