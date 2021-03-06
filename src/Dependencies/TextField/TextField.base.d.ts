import * as React from 'react';
import { ITextField, ITextFieldProps } from './TextField.types';
/** @internal */
export interface ITextFieldState {
    /** The currently displayed value if uncontrolled. */
    uncontrolledValue: string | undefined;
    /** Is true when the control has focus. */
    isFocused?: boolean;
    /**
     * Dynamic error message returned by `onGetErrorMessage`.
     * Use `this._errorMessage` to get the actual current error message.
     */
    errorMessage: string | JSX.Element;
}
/** @internal */
export interface ITextFieldSnapshot {
    /**
     * If set, the text field is changing between single- and multi-line, so we'll need to reset
     * selection/cursor after the change completes.
     */
    selection?: [number | null, number | null];
}
export declare class TextFieldBase extends React.Component<ITextFieldProps, ITextFieldState, ITextFieldSnapshot> implements ITextField {
    static defaultProps: ITextFieldProps;
    /** Fallback ID if none is provided in props. Access proper value via `this._id`. */
    private _fallbackId;
    private _descriptionId;
    private _labelId;
    private _delayedValidate;
    private _lastValidation;
    private _latestValidateValue;
    private _hasWarnedNullValue;
    private _textElement;
    private _classNames;
    private _async;
    /** Most recent value from a change or input event, to help avoid processing events twice */
    private _lastChangeValue;
    constructor(props: ITextFieldProps);
    /**
     * Gets the current value of the text field.
     */
    readonly value: string | undefined;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getSnapshotBeforeUpdate(prevProps: ITextFieldProps, prevState: ITextFieldState): ITextFieldSnapshot | null;
    componentDidUpdate(prevProps: ITextFieldProps, prevState: ITextFieldState, snapshot: ITextFieldSnapshot): void;
    render(): JSX.Element;
    /**
     * Sets focus on the text field
     */
    focus(): void;
    /**
     * Blurs the text field.
     */
    blur(): void;
    /**
     * Selects the text field
     */
    select(): void;
    /**
     * Sets the selection start of the text field to a specified value
     */
    setSelectionStart(value: number): void;
    /**
     * Sets the selection end of the text field to a specified value
     */
    setSelectionEnd(value: number): void;
    /**
     * Gets the selection start of the text field
     */
    readonly selectionStart: number | null;
    /**
     * Gets the selection end of the text field
     */
    readonly selectionEnd: number | null;
    /**
     * Sets the start and end positions of a selection in a text field.
     * @param start - Index of the start of the selection.
     * @param end - Index of the end of the selection.
     */
    setSelectionRange(start: number, end: number): void;
    private _warnControlledUsage;
    /** Returns `props.id` if available, or a fallback if not. */
    private readonly _id;
    private readonly _isControlled;
    private _onFocus;
    private _onBlur;
    private _onRenderLabel;
    private _onRenderDescription;
    private _onRenderPrefix;
    private _onRenderSuffix;
    /**
     * Current error message from either `props.errorMessage` or the result of `props.onGetErrorMessage`.
     *
     * - If there is no validation error or we have not validated the input value, errorMessage is an empty string.
     * - If we have done the validation and there is validation error, errorMessage is the validation error message.
     */
    private readonly _errorMessage;
    /**
     * If a custom description render function is supplied then treat description as always available.
     * Otherwise defer to the presence of description or error message text.
     */
    private readonly _isDescriptionAvailable;
    private _renderTextArea;
    private _renderInput;
    private _onInputChange;
    private _validate;
    private _notifyAfterValidate;
    private _adjustInputHeight;
}
