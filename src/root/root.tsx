import { Component, ComponentInterface, h, State } from "@stencil/core";
import { data } from "./root.data";

@Component({
  tag: "site-root",
  styleUrl: "root.css",
})
export class SiteRoot implements ComponentInterface {
  @State() data = data;

  render() {
    return <vudo-table data={this.data}></vudo-table>;
  }
}
