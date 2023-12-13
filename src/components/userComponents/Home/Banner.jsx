import { Box, Typography } from "@mui/material";
import React from "react";
import bannerImg from "../../../Assets/Female-Doctor-PNG-File.png";


const Banner = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F5FCFD",
          height: { xs: 300, sm: 350, md: 428 },
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              marginLeft: { xs: 2, sm: 5 },
              marginTop: { xs: 8, sm: 12, md: 18 },
              fontSize: { xs: 15, sm: 25, md: 30 },
              fontWeight: 600,
            }}
          >
            Consult top doctors online for any health concern
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginLeft: { xs: 2, sm: 5 },
              marginTop: 1,
              fontSize: { xs: 13, sm: 16, md: 24 },
              fontWeight: 400,
            }}
          >
            Private online consultations with verified doctors in all
            specialities
          </Typography>
        </Box>
        <Box>
          <Box
            component="img"
            sx={{
              height: 480,
              marginTop: { xs: 7.5, sm: 6.3, md: 6 },
              marginRight: { xs: 1, sm: 4, md: 6 },
              width: 450,
              maxHeight: { xs: 240, sm: 300, md: 380 },
              maxWidth: { xs: 150, sm: 220, md: 250 },
            }}
            alt="Doctor pic"
            src={bannerImg}
          />
        </Box>
      </Box>
    </>
  );
};

export default Banner;
