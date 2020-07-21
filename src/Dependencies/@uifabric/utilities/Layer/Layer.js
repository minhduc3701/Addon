import { styled } from "../index";
import { LayerBase } from "./Layer.base";
import { getStyles } from "./Layer.styles";
export var Layer = styled(LayerBase, getStyles, undefined, {
  scope: "Layer",
  fields: ["hostId", "theme", "styles"],
});
//# sourceMappingURL=Layer.js.map
