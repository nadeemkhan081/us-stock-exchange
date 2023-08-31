// import React, { useState } from "react";
// import { TextField, Button, Box } from "@mui/material";

// const SearchBar = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = () => {
//     if (searchTerm.trim() !== "") {
//       onSearch(searchTerm);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         marginTop: "50px",
//         justifyContent: "center",
//       }}
//     >
//       <TextField
//         label="Search"
//         variant="outlined"
//         size="small"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <Button variant="contained" onClick={handleSearch} sx={{ ml: 2 }}>
//         Search
//       </Button>
//     </Box>
//   );
// };

// export default SearchBar;

import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import data from "./document.json"; // Import your JSON data

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
    }
  };

  const handleInputChange = (input) => {
    setSearchTerm(input);
    if (input.trim() !== "") {
      const filteredSuggestions = data.filter((item) =>
        item.symbol.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (selectedSymbol) => {
    setSearchTerm(selectedSymbol);
    setSuggestions([]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <TextField
        label="Company Symbol"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch} sx={{ mt: 2 }}>
        Search
      </Button>
      {suggestions.length > 0 && (
        <Paper
          elevation={3}
          sx={{ width: "50%", mt: 2, maxHeight: 200, overflow: "auto" }}
        >
          <List>
            {suggestions.map((item) => (
              <ListItem
                key={item.id}
                button
                onClick={() => handleSuggestionClick(item.symbol)}
              >
                <ListItemText primary={item.symbol} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;
