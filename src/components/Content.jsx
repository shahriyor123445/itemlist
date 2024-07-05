import ItemList from "./ItemList";

const Content = ({ items, handleDelete, handleCheck }) => {
  return (
    <>
      {items.length ? (
        <ItemList
          items={items}
          handleDelete={handleDelete}
          handleCheck={handleCheck}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>Your list is empty.</p>
      )}
    </>
  );
};

export default Content;
