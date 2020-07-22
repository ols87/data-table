import { Component, h, Prop } from "@stencil/core";
import { TableDataInterface } from "./table.interface";

@Component({
  tag: "ta-ble",
  styleUrl: "table.css",
})
export class ComponentTable {
  @Prop() data: TableDataInterface = {
    columns: [
      {
        label: "Foo",
        map: "foo",
      },
    ],
    rows: [
      {
        id: 0,
        foo: "bar",
      },
    ],
    actions: {
      edit: (id) => {
        console.log(id);
      },
    },
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
    const columns = this.data.columns;
    const rows = this.data.rows;
    const actions = this.data.actions;

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
                        <ic-on icon="pencil-outline"></ic-on>
                      </a>
                    ) : null}
                    {actions.delete ? (
                      <a onClick={() => actions.delete(row.id)}>
                        <ic-on icon="delete-outline"></ic-on>
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
