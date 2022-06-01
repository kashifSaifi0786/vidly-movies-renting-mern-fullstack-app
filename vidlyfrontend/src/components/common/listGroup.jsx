import React from "react";

const ListGroup = ({ valueProperty, textProperty, items, selectedItem, onItemSelect }) => {
    return (
      <ul className="list-group">
        {items.map((item) => (
          <li
            key={item[valueProperty]}
            onClick={() => onItemSelect(item)}
            className={
              item === selectedItem
                ? "list-group-item clickable active"
                : "list-group-item clickable"
            }
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    );
}
 
ListGroup.defaultProps = {
    valueProperty: '_id',
    textProperty: 'name'
  };

export default ListGroup;
