import React, { Component } from "react";
import _ from 'lodash';

class TableBody extends Component {
 
  createKey = (column, item) => {
    return item._id + (column.path || column.key);
  }

  renderCellContent = (item, column) => {
      if (column.content) return column.content(item);

      const value = _.get(item, column.path);
      if (value === true) return 'Yes';
      if (value === false || value === null) return 'No';
      return _.get(item, column.path)
  }


  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(column, item)} >{this.renderCellContent(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
