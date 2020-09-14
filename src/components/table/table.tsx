import { Component, h, Prop, State, Event, EventEmitter } from "@stencil/core";
import {
  TableDataInterface,
  TableColumnInterface,
  TableRowInterface,
} from "./table.interface";
import "@vudo/icon";

@Component({
  tag: "vudo-table",
  styleUrl: "table.css",
})
export class ComponentTable {
  @State() sortBy: string = "asc";

  @Prop() currentPage: number = 1;

  @Prop() itemsPerPage: number = 4;

  @Prop() data: TableDataInterface = {
    columns: [],
    rows: [],
    actions: {},
  };

  @State() viewData: TableDataInterface = this.data;

  @Event() searchTable: EventEmitter<TableRowInterface[]>;
  search(searchText: string) {
    this.viewData = { ...this.data };

    let search = searchText?.toLowerCase();

    let result: Array<TableRowInterface> = [];

    let temp: Array<TableRowInterface> = [...this.data.rows];

    temp.forEach((item: TableRowInterface) => {
      if (item.name.toLowerCase().indexOf(search) > -1)
        return result.push(item);
    });

    if (this.viewData.rows.length < 1) this.viewData = { ...this.data };

    this.viewData = { ...this.viewData, rows: result };

    this.searchTable.emit(result);
  }

  @Event() sortTable: EventEmitter<TableColumnInterface>;
  sort(column: TableColumnInterface) {
    let result = this.viewData.rows;

    result.sort((a, b) => {
      let valueA = a[column.map].toString().toLocaleLowerCase();

      let valueB = b[column.map].toString().toLocaleLowerCase();

      if (valueA < valueB) {
        let result = this.sortBy === "asc" ? -1 : 1;
        return result;
      }

      if (valueA > valueB) {
        let result = this.sortBy === "asc" ? 1 : -1;
        return result;
      }

      return 0;
    });

    this.viewData = { ...this.viewData, rows: result };

    this.sortBy = this.sortBy === "asc" ? "desc" : "asc";

    this.sortTable.emit(column);
  }

  pagination(total: number, perPage: number) {
    let pageNumber = [];

    for (let i = 1; i <= Math.ceil(total / perPage); i++) {
      pageNumber.push(i);
    }

    return pageNumber;
  }

  changePage(type: string) {
    if (type === "next") {
      if (this.currentPage >= this.viewData.rows.length / this.itemsPerPage) {
        return;
      }

      this.currentPage = this.currentPage + 1;
    } else {
      if (this.currentPage === 1) {
        return;
      }

      this.currentPage = this.currentPage - 1;
    }
  }

  render() {
    const { columns, rows, actions } = this.viewData;

    let lastPage = this.currentPage * this.itemsPerPage;

    let firstPage = lastPage - this.itemsPerPage;

    return (
      <div>
        <input
          name="search"
          type="text"
          placeholder="Search"
          onInput={(e: any) => this.search(e.target?.value)}
        />

        <table>
          <thead>
            <tr>
              {columns.map((column) => {
                return (
                  <th onClick={() => this.sort(column)}>{column.label}</th>
                );
              })}

              {actions ? <th>Actions</th> : null}
            </tr>
          </thead>

          <tbody>
            {rows?.slice(firstPage, lastPage).map((row) => {
              return (
                <tr>
                  {columns.map((column) => {
                    return <td>{row[column.map]}</td>;
                  })}

                  {actions ? (
                    <td class="action-col">
                      {actions.edit ? (
                        <a onClick={() => actions.edit(row)}>
                          <vudo-icon name="pencil-outline"></vudo-icon>
                        </a>
                      ) : null}
                      {actions.delete ? (
                        <a onClick={() => actions.delete(row)}>
                          <vudo-icon name="delete-outline"></vudo-icon>
                        </a>
                      ) : null}
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>

        <ul>
          <li onClick={() => this.changePage("back")}>
            <vudo-icon name="chevron-left"></vudo-icon>
          </li>

          {this.pagination(rows.length, this.itemsPerPage).map((item) => (
            <li
              class={this.currentPage === item ? "active" : ""}
              onClick={() => (this.currentPage = item)}
            >
              {item}
            </li>
          ))}

          <li onClick={() => this.changePage("next")}>
            <vudo-icon name="chevron-right"></vudo-icon>
          </li>
        </ul>
      </div>
    );
  }
}
