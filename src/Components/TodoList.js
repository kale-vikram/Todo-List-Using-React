import React, { useEffect, useState } from "react";
import "./TodoList.css";

// getting local storage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodoList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};
const TodoList = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState();
  const [toggelButton, setToggelButton] = useState(false);
  const addItem = () => {
    if (!inputData) {
      alert("Please Enter Your Data");
    } else if (inputData && toggelButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setInputData([]);
      setIsEditItem();
      setToggelButton(false);
    } else {
      const myInputData = {
        id: Math.random().toString(),
        name: inputData
      };
      setItems([...items, myInputData]);
      setInputData("");
    }
  };
  //  editing the elements
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggelButton(true);
  };

  // deleting each single item
  const deleteItem = (index) => {
    const updateItems = items.filter((curElm) => {
      return curElm.id !== index;
    });
    setItems(updateItems);
  };

  // removing all added elements
  const removeAll = () => {
    setItems([]);
  };
  //adding Local Storage

  useEffect(() => {
    localStorage.setItem("mytodoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./Images/todo.svg" alt="tolist" />
            <figcaption> Add Your List Here </figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="🥳Enter Your Items"
              className="form-control"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />

            {toggelButton ? (
              <i className="fa fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* Show Our Items */}

          <div className="showItems">
            {items.map((curElem, index) => {
              return (
                <div className="eachItem" key={index}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="fa fa-trash add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all buttons */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default TodoList;
