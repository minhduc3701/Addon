import * as React from "react";
import { TooltipHost } from "./TooltipHost";
import { ToolTipWrapper } from "./CustomToolTipStyle";

class CustomCheckBox extends React.Component<any, {}> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ToolTipWrapper theme={this.props.darkMode}>
        <TooltipHost
          calloutProps={{
            backgroundColor:
              this.props.darkMode === "dark" ? "#212121" : "#ffffff",
            styles: {
              beakCurtain: {
                backgroundColor:
                  this.props.darkMode === "dark" ? "#212121" : "#ffffff",
              },
              root: {
                backgroundColor:
                  this.props.darkMode === "dark" ? "#212121" : "#ffffff",
              },
            },
          }}
          {...this.props}
        />
      </ToolTipWrapper>
    );
  }
}

export default CustomCheckBox;
