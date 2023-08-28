import React, { useState, useEffect } from "react";
import { fetchStockData } from "../utils/Api";
import StockPriceCard from "../components/StockPriceCard";
import SearchBar from "../components/SearchBar";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";

const StockPrice = () => {
  const [stockData, setStockData] = useState(null);
  const [searchedSymbol, setSearchedSymbol] = useState("");
  const [watchlist, setWatchlist] = useState([]);

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

  const addToWatchlist = () => {
    if (stockData) {
      setWatchlist([...watchlist, stockData]);
    }
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
        <>
          <StockPriceCard stockData={stockData} />
          <Button variant="contained" onClick={addToWatchlist}>
            ADD TO WATCHLIST
          </Button>
        </>
      ) : (
        <p>
          {" "}
          # Enter a company symbol and click Search to see its current U.S.
          stock price.
        </p>
      )}

      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#eae7e7" }}>
            <TableRow sx={{ fontWeight: 5000 }}>
              <TableCell>Company Symbol</TableCell>
              <TableCell>Stock Price</TableCell>
              <TableCell>Highest</TableCell>
              <TableCell>Volume</TableCell>
              <TableCell>Stock Tracking</TableCell>


              {/* Add more table headers as needed */}
            </TableRow>
          </TableHead>
          <TableBody style={{maxHeight: '300px', overflow: 'auto'}}>
            {watchlist.map((data, index) => {
              const latestTimestamp = Object.keys(
                data["Time Series (5min)"]
              )[0];
              return (
                <TableRow key={index}>
                  <TableCell>{data["Meta Data"]["2. Symbol"]}</TableCell>
                  <TableCell>
                    ${data["Time Series (5min)"][latestTimestamp]["1. open"]}
                  </TableCell>
                  <TableCell>
                    ${data["Time Series (5min)"][latestTimestamp]["2. high"]}
                  </TableCell>
                  <TableCell>
                    {data["Time Series (5min)"][latestTimestamp]["5. volume"]}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained">Show Chart</Button>
                  </TableCell>
                  {/* Add more table cells as needed */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StockPrice;





