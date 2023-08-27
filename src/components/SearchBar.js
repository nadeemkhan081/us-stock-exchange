import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "50px",
        justifyContent: "center",
      }}
    >
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch} sx={{ ml: 2 }}>
        Search
      </Button>
    </Box>

    // <Grid container spacing={2} alignItems="center">
    //   <Grid item>
    //     <TextField
    //       label="Symbol"
    //       variant="outlined"
    //       value={searchTerm}
    //       onChange={(e) => setSearchTerm(e.target.value)}
    //     />
    //   </Grid>
    //   <Grid item>
    //     <Button variant="contained" onClick={handleSearch}>
    //       Search
    //     </Button>
    //   </Grid>
    // </Grid>
  );
};

export default SearchBar;
