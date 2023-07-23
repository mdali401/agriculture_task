import React, { useState, useEffect } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  Box,
  Typography,
} from "@mui/material";
import {
  storeUserInfo,
  removeUserInfo,
} from "../LocalStorageService/StorageService";
import { useNavigate, useLocation } from "react-router-dom";

const FirstPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const errorMessage = location.state?.errorMessage ? location.state?.errorMessage : ""
  
  type FormValuesType = {
    name: string;
    phone: string;
    email: string;
  };

  const [formValues, setFormValues] = useState<FormValuesType>({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    removeUserInfo();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name = "", value = "" }: { name: string; value: string } = e.target;
    const newValues: FormValuesType = {
      ...formValues,
      [name]: value,
    };
    setFormValues(() => newValues);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formValues.name && formValues.phone && formValues.email) {
      storeUserInfo(JSON.stringify(formValues));
      navigate("/second-page");
    }
  };

  return (
    <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center"
        }}
      >
        <FormGroup sx={{ gap: "1em" }}>
          <FormControl>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input name="name" onChange={handleInputChange} required />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="phone">Phone Number</InputLabel>
            <Input name="phone" onChange={handleInputChange} required />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input name="email" type="email" onChange={handleInputChange} required />
          </FormControl>
          
          {errorMessage && <Typography color="red">{errorMessage}</Typography>}

          <Button type="submit" color="primary" variant="outlined">
            Submit
          </Button>
        </FormGroup>
      </Box>
  );
};

export default FirstPage;
