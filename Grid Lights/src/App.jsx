import { useState } from "react";

import "./App.css";
import Cell from "./components/Cell";

function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const configMatrix = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const deactivateCells = () => {
    setIsDeactivating(true);

    let timer = setInterval(() => {
      setOrder((originalOrder) => {
        let newOrder = originalOrder.slice();
        newOrder.pop();

        if (newOrder.length === 0) {
          setIsDeactivating(false);
          clearInterval(timer);
        }

        return newOrder;
      });
    }, 300);
  };

  const activateCells = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);

    if (newOrder.length === configMatrix.flat(1).filter(Boolean).length) {
      deactivateCells();
    }
  };

  return (
    <main className="container wrapper">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${configMatrix[0].length},1fr)` }}
      >
        {configMatrix.flat(1).map((value, index) => {
          return value == 1 ? (
            <Cell
              label={`Cell ${index}`}
              key={index}
              filled={order.includes(index)}
              onClick={() => activateCells(index)}
              isDisabled={order.includes(index) || isDeactivating}
            />
          ) : (
            <span key={index} />
          );
        })}
      </div>
    </main>
  );
}

export default App;
