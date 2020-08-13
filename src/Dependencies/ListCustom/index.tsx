import * as React from "react";
import { IHOC } from "./ListStyle";
import { DetailsListDocumentsExample } from "./ListCustom";

export class ListCustom extends React.Component<IHOC, { itemHeight: number }> {
  constructor(props: IHOC) {
    super(props);
    this.state = {
      itemHeight: 0,
    };
  }

  componentDidMount() {
    let itemHeight = document.getElementById("HOC-wrapper")?.clientHeight;
    let count = 0;
    if (itemHeight) {
      count = Math.floor(itemHeight / 43 + 1);
      this.setState({
        itemHeight: count,
      });
    }
  }

  render() {
    return (
      <div id="HOC-wrapper" style={{ width: "100%", height: "100%" }}>
        {this.state.itemHeight > 0 && (
          <DetailsListDocumentsExample
            {...this.props}
            itemCount={this.state.itemHeight}
          />
        )}
      </div>
    );
  }
}
export default ListCustom;
