import * as React from "react";
import { DefaultButton } from "office-ui-fabric-react";
import { ButtonWrapper } from "./ButtonStyle";

export interface IButtonExampleProps {
  disabled?: boolean;
  checked?: boolean;
  text: string;
  type?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  darkMode?: string;
}

// Example formatting

class ButtonDefaultExample extends React.Component<IButtonExampleProps> {
  render() {
    const { disabled, checked } = this.props;
    return (
      <ButtonWrapper
        theme={{ type: this.props.type, darkMode: this.props.darkMode }}
      >
        <DefaultButton
          text={this.props.text}
          onClick={this.props.onClick}
          allowDisabledFocus
          disabled={disabled}
          checked={checked}
        />
      </ButtonWrapper>
    );
  }
}

// function _alertClicked(): void {
//   alert("Clicked");
// }

export default ButtonDefaultExample;
