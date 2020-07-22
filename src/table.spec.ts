import { ComponentTable } from "./table";
import { TableDataInterface } from "./table.interface";

describe("my-component", () => {
  let component;

  beforeEach(async () => {
    component = new ComponentTable();
  });

  it("validates table data", async () => {
    const data: TableDataInterface = {
      columns: [
        {
          label: "Foo",
          map: "foo",
        },
      ],
      rows: [
        {
          id: 1,
          foo: "Bar",
        },
      ],
    };

    component.data = data;

    expect(component.validateData()).toBeTruthy();

    component.data.rows[0].fizz = "buzz";

    expect(component.validateData()).toBeFalsy();
  });
});
