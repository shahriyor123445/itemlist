import Header from "./components/Header";
import SearchItem from "./components/SearchItem";
import AddItem from "./components/AddItem";
import Footer from "./components/Footer";
import Content from "./components/Content";
import { useState, useEffect } from "react";
import A from "./components/A";
import C from "./components/C";
import MyInput from "./components/MyInput";
import Container from "./components/Container";

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [color, setColor] = useState("");

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  useEffect(() => {
    const api_url = "http://localhost:3000";
    async function fetchItems() {
      try {
        const response = await fetch(`${api_url}/items`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network error was not ok: ${errorText}`);
        }
        const newItems = await response.json();
        setItems(newItems);
      } catch (error) {
        console.error("Error fetching items", error.message);
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, []);

  async function addItem() {
    const id = Date.now();
    const item = {
      id,
      item: newItem,
      checked: false,
    };
    try {
      const response = await fetch(`${api_url}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }
      const newItems = [...items, item];
      setItems(newItems);
    } catch (error) {
      console.error("Error creating new item", error.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    addItem();
    setNewItem("");
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} onSearch={setSearch} />

      <main>
        {isLoading && <p>Loading...</p>}
        {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
        {!isLoading && !fetchError && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
          />
        )}
        <A count={count} />
        <C onIncrement={increment} onDecrement={decrement} onReset={reset} />

        

        <h2>Color State:</h2>
        <MyInput value={color} onChange={setColor} />
        <Container color={color}>
          <p>
           container
          </p>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
