import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";
import { TableDataInterface } from "./table.interface";

describe("component-table", () => {
  let page: E2EPage;
  let component: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent("<component-table></component-table>");
    component = await page.find("component-table");
  });

  it("renders component", async () => {
    expect(component).toHaveClass("hydrated");
  });

  it("renders table element", async () => {
    const table: E2EElement = await page.find("table");
    expect(table).toBeTruthy();
  });

  it("has rows and column data", async () => {
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

    component.setProperty("data", data);

    await page.waitForChanges();

    const headers = await page.findAll("th");
    expect(headers).toHaveLength(1);

    const rows = await page.findAll("tbody tr");
    expect(rows).toHaveLength(1);
  });
});
