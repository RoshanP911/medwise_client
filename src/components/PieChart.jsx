import Chart from "react-apexcharts";
import { Box, Grid } from "@mui/material";

function PieChart({ confirmedCount, attendedCount, cancelledCount }) {
  const chartData = [confirmedCount, attendedCount, cancelledCount];
  const chartLabels = ["Confirmed", "Attended", "Cancelled"];

  return (
    <>
      <Box>
        <Grid container>
          <Grid width={"100%"} height={500}>
            <Chart
              type="pie"
              width={"100%"}
              height={500}
              series={chartData}
              options={{
                title: {
                  text: "Appointments Status",
                  style: { fontSize: 20 },
                },
                labels: chartLabels,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default PieChart;
