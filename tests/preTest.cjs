const { LocalNode } = require("../src/cli");

module.exports = async function setup() {
  // Skip localnet startup if using a remote network
  const network = process.env.MOVEMENT_NETWORK;
  const remoteNetworks = ["testnet", "devnet", "mainnet", "shelbynet", "netna"];

  if (network && remoteNetworks.includes(network)) {
    console.log(`Using remote network: ${network}, skipping localnet startup`);
    globalThis.__LOCAL_NODE__ = { process: null };
    return;
  }

  const localNode = new LocalNode();
  globalThis.__LOCAL_NODE__ = localNode;
  await localNode.run();
};
