import { extendComponent } from './extendComponent';
/**
 * Helper to manage componentRef resolution. Internally appends logic to
 * lifetime methods to resolve componentRef to the passed in object.
 *
 * Usage: call initializeComponentRef(this) in the constructor,
 */
export function initializeComponentRef(obj) {
    extendComponent(obj, {
        componentDidMount: _onMount,
        componentDidUpdate: _onUpdate,
        componentWillUnmount: _onUnmount,
    });
}
function _onMount() {
    _setComponentRef(this.props.componentRef, this);
}
function _onUpdate(prevProps) {
    if (prevProps.componentRef !== this.props.componentRef) {
        // tslint:disable-next-line:no-any
        _setComponentRef(prevProps.componentRef, null);
        _setComponentRef(this.props.componentRef, this);
    }
}
function _onUnmount() {
    _setComponentRef(this.props.componentRef, null);
}
function _setComponentRef(componentRef, value) {
    if (componentRef) {
        if (typeof componentRef === 'object') {
            componentRef.current = value;
        }
        else if (typeof componentRef === 'function') {
            componentRef(value);
        }
    }
}
//# sourceMappingURL=initializeComponentRef.js.map