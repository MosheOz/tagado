import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select, SelectChangeEvent } from "@mui/material";
import { displaySelected, getData } from "../utils/get-data.util";
import { DataRes } from "../types/res.interface";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const style = {
  maxWidth: 350,
  minWidth: 120,
  width: "100%",
  margin: "5px 0px",
};

const Display = () => {
  const [type, setType] = React.useState<string>("");
  const [fetchedData, setFetchedData] = React.useState<DataRes[]>([]);
  const [fetchedValues, setFetchedValues] = React.useState<DataRes[]>([]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  useEffect(() => {
    const fetchData = async () => {
      let data = await getData("http://localhost:5000/types");
      setFetchedData(data.map((t: DataRes) => ({ type: t.type, id: t._id })));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!type) return;
    const fetchData = async () => {
      let typeId = fetchedData?.find((d) => d.type === type);
      let data = await getData(`http://localhost:5000/values/${typeId?.id}`);
      setFetchedValues(data);
    };
    fetchData();
  }, [type]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  const labels = Object.keys(fetchedValues);

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: Object.values(fetchedValues),
        backgroundColor: Object.values(fetchedValues).map(
          (v) => "#" + Math.floor(Math.random() * 16777215).toString(16) + "33"
        ),
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={style}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={handleSelectChange}
          >
            {fetchedData?.map((c, i) => (
              <MenuItem value={c.type} key={i}>
                {c.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        {Object.values(fetchedValues).length ? (
          <>
            <Bar options={options} data={data} />
          </>
        ) : (
          ""
        )}
      </Box>
      <Box>
        <Doughnut data={data} options={options} />
      </Box>
    </div>
  );
};

export default Display;
