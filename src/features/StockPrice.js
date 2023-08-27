import React, { useState, useEffect } from "react";
import { fetchStockData } from "../utils/Api";
import StockPriceCard from "../components/StockPriceCard";
import SearchBar from "../components/SearchBar";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";

const StockPrice = () => {
  const [stockData, setStockData] = useState(null);
  const [searchedSymbol, setSearchedSymbol] = useState("");

  useEffect(() => {
    if (searchedSymbol !== "") {
      fetchStockData(searchedSymbol)
        .then((data) => {
          console.log("API Response:", data);
          setStockData(data);
        })
        .catch((error) => {
          console.error("Error fetching stock data:", error);
        });
    }
  }, [searchedSymbol]);

  const handleSearch = (symbol) => {
    setSearchedSymbol(symbol);
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <ShowChartIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            U.S. Stock Exchange
          </Typography>
        </Toolbar>
      </AppBar>

      <SearchBar onSearch={handleSearch} />
      {stockData ? (
        <StockPriceCard stockData={stockData} />
      ) : (
        <p> # Enter a company symbol and click Search to see its current U.S. stock price.</p>
      )}
    </Container>
  );
};

export default StockPrice;
