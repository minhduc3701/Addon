import * as React from "react";
import { Checkbox } from "./Checkbox";
import { CheckBoxWrapper, ICustomCheckBoxProps } from "./CustomCheckBoxStyle";

class CustomCheckBox extends React.Component<ICustomCheckBoxProps> {
  render() {
    return (
      <CheckBoxWrapper theme={this.props.darkMode}>
        <Checkbox {...this.props} />
      </CheckBoxWrapper>
    );
  }
}

export default CustomCheckBox;
