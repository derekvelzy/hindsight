import React, { useState } from 'react';
import tickers from '../tickers/tickers.js'

const Search = (props) => {
  const { getStock } = props;
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    filterSearch(e.target.value)
  }

  const filterSearch = (search) => {
    if (search === '') {
      setFilter([]);
    } else {
      const list = tickers.filter(stock => {
        if (search.toLowerCase() === stock[0].substring(0, search.length).toLowerCase() || search.toLowerCase() === stock[1].substring(0, search.length).toLowerCase()) {
          return stock;
        }
      })
      const mapped = list.map(stock => {
        return (
          <div className="searchItem" onClick={() => getStock(stock)}>
            <div key={stock[0]}>
              <div>{stock[0]}</div>
              <div>{stock[1]}</div>
            </div>
          </div>
        )
      })
      setFilter(mapped);
    }
  }

  return (
    <div>
      <form autoComplete="off">
        <input className="searchbar" autoComplete="off" id="search" type="text" placeholder="search..." onChange={handleChange} value={search}></input>
      </form>
      <div className="searchResults">
        {filter}
      </div>
    </div>
  )
}

export default Search;