/** Raises a click event. */
export function raiseClick(target) {
    var event = createNewEvent('MouseEvents');
    event.initEvent('click', true, true);
    target.dispatchEvent(event);
}
function createNewEvent(eventName) {
    var event;
    if (typeof Event === 'function') {
        // Chrome, Opera, Firefox
        event = new Event(eventName);
    }
    else {
        // IE
        event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
    }
    return event;
}
//# sourceMappingURL=raiseClick.js.map