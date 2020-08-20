import { Component, ComponentInterface, h, Listen, State } from "@stencil/core";
import {data} from "./root.data";

@Component({
  tag: "site-root",
  styleUrl:"root.css"
})
export class SiteRoot implements ComponentInterface {
  @State() data = data;
  
  @Listen("search")
  onSearch(e: any) {
    let textSearch = e.detail.target.value;
    let result = [];
    let temp = [...this.data.rows];
    temp.forEach((item) => {
      if (item.name.toLowerCase().indexOf(textSearch.toLowerCase()) != -1) {
        return result.push(item);
      }
    });
    this.data = { ...this.data, rows: result };
  }

  render() {
    return <vudo-table data={this.data}></vudo-table>
  }
}
