import * as React from "react";
import { TooltipHost } from "./TooltipHost";
import { ITooltipHostProps } from "./TooltipHost.types";

// <TooltipProps>
interface ICustomProps extends ITooltipHostProps {
  darkMode?: string;
}
// </TooltipProps>
class CustomTooltip extends React.Component<ICustomProps> {
  render() {
    return (
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
    );
  }
}

export default CustomTooltip;
