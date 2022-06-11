import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import { validateValues } from "./validate.helper";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const style = {
  maxWidth: 350,
  minWidth: 120,
  width: "100%",
  margin: "5px 0px",
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Create = () => {
  const [open, setOpen] = React.useState(false);
  const [inputFields, setInputFields] = useState<{ [key: string]: string }[]>([
    { name: "" },
  ]);
  const [typeField, setTypeField] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTypeField(event.target.value as string);
  };

  const addItem = () => {
    if (!validateValues(typeField, inputFields)) return;

    (async () => {
      try {
        const rawResponse = await fetch("http://localhost:5000/add-type", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: typeField, values: inputFields }),
        });
        const newItems = await rawResponse.json();
        setMessage("Succesfully Added");

        setOpen(true);
      } catch (err) {
        alert(err);
      }
    })();
  };

  const handleFormChange = (
    index: number,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = { name: "" };
    setInputFields([...inputFields, newfield]);
  };

  return (
    <>
      <Grid
        container
        spacing={8}
        direction="row"
        justifyContent="center"
        alignItems="center"
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs>
          <Box sx={style}>
            <TextField
              label="Type"
              multiline
              maxRows={4}
              value={typeField}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />
          </Box>
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          style={{ margin: "0px 15px" }}
        ></Divider>
        <Grid item xs>
          <form
            style={{
              height: 200,
              overflow: "scroll",
              display: "flex",
              flexDirection: "column",
              marginBottom: 15,
            }}
          >
            {inputFields.map((input, index) => {
              return (
                <div key={index}>
                  <TextField
                    sx={{ marginBottom: 1 }}
                    name="name"
                    label="Type value"
                    maxRows={4}
                    value={input.value}
                    onChange={(
                      event: React.ChangeEvent<
                        HTMLTextAreaElement | HTMLInputElement
                      >
                    ) => handleFormChange(index, event)}
                  />
                </div>
              );
            })}
          </form>

          <AddBoxIcon
            onClick={addFields}
            style={{ cursor: "pointer", marginTop: 10 }}
          />
          <Button
            variant="contained"
            onClick={addItem}
            style={{ width: "100%" }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Create;
