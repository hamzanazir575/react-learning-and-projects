import { useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';
import bagIcon from './images/shopping-bag.png';
import totalIcon from './images/total-items.png';
import purchasedIcon from './images/purchased-items.png';
import remainingIcon from './images/remaining-items.png';

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => {
      return [...items, item];
    });
  }

  function handleDeleteItem(id) {
    setItems((items) => {
      return items.filter((item) => {
        return item.id !== id;
      });
    });
  }

  function handleToggleItem(id) {
    setItems((items) => {
      return items.map((item) => {
        return item.id === id ? { ...item, purchased: !item.purchased } : item;
      });
    });
  }

  function handleClearCart() {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      setItems([]);
    }
  }

  return (
    <div className="app">
      <div className="hero">
        <img src={bagIcon} alt="Shopping Bag" className="hero-icon" />
        <h1>Grocery Tracker</h1>
        <p>Manage your grocery shopping with ease.</p>
      </div>
      <AddItemForm onAddItem={handleAddItem} />
      <ShoppingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearCart={handleClearCart}
      />
      <Stats items={items} />
      <Footer />
    </div>
  );
}

function AddItemForm({ onAddItem }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;

    const newItem = { id: Date.now(), name, quantity, purchased: false };

    onAddItem(newItem);

    setName('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        className="item-input"
        type="text"
        placeholder="Enter item name..."
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <input
        className="quantity-input"
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      />
      <button className="plus-btn">
        <FaPlus />
        Add Item
      </button>
    </form>
  );
}

function ShoppingList({ items, onDeleteItem, onToggleItem, onClearCart }) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'name')
    sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));

  if (sortBy === 'purchased')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.purchased) - Number(b.purchased));

  return (
    <div className="shopping-list">
      <div className="control">
        <div className="sort-box">
          <label>Sort by: </label>
          <select
            id="sort"
            className="sort-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option value="input">Input Order</option>
            <option value="name">Name</option>
            <option value="purchased">Purchased</option>
          </select>
        </div>
        {sortedItems.map((item) => {
          return (
            <ShoppingItem
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />
          );
        })}

        {items.length > 0 && (
          <button className="clear-btn" onClick={onClearCart}>
            <FaTrashCan />
            Clear Cart
          </button>
        )}
      </div>
    </div>
  );
}

function ShoppingItem({ item, onDeleteItem, onToggleItem }) {
  return (
    <div className="shopping-item">
      <p className={`item-name ${item.purchased ? 'purchased' : ''}`}>
        {item.name}
      </p>
      <p className="item-quantity">{item.quantity}</p>
      <input
        className="checkbox"
        type="checkbox"
        checked={item.purchased}
        onChange={() => {
          return onToggleItem(item.id);
        }}
      />
      <button
        className="delete-btn"
        onClick={() => {
          onDeleteItem(item.id);
        }}
      >
        <FaTrashCan />
      </button>
    </div>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const purchasedItems = items.filter((item) => item.purchased).length;
  const remainingItems = totalItems - purchasedItems;

  return (
    <div className="stats">
      <div className="stat-card">
        <img src={totalIcon} alt="Total" />
        <div>
          <h3>Total Items</h3>
          <p>{totalItems}</p>
        </div>
      </div>

      <div className="stat-card">
        <img src={purchasedIcon} alt="Purchased" />
        <div>
          <h3>Purchased</h3>
          <p>{purchasedItems}</p>
        </div>
      </div>

      <div className="stat-card">
        <img src={remainingIcon} alt="Remaining" />
        <div>
          <h3>Remaining</h3>
          <p className="remaining">{remainingItems}</p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const author = 'Hamza Nazir';

  return <footer>Made by {author}</footer>;
}
