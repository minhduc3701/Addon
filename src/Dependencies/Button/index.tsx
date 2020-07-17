import * as React from "react";
import { DefaultButton } from "./DefaultButton";
import { ButtonWrapper, IButtonExampleProps } from "./ButtonStyle";

// Example formatting
class ButtonDefaultExample extends React.Component<IButtonExampleProps> {
  render() {
    const { disabled, checked } = this.props;
    const addIcon: any = { iconName: this.props.icon ? this.props.icon : "" };
    return (
      <ButtonWrapper
        theme={{
          type: this.props.type,
          darkMode: this.props.darkMode,
          styles: this.props.styles,
        }}
        className={this.props.className}
      >
        <DefaultButton
          iconProps={addIcon}
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

export default ButtonDefaultExample;
