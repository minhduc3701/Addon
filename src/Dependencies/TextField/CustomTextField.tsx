import * as React from "react";
import { TextField } from "./TextField";
import {
  TextFieldWrapper,
  ICustomTextFieldProps,
} from "./CustomTextFieldStyle";

class CustomTextField extends React.Component<ICustomTextFieldProps> {
  render() {
    return (
      <TextFieldWrapper
        theme={{
          darkMode: this.props.darkMode,
          errorMessage: this.props.errorMessage,
        }}
      >
        <TextField {...this.props} />
      </TextFieldWrapper>
    );
  }
}

export default CustomTextField;
