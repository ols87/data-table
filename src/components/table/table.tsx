import {
  Component,
  h,
  Prop,
  State,
  Event,
  EventEmitter,
  Listen,
} from "@stencil/core";
import { TableDataInterface } from "./table.interface";
import "@vudo/icon";

@Component({
  tag: "vudo-table",
  styleUrl: "table.css",
})
export class ComponentTable {
  @State() currentPageNumber: number = 1;
  @State() itemPerPage: number = 2;
  @State() sortBy: string = "asc";
  @Prop() data: TableDataInterface = {
    columns: [],
    rows: [],
    actions: {},
  };

  @Event() search: EventEmitter<any>;
  searchHandler(e: any) {
    this.search.emit(e);
  }

  @Event() delete: EventEmitter<any>;
  deleteHandler(data: any) {
    this.delete.emit(data);
  }

  @Event() sort: EventEmitter<any>;
  sortHandler(e: any) {
    this.sort.emit(e);
  }

  @Listen("delete")
  onDelete(data: any) {
    let id = data.detail;
    let result = this.data.rows.filter((item) => item.id != id);
    this.data = { ...this.data, rows: result };
  }

  @Listen("sort")
  onSort(data: any) {
    let column = data.detail.map;
    let result = this.data.rows;
    result.sort((a, b) => {
      let valueA = a[column].toString().toLocaleLowerCase();
      let valueB = b[column].toString().toLocaleLowerCase();

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
    this.data = { ...this.data, rows: result };
    this.sortBy = this.sortBy === "asc" ? "desc" : "asc";
  }

  pagination(total: number, perPage: number) {
    let pageNumber = [];
    for (let i = 1; i <= Math.ceil(total / perPage); i++) {
      pageNumber.push(i);
    }
    return pageNumber;
  }

  changeCurrentPageNumber(type: string) {
    if (type === "next") {
      if (this.currentPageNumber >= this.data.rows.length / this.itemPerPage) {
        return;
      }
      this.currentPageNumber = this.currentPageNumber + 1;
    } else {
      if (this.currentPageNumber === 1) {
        return;
      }
      this.currentPageNumber = this.currentPageNumber - 1;
    }
  }

  render() {
    const { columns, rows, actions } = this.data;

    let indexOfLastPage = this.currentPageNumber * this.itemPerPage;
    let indexOfFirstPage = indexOfLastPage - this.itemPerPage;
    return (
      <div>
        <input
          name="search"
          type="text"
          placeholder="Search"
          onInput={(e) => this.searchHandler(e)}
        />
        <table>
          <thead>
            <tr>
              {columns.map((column) => {
                return (
                  <th onClick={() => this.sortHandler(column)}>
                    {column.label}
                  </th>
                );
              })}

              {actions ? <th>Actions</th> : null}
            </tr>
          </thead>

          <tbody>
            {rows.slice(indexOfFirstPage, indexOfLastPage).map((row) => {
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
                      <a onClick={() => this.deleteHandler(row.id)}>
                        <span
                          class="iconify"
                          data-icon="mdi:delete"
                          data-inline="false"
                        ></span>
                      </a>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
        <ul>
          <li onClick={() => this.changeCurrentPageNumber("next")}>
            <span
              class="iconify"
              data-icon="mdi:chevron-double-right"
              data-inline="false"
            ></span>
          </li>
          {this.pagination(rows.length, this.itemPerPage).map((item) => (
            <li
              class={this.currentPageNumber === item ? "active" : ""}
              onClick={() => (this.currentPageNumber = item)}
            >
              {item}
            </li>
          ))}
          <li onClick={() => this.changeCurrentPageNumber("back")}>
            <span
              class="iconify"
              data-icon="mdi:chevron-double-left"
              data-inline="false"
            ></span>
          </li>
        </ul>
      </div>
    );
  }
}
