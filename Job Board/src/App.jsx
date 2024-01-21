import { useEffect, useState } from "react";

import "./App.css";
import JobPosting from "./JobPosting";

const ITEMS_PER_PAGE = 6;
const API_ENDPOINT = "https://hacker-news.firebaseio.com/v0";

function App() {
  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState(null);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchItems = async (currPage) => {
    setCurrentPage(currPage);
    setFetchingDetails(true);

    let itemsList = itemIds;

    // If itemIds is null, fetch the list of ids
    if (itemsList === null) {
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`);
      itemsList = await response.json();
      setItemIds(itemsList);
    }

    //Pagination
    const itemIdsForPage = itemsList.slice(
      currPage * ITEMS_PER_PAGE,
      currPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    // Fetch details for each itemId in the current page
    const itemsForPage = await Promise.all(
      itemIdsForPage.map((itemId) =>
        fetch(`${API_ENDPOINT}/item/${itemId}.json`).then((response) =>
          response.json()
        )
      )
    );

    // Update the state with the newly fetched items
    setItems([...items, ...itemsForPage]);

    setFetchingDetails(false);
  };

  useEffect(() => {
    if (currentPage === 0) fetchItems(currentPage);
  }, [currentPage]);

  return (
    <div className="custom-app">
      <h1 className="custom-title">Hacker News Jobs Board</h1>

      {itemIds === null || items.length < 1 ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="custom-items" role="list">
            {items?.map((item) => {
              return <JobPosting key={item.id} {...item} />;
            })}
          </div>
          <button
            className={`custom-load-more-button`}
            disabled={fetchingDetails}
            onClick={() => fetchItems(currentPage + 1)}
          >
            {fetchingDetails ? "loading..." : "Load more jobs"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
