Generated with discovered.json: 0x05f3ebb5712b0e093b826ca60272e24451766c70

# Diff at Wed, 18 Sep 2024 11:17:11 GMT:

- author: Luca Donno (<donnoh99@gmail.com>)
- current block number: 20777124

## Description

Initial discovery.

## Initial discovery

```diff
+   Status: CREATED
    contract L2OutputOracle (0x012f4baa6e0F5Ac4dFDF47BDdd9CF68a2B17821e)
    +++ description: Contains a list of proposed state roots which Proposers assert to be a result of block execution. Currently only the PROPOSER address can submit new state roots.
```

```diff
+   Status: CREATED
    contract L1ERC721Bridge (0x1b396e4dC6ECB0be33CF01C5a34E1a3a7D03c378)
    +++ description: Used to bridge ERC-721 tokens from host chain to this chain.
```

```diff
+   Status: CREATED
    contract SuperchainConfig (0x34bb53D7C525114A27F0FE2aF91bdDAd186abb12)
    +++ description: Used to manage global configuration values for multiple OP Chains within a single Superchain network. The SuperchainConfig contract manages the `PAUSED_SLOT`, a boolean value indicating whether the Superchain is paused, and `GUARDIAN_SLOT`, the address of the guardian which can pause and unpause the system.
```

```diff
+   Status: CREATED
    contract ProxyAdmin (0x38593Cce8FaB9887Ef9760f5F6aB3d6C595143cF)
    +++ description: None
```

```diff
+   Status: CREATED
    contract TBHMultisig (0x48EC051349dDc7E8baBafCBfe27696ECF2A8a8B3)
    +++ description: None
```

```diff
+   Status: CREATED
    contract OptimismPortal (0x5ff88fcF8e9947f45F4cAf8FFd5231B5DdF05e0A)
    +++ description: The main entry point to deposit funds from host chain to this chain. It also allows to prove and finalize withdrawals.
```

```diff
+   Status: CREATED
    contract SystemConfig (0x7aC7e5989EaC278B7BbfeF560871a2026baD472c)
    +++ description: Contains configuration parameters such as the Sequencer address, gas limit on this chain and the unsafe block signer address.
```

```diff
+   Status: CREATED
    contract L1CrossDomainMessenger (0x807d21e416434ae92c8E5bcA4d506781aFbBa380)
    +++ description: Sends messages from host chain to this chain, and relays messages back onto host chain. In the event that a message sent from host chain to this chain is rejected for exceeding this chain's epoch gas limit, it can be resubmitted via this contract's replay function.
```

```diff
+   Status: CREATED
    contract AddressManager (0x8173904703995c6BbA59a42B8bBf8405F978758a)
    +++ description: None
```

```diff
+   Status: CREATED
    contract OptimismMintableERC20Factory (0xa641e14B685b5E652865e14A4fBc07e51371D124)
    +++ description: A helper contract that generates OptimismMintableERC20 contracts on the network it's deployed to. OptimismMintableERC20 is a standard extension of the base ERC20 token contract designed to allow the L1StandardBridge contracts to mint and burn tokens. This makes it possible to use an OptimismMintablERC20 as this chain's representation of a token on the host chain, or vice-versa.
```

```diff
+   Status: CREATED
    contract L1StandardBridge (0xD1B30378CBF968E5525e8835219A5726A1e71D10)
    +++ description: The main entry point to deposit ERC20 tokens from host chain to this chain. This contract can store any token.
```
