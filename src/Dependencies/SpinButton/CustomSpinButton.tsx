import * as React from "react";
import { SpinButton } from "./SpinButton";
import { SpinButtonWrapper, ICustomSpinButton } from "./CustomSpinButtonStyle";
import { Position } from "../@uifabric/utilities/positioning";

class CustomSpinButton extends React.Component<ICustomSpinButton> {
  render() {
    return (
      <SpinButtonWrapper
        theme={{ darkMode: this.props.darkMode, disabled: this.props.disabled }}
      >
        <SpinButton
          {...this.props}
          labelPosition={
            this.props.labelPosition ? this.props.labelPosition : Position.top
          }
        />
      </SpinButtonWrapper>
    );
  }
}

export default CustomSpinButton;
