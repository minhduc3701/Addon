import * as React from "react";
import { DefaultButton } from "./DefaultButton";
import { ButtonWrapper, IButtonExampleProps } from "./ButtonStyle";

class ButtonDefaultExample extends React.Component<IButtonExampleProps> {
  render() {
    const { disabled, checked } = this.props;
    const addIcon: any = { iconName: this.props.icon ? this.props.icon : "" };
    return (
      <ButtonWrapper
        theme={{
          type: this.props.type,
          darkMode: this.props.darkMode,
        }}
        className={this.props.className}
      >
        <DefaultButton
          onClick={this.props.onClick}
          {...this.props}
          iconProps={addIcon}
          text={this.props.text}
          disabled={disabled}
          checked={checked}
        />
      </ButtonWrapper>
    );
  }
}

export default ButtonDefaultExample;
