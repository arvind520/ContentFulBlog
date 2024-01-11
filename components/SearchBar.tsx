import React, { useState, useEffect } from "react";
import algoliasearch from "algoliasearch/lite";
import Link from "next/link";
import styles from "../styles/SearchBar.module.scss";

require("dotenv").config();

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const searchClient = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY_ORIGINAL
    );
    const index = searchClient.initIndex("myassessment");

    if (query.trim() !== "") {
      index
        .search(query)
        .then(({ hits }) => setResults(hits))
        .catch((err) => console.error(err));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className={styles.searchContainer}>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span>
          {results.map((result) => {
            return <Link href={`/post/${result.slug}`}>{result.title}</Link>;
          })}
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
