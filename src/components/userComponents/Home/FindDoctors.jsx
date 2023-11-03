import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Input } from "@mui/material"; // Import Button
import styled from "styled-components";
import { findDoctors } from "../../../services/APIs.js";
import Loader from "../../Loader";




const SearchBar = styled(Input)`
  margin-left:100px
`;

const FindDoctors = () => {
  const [doctor, setDoctor] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const doctorsPerPage = 5; 

  const allDoctors = async () => {
    try {
      const response = await findDoctors()
      if (response.data.success) {
        setDoctor(response.data.allDoctors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allDoctors();
  }, []);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;

  const filteredDoctors = doctor.filter((value) =>
    value.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

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
      <SearchBar
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search Doctors"
      />
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 5 }}>
        {currentDoctors.map((value) => (
          <Card
            elevation={2}
            sx={{
              width: { xs: "95%", sm: 350 },
              mt: { xs: 10 },
              maxWidth: 400,
            }}
            key={value._id}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: 5,
              }}
            >
              <Avatar
                sx={{
                  height: { xs: 120 },
                  width: { xs: 120 },
                  objectFit: "cover",
                }}
                src="https://as2.ftcdn.net/v2/jpg/02/60/04/09/1000_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Dr {value.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.qualification}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.specialisation}
                </Typography>
              </CardContent>
            </Box>
            <CardContent>
              <Box></Box>
            </CardContent>
            <CardActions>
              <Link
                to={`/book-appointment/${value._id}`}
                style={{ textDecoration: "none" }}
              >
                <Button size="small">Book Now</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Box>

    </>
  );
};

export default FindDoctors;
