import React, { useState } from "react";
import tickers from "../tickers/tickers";
import styles from '../../../styles.css';

type Props = {
  search: string;
  getStock: ([string]) => void;
  setSearch: (string) => void;
};

const Search: React.FC<Props> = ({ search, getStock, setSearch }) => {
  // const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([]);
  const [shadow, setShadow] = useState(false);

  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSearch(e.target.value);
    filterSearch(e.target.value)
  };

  const filterSearch = (search) => {
    if (search === "") {
      setFilter([]);
    } else {
      const list = tickers.filter((stock) => {
        if (
          search.toLowerCase() ===
            stock[0].substring(0, search.length).toLowerCase() ||
          search.toLowerCase() ===
            stock[1].substring(0, search.length).toLowerCase()
        ) {
          return stock;
        }
      });
      const mapped = list.map((stock) => {
        return (
          <div
            key={stock[0]}
            className={styles.searchItem}
            onClick={() => getStock(stock)}
          >
            <div>
              <div style={{ fontSize: "16px" }}>{stock[0]}</div>
              <div style={{ fontSize: "13px" }}>{stock[1]}</div>
            </div>
            <div>+</div>
          </div>
        );
      });
      if (mapped.length === 0) {
        setFilter(
          <div className={styles.searchItem} onClick={() => getStock(stock)}>
            <div>
              <div>No Results</div>
            </div>
          </div>
        )
      } else {
        setFilter(mapped);
      }
    }
  }

  return (
    <div className={styles.searchContainer}>
      <form autoComplete="off">
        <input
          style={{
            borderBottomLeftRadius: search === "" ? "18px" : "0px",
            borderBottomRightRadius: search === "" ? "18px" : "0px",
            fontFamily: 'Work Sans, sans-serif'
          }}
          className={styles.searchbar}
          autoComplete="off"
          id="search"
          type="text"
          placeholder="search..."
          onChange={handleChange}
          value={search}
        ></input>
      </form>
      <div
        className={styles.searchResults}
        style={{ display: search === "" ? "none" : "block" }}
      >
        {filter}
      </div>
    </div>
  );
};

export default Search;
