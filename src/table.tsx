import { Component, h, Prop } from "@stencil/core";
import { TableDataInterface } from "./table.interface";
import "@vudo/icon";

@Component({
  tag: "vudo-table",
  styleUrl: "table.css",
})
export class ComponentTable {
  @Prop() data: TableDataInterface = {
    columns: [],
    rows: [],
    actions: {},
  };

  validateData() {
    let valid: boolean = true;

    let columnLength = this.data.columns.length;

    this.data.rows.forEach((row) => {
      let rowLength: number = Object.values(row).length - 1;

      if (valid) valid = rowLength === columnLength;
    });

    return valid;
  }

  render() {
    const { columns, rows, actions } = this.data;

    return (
      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              return <th>{column.label}</th>;
            })}

            {actions ? <th>Actions</th> : null}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => {
            return (
              <tr>
                {columns.map((column) => {
                  return <td>{row[column.map]}</td>;
                })}

                {actions ? (
                  <td>
                    {actions.edit ? (
                      <a onClick={() => actions.edit(row.id)}>
                        <vudo-icon name="pencil-outline"></vudo-icon>
                      </a>
                    ) : null}
                    {actions.delete ? (
                      <a onClick={() => actions.delete(row.id)}>
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
    );
  }
}
