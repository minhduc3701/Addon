/* tslint:disable:no-string-literal */
import { assign } from "./object";
/** An instance of EventGroup allows anything with a handle to it to trigger events1 on it.
 *  If the target is an HTMLElement, the event will be attached to the element and can be
 *  triggered as usual (like clicking for onClick).
 *  The event can be triggered by calling EventGroup.raise() here. If the target is an
 *  HTMLElement, the event gets raised and is handled by the browser. Otherwise, it gets
 *  handled here in EventGroup, and the handler is called in the context of the parent
 *  (which is passed in in the constructor).
 *
 * @public
 * {@docCategory EventGroup}
 */
var EventGroup = /** @class */ (function () {
  /** parent: the context in which events attached to non-HTMLElements are called */
  // tslint:disable-next-line:no-any
  function EventGroup(parent) {
    this._id = EventGroup._uniqueId++;
    this._parent = parent;
    this._eventRecords = [];
  }
  /** For IE8, bubbleEvent is ignored here and must be dealt with by the handler.
   *  Events raised here by default have bubbling set to false and cancelable set to true.
   *  This applies also to built-in events being raised manually here on HTMLElements,
   *  which may lead to unexpected behavior if it differs from the defaults.
   *
   */
  EventGroup.raise = function (
    // tslint:disable-next-line:no-any
    target,
    eventName,
    // tslint:disable-next-line:no-any
    eventArgs,
    bubbleEvent
  ) {
    var retVal;
    if (EventGroup._isElement(target)) {
      if (typeof document !== "undefined" && document.createEvent) {
        var ev = document.createEvent("HTMLEvents");
        ev.initEvent(eventName, bubbleEvent || false, true);
        assign(ev, eventArgs);
        retVal = target.dispatchEvent(ev);
        // tslint:disable-next-line:no-any
      } else if (
        typeof document !== "undefined" &&
        document["createEventObject"]
      ) {
        // IE8
        // tslint:disable-next-line:no-any
        var evObj = document["createEventObject"](eventArgs);
        // cannot set cancelBubble on evObj, fireEvent will overwrite it
        target.fireEvent("on" + eventName, evObj);
      }
    } else {
      while (target && retVal !== false) {
        var events = target.__events__;
        var eventRecords = events ? events[eventName] : null;
        if (eventRecords) {
          for (var id in eventRecords) {
            if (eventRecords.hasOwnProperty(id)) {
              var eventRecordList = eventRecords[id];
              for (
                var listIndex = 0;
                retVal !== false && listIndex < eventRecordList.length;
                listIndex++
              ) {
                var record = eventRecordList[listIndex];
                if (record.objectCallback) {
                  retVal = record.objectCallback.call(record.parent, eventArgs);
                }
              }
            }
          }
        }
        // If the target has a parent, bubble the event up.
        target = bubbleEvent ? target.parent : null;
      }
    }
    return retVal;
  };
  // tslint:disable-next-line:no-any
  EventGroup.isObserved = function (target, eventName) {
    var events = target && target.__events__;
    return !!events && !!events[eventName];
  };
  /** Check to see if the target has declared support of the given event. */
  // tslint:disable-next-line:no-any
  EventGroup.isDeclared = function (target, eventName) {
    var declaredEvents = target && target.__declaredEvents;
    return !!declaredEvents && !!declaredEvents[eventName];
  };
  // tslint:disable-next-line:no-any
  EventGroup.stopPropagation = function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      // IE8
      event.cancelBubble = true;
    }
  };
  EventGroup._isElement = function (target) {
    return (
      !!target &&
      (!!target.addEventListener ||
        (typeof HTMLElement !== "undefined" && target instanceof HTMLElement))
    );
  };
  EventGroup.prototype.dispose = function () {
    if (!this._isDisposed) {
      this._isDisposed = true;
      this.off();
      this._parent = null;
    }
  };
  /** On the target, attach a set of events, where the events object is a name to function mapping. */
  // tslint:disable-next-line:no-any
  EventGroup.prototype.onAll = function (target, events, useCapture) {
    for (var eventName in events) {
      if (events.hasOwnProperty(eventName)) {
        this.on(target, eventName, events[eventName], useCapture);
      }
    }
  };
  /**
   * On the target, attach an event whose handler will be called in the context of the parent
   * of this instance of EventGroup.
   */
  EventGroup.prototype.on = function (
    target, // tslint:disable-line:no-any
    eventName,
    callback, // tslint:disable-line:no-any
    options
  ) {
    var _this = this;
    if (eventName.indexOf(",") > -1) {
      var events = eventName.split(/[ ,]+/);
      for (var i = 0; i < events.length; i++) {
        this.on(target, events[i], callback, options);
      }
    } else {
      var parent_1 = this._parent;
      var eventRecord = {
        target: target,
        eventName: eventName,
        parent: parent_1,
        callback: callback,
        options: options,
      };
      // Initialize and wire up the record on the target, so that it can call the callback if the event fires.
      var events1 = (target.__events__ = target.__events__ || {});
      events1[eventName] = events1[eventName] || {
        count: 0,
      };
      events1[eventName][this._id] = events1[eventName][this._id] || [];
      events1[eventName][this._id].push(eventRecord);
      events1[eventName].count++;
      if (EventGroup._isElement(target)) {
        // tslint:disable-next-line:no-any
        var processElementEvent = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          if (_this._isDisposed) {
            return;
          }
          var result;
          try {
            result = callback.apply(parent_1, args);
            if (result === false && args[0]) {
              var e = args[0];
              if (e.preventDefault) {
                e.preventDefault();
              }
              if (e.stopPropagation) {
                e.stopPropagation();
              }
              e.cancelBubble = true;
            }
          } catch (e) {
            /* ErrorHelper.log(e); */
          }
          return result;
        };
        eventRecord.elementCallback = processElementEvent;
        if (target.addEventListener) {
          /* tslint:disable:ban-native-functions */
          target.addEventListener(eventName, processElementEvent, options);
          /* tslint:enable:ban-native-functions */
        } else if (target.attachEvent) {
          // IE8
          target.attachEvent("on" + eventName, processElementEvent);
        }
      } else {
        // tslint:disable-next-line:no-any
        var processObjectEvent = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          if (_this._isDisposed) {
            return;
          }
          return callback.apply(parent_1, args);
        };
        eventRecord.objectCallback = processObjectEvent;
      }
      // Remember the record locally, so that it can be removed.
      this._eventRecords.push(eventRecord);
    }
  };
  EventGroup.prototype.off = function (
    target, // tslint:disable-line:no-any
    eventName,
    callback, // tslint:disable-line:no-any
    options
  ) {
    for (var i = 0; i < this._eventRecords.length; i++) {
      var eventRecord = this._eventRecords[i];
      if (
        (!target || target === eventRecord.target) &&
        (!eventName || eventName === eventRecord.eventName) &&
        (!callback || callback === eventRecord.callback) &&
        (typeof options !== "boolean" || options === eventRecord.options)
      ) {
        var events1 = eventRecord.target.__events__;
        var targetArrayLookup = events1[eventRecord.eventName];
        var targetArray = targetArrayLookup
          ? targetArrayLookup[this._id]
          : null;
        // We may have already target's entries, so check for null.
        if (targetArray) {
          if (targetArray.length === 1 || !callback) {
            targetArrayLookup.count -= targetArray.length;
            delete events1[eventRecord.eventName][this._id];
          } else {
            targetArrayLookup.count--;
            targetArray.splice(targetArray.indexOf(eventRecord), 1);
          }
          if (!targetArrayLookup.count) {
            delete events1[eventRecord.eventName];
          }
        }
        if (eventRecord.elementCallback) {
          if (eventRecord.target.removeEventListener) {
            eventRecord.target.removeEventListener(
              eventRecord.eventName,
              eventRecord.elementCallback,
              eventRecord.options
            );
          } else if (eventRecord.target.detachEvent) {
            // IE8
            eventRecord.target.detachEvent(
              "on" + eventRecord.eventName,
              eventRecord.elementCallback
            );
          }
        }
        this._eventRecords.splice(i--, 1);
      }
    }
  };
  /** Trigger the given event in the context of this instance of EventGroup. */
  // tslint:disable-next-line:no-any
  EventGroup.prototype.raise = function (eventName, eventArgs, bubbleEvent) {
    return EventGroup.raise(this._parent, eventName, eventArgs, bubbleEvent);
  };
  /** Declare an event as being supported by this instance of EventGroup. */
  EventGroup.prototype.declare = function (event) {
    var declaredEvents = (this._parent.__declaredEvents =
      this._parent.__declaredEvents || {});
    if (typeof event === "string") {
      declaredEvents[event] = true;
    } else {
      for (var i = 0; i < event.length; i++) {
        declaredEvents[event[i]] = true;
      }
    }
  };
  EventGroup._uniqueId = 0;
  return EventGroup;
})();
export { EventGroup };
//# sourceMappingURL=EventGroup.js.map
