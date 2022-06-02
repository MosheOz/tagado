import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select, SelectChangeEvent } from "@mui/material";
import { displaySelected, getData } from "../utils/get-data.util";
import { DataRes } from "../types/res.interface";

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
        {displaySelected(fetchedValues).map(
          (t: { name: string; id: string }, i: number) => (
            <div key={i}>{t.name}</div>
          )
        )}
      </Box>
    </div>
  );
};

export default Display;
