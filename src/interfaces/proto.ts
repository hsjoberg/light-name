// Manually extracted from a generated protobufjs typedef file

export namespace lnrpc {
  export interface IHopHint {

    /** The public key of the node at the start of the channel. */
    nodeId?: string;

    /** The unique identifier of the channel. */
    chanId?: number;

    /** The base fee of the channel denominated in millisatoshis. */
    feeBaseMsat?: number;

    /**
     * The fee rate of the channel for sending one satoshi across it denominated in
     * millionths of a satoshi.
     */
    feeProportionalMillionths?: number;

    /** The time-lock delta of the channel. */
    cltvExpiryDelta?: number;
  }

  export interface IRouteHint {

    /**
     * A list of hop hints that when chained together can assist in reaching a
     * specific destination.
     */
    hopHints?: IHopHint[];
  }
}