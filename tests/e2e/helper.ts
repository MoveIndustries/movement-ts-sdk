import { Movement, MovementConfig, MovementSettings, Network, NetworkToNetworkName } from "../../src";

/**
 * Use this function whenever you want a Movement client.
 *
 * By default it uses Network.LOCAL. You can change this in one of two ways:
 *
 * 1. If you set the MOVEMENT_NETWORK env var, it will use that Network. For example,
 *    export MOVEMENT_NETWORK=testnet.
 * 2. For more control, you can set the MOVEMENT_NODE_API_URL, MOVEMENT_INDEXER_API_URL, and
 *    MOVEMENT_FAUCET_API_URL env vars.
 *
 * The MOVEMENT_NETWORK env var is applied first, followed by the others. So if you set
 * MOVEMENT_NETWORK=testnet and MOVEMENT_NODE_API_URL=http://localhost:8080, it will use the
 * given URL for the node API and the default URLs for testnet for the other APIs.
 */
export function getMovementClient(additionalConfig?: MovementSettings): { movement: Movement; config: MovementConfig } {
  const networkRaw = process.env.MOVEMENT_NETWORK;
  const network = networkRaw ? NetworkToNetworkName[networkRaw] : Network.LOCAL;
  if (!network) {
    throw new Error(`Unknown network, confirm MOVEMENT_NETWORK env var is valid: ${networkRaw}`);
  }
  const config = new MovementConfig({
    network,
    fullnode: process.env.MOVEMENT_NODE_API_URL,
    indexer: process.env.MOVEMENT_INDEXER_API_URL,
    faucet: process.env.MOVEMENT_FAUCET_API_URL,
    ...additionalConfig,
  });
  const movement = new Movement(config);
  return { movement, config };
}
