import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Typography, Input, Button } from "@mui/material"; // Import Button
import { useDispatch } from "react-redux";
import DialogBox from "../DialogBox.jsx";
import { doctorList } from "../../services/APIs.js";
import Loader from "../Loader.jsx";

const DoctorListContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
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

const SearchBar = styled(Input)`
  margin-bottom: 20px;
`;

const ResponsiveContainer = styled.div`
  overflow-x: auto;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled(Button)`
  margin: 0 5px;
`;

const DoctorList = () => {
  const dispatch = useDispatch();

  const [doctors, setDoctors] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await doctorList();

        if (response.data.success) {
          setDoctors(response.data.doctorData);
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

  const refreshHandler = () => {
    setRefresh(!refresh);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDoctors.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


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
    <>
      <DoctorListContainer>
        <h1>Doctors List</h1>
        <SearchBar
          placeholder="Search Doctors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ResponsiveContainer>
          {currentItems.length === 0 ? (
            <Box display="flex" justifyContent="center">
              <Typography fontWeight={400} variant="h6">
                There are no doctors.
              </Typography>
            </Box>
          ) : (
            <Table>
              <thead>
                <tr>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Mobile</TableHeader>
                  <TableHeader>Specialisation</TableHeader>
                  <TableHeader>Action</TableHeader>
                  <TableHeader>Details</TableHeader>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.mobile}</TableCell>
                    <TableCell>{user.specialisation}</TableCell>

                    

                    <TableCell>
                      <DialogBox
                        refreshHandler={refreshHandler}
                        name={user.is_blocked ? "Unblock" : "Block"}
                        variant="contained"
                        col={user.is_blocked ? "success" : "error"}
                        id={user._id}
                      ></DialogBox>
                    </TableCell>
                    <TableCell>
                      <DialogBox
                        refreshHandler={refreshHandler}
                        name={"View"}
                        variant="contained"
                        col={"primary"}
                        id={user._id}
                      ></DialogBox>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </ResponsiveContainer>





        {/* <PaginationContainer>
          {currentItems.length > 0 && (
            <>
              <PaginationButton
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </PaginationButton>
              <PaginationButton
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastItem >= filteredDoctors.length}
              >
                Next
              </PaginationButton>
            </>
          )}
        </PaginationContainer> */}
      </DoctorListContainer>
    </>
  );
};

export default DoctorList;
