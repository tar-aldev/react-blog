import blockNodesPlugin from "./blockNodes.plugin";
import hotKeysPlugin from "./hotKeys.plugin";
import markNodesPlugin from "./markNodes.plugin";

export default [...blockNodesPlugin, ...hotKeysPlugin, ...markNodesPlugin];
