import { __assign, __spreadArrays } from "tslib";
import * as React from "react";
import { useConst, usePrevious } from "@uifabric/react-hooks";
import { mergeAriaAttributeValues } from "@uifabric/utilities";
import {
  KeytipManager,
  mergeOverflows,
  sequencesToID,
  getAriaDescribedBy,
} from "../keytips/index";
export function useKeytipData(options) {
  var _a, _b;
  var uniqueId = React.useRef();
  var keytipProps = options.keytipProps
    ? __assign({ disabled: options.disabled }, options.keytipProps)
    : undefined;
  var keytipManager = useConst(KeytipManager.getInstance());
  React.useEffect(
    function () {
      // Register Keytip in KeytipManager
      if (keytipProps) {
        uniqueId.current = keytipManager.register(keytipProps);
      }
      return function () {
        // Unregister Keytip in KeytipManager
        keytipProps && keytipManager.unregister(keytipProps, uniqueId.current);
      };
    },
    [keytipManager, keytipProps]
  );
  var prevOptions = usePrevious(options);
  if (
    uniqueId.current &&
    keytipProps &&
    (((_a = prevOptions) === null || _a === void 0
      ? void 0
      : _a.keytipProps) !== options.keytipProps ||
      ((_b = prevOptions) === null || _b === void 0 ? void 0 : _b.disabled) !==
        options.disabled)
  ) {
    keytipManager.update(keytipProps, uniqueId.current);
  }
  var nativeKeytipProps = {
    ariaDescribedBy: undefined,
    targetElementAttributes: {},
    executeElementAttributes: {},
  };
  if (keytipProps) {
    nativeKeytipProps = getKtpAttrs(
      keytipManager,
      keytipProps,
      options.ariaDescribedBy
    );
  }
  return nativeKeytipProps;
}
/**
 * Gets the aria- and data- attributes to attach to the component
 * @param keytipProps - options for Keytip
 * @param describedByPrepend - ariaDescribedBy value to prepend
 */
function getKtpAttrs(keytipManager, keytipProps, describedByPrepend) {
  // Add the parent overflow sequence if necessary
  var newKeytipProps = keytipManager.addParentOverflow(keytipProps);
  // Construct aria-describedby and data-ktp-id attributes
  var ariaDescribedBy = mergeAriaAttributeValues(
    describedByPrepend,
    getAriaDescribedBy(newKeytipProps.keySequences)
  );
  var keySequences = __spreadArrays(newKeytipProps.keySequences);
  if (newKeytipProps.overflowSetSequence) {
    keySequences = mergeOverflows(
      keySequences,
      newKeytipProps.overflowSetSequence
    );
  }
  var ktpId = sequencesToID(keySequences);
  return {
    ariaDescribedBy: ariaDescribedBy,
    targetElementAttributes: {
      "data-ktp-target": ktpId,
    },
    executeElementAttributes: {
      "data-ktp-execute-target": ktpId,
    },
  };
}
//# sourceMappingURL=useKeytipData.js.map
