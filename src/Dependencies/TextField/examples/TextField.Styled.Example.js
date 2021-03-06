import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import './TextField.Styled.Example.scss';
var textStyles = { root: { maxWidth: 600 } };
export var TextFieldStyledExample = function () {
    return (React.createElement(Stack, { tokens: { childrenGap: 15 } },
        React.createElement(Text, { styles: textStyles }, "These examples show how components that used to be styled using CSS can be styled using JS styling. The preferred method is JS styling for several reasons: type safety for styling, more predictable behavior, and clear feedback via typing when component changes affect existing styling code."),
        React.createElement(TextField, { label: "Theme Primary Label, Red Top Border (JS):", required: true, styles: getStyles }),
        React.createElement(TextField, { label: "Theme Primary Label, Red Top Border (CSS):", required: true, className: "textField-cssStyled" })));
};
function getStyles(props) {
    var required = props.required;
    return {
        fieldGroup: [
            { width: 300 },
            required && {
                borderTopColor: props.theme.semanticColors.errorText,
            },
        ],
        subComponentStyles: {
            label: getLabelStyles,
        },
    };
}
function getLabelStyles(props) {
    var required = props.required;
    return {
        root: [
            required && {
                color: props.theme.palette.themePrimary,
            },
        ],
    };
}
/*
This is the SCSS used in the CSS styling example.
If exporting to CodePen, paste this into the CSS section.
-------------------------------------------------------------------------------------------
// In the real SCSS, these variables are defined elsewhere and adjusted based on the theme.
// The values provided below are from the default theme.
$errorTextColor: #a80000;
$ms-color-themePrimary: #0078d4;

.textField-cssStyled {
  .ms-TextField-fieldGroup {
    width: 300px;
    border-top-color: $errorTextColor;
  }
  .ms-Label {
    color: $ms-color-themePrimary;
  }
}
*/
//# sourceMappingURL=TextField.Styled.Example.js.map