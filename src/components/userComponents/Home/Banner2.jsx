import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const Achievement = () => {
  return (
    <>
      <Box sx={{backgroundColor:'#F0E9FF',height:{xs:970,sm:500,md:270},width:'100%'}}>
        <Box display={"flex"}justifyContent={"center"} sx={{flexWrap:{xs:'wrap',md:'unset'}}} >
      <Card sx={{height:200,mt:4,ml:3,borderRadius:6 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{fontSize:50,color:'#FD810F',fontWeight:700}} >
        5+
        </Typography>
        <Typography variant="body2"  sx={{fontSize:25,fontWeight:700}}>
        Years with you
        </Typography>
      </CardContent>
    </Card>
    <Card sx={{height:200,mt:4,ml:{xs:3},mr:{xs:0,sm:3},borderRadius:6,width:220}}>
      <CardContent>
        <Typography variant="h5" component="div"  sx={{fontSize:50,color:'#FD810F',fontWeight:700}}>
        100+
        </Typography>
        <Typography variant="body2"   sx={{fontSize:25,fontWeight:700}}>
        Awards
        </Typography>
      </CardContent>
    </Card>
    <Card sx={{height:200,mt:4,ml:{xs:3},borderRadius:6,width:220}}>
      <CardContent>
        <Typography variant="h5" component="div"  sx={{fontSize:50,color:'#FD810F',fontWeight:700}}>
        100+
        </Typography>
        <Typography variant="body2"  sx={{fontSize:25,fontWeight:700}}>
        Doctors
        </Typography>
      </CardContent>
    </Card>
    <Card sx={{height:200,mt:4,ml:{xs:3},mr:{xs:0,sm:3},borderRadius:6}}>
      <CardContent>
        <Typography variant="h5" component="div"  sx={{fontSize:50,color:'#FD810F',fontWeight:700}}>
        1000+
        </Typography>
        <Typography variant="body2"  sx={{fontSize:25,fontWeight:700}}>
        Satisfied Patients
        </Typography>
      </CardContent>
    </Card>
        </Box>
      </Box>
    </>
  );
};

export default Achievement;