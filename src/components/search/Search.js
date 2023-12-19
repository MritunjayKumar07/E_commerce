import React, { useState } from 'react';
import { MirchMasalaProduct } from '../../server/Api_MirchMasalaProduct';

const ProductList = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const results = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.title.toLowerCase().includes(query) ||
        product.spacel.toLowerCase().includes(query) ||
        product.category.some((cat) => cat.toLowerCase().includes(query)) ||
        product.keyWords.some((keyword) => keyword.toLowerCase().includes(query))
      );
    });

    setSearchResults(results);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name, title, spacel, category, keyWords..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            <h3>{result.name}</h3>
            <p>{result.title}</p>
            {/* Add other fields you want to display */}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Search = () => {
  return <ProductList products={MirchMasalaProduct} />;
};

export default Search;
