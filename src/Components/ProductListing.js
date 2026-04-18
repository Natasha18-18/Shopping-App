import { useEffect, useState } from "react";
import Products from "./Products";
import useDebounce from "../hooks/useDebounce";

function ProductListing() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  // ✅ Debounce
  const debouncedSearch = useDebounce(search, 500);

  // Fetch Products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // ✅ Filtering logic
  let filtered = [...products];

  // Search (debounced)
  if (debouncedSearch) {
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }

  // Category
  if (category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  // Sort
  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      {/* Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      {/* Products */}
      <Products products={filtered} />
    </div>
  );
}

export default ProductListing;