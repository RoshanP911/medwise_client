import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "#F0E9FF" }}>
        <Box sx={{ display: "flex", justifyContent: "space-around",flexWrap:'wrap' }}>
          <Box>
            <Typography
              sx={{ color: "#2e8fff", fontSize: 35, fontWeight: 500, mt: 7,mr:{xs:7.5,sm:0} }}
            >
              Medwise
            </Typography>
            <Typography
              sx={{ color: "#0D369F", fontSize: 15, fontWeight: 500 }}
            >
              Expert Care Anytime, Anywhere
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ color: "#2e8fff", fontSize: 30, fontWeight: 600, mt:{xs:3,sm:7},ml:{xs:6,sm:0} }}
            >
              Quick Links
            </Typography>
            <List component="nav" aria-label="simple list" sx={{ml:{xs:5,sm:0}}}>
              <ListItem >
                <ListItemText primary="About" />
              </ListItem>
              <ListItem >
                <ListItemText primary="Blog" />
              </ListItem>
              <ListItem >
                <ListItemText primary='Careers'/>
              </ListItem>
              <ListItem >
                <ListItemText primary='Press'/>
              </ListItem>
            </List>
          </Box>
          <Box>
          <Typography
              sx={{ color: "#2e8fff", fontSize: 30, fontWeight: 600, mt: 7 }}
            >
              Our Services
            </Typography>
            <List component="nav" aria-label="simple list">
              <ListItem >
                <ListItemText primary="General Medicine" />
              </ListItem>
              <ListItem >
                <ListItemText primary="Child Care" />
              </ListItem>
              <ListItem >
                <ListItemText primary='Mental Health'/>
              </ListItem>
              <ListItem >
                <ListItemText primary='Skin Diseases'/>
              </ListItem>
              <ListItem >
                <ListItemText primary='Lifestyle Diseases'/>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Footer;