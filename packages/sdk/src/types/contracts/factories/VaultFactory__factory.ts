/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type { VaultFactory, VaultFactoryInterface } from '../VaultFactory';

const _abi = [
  {
    inputs: [],
    name: 'Create2CallFailed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidSingletonAddress',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'vault',
        type: 'address',
      },
    ],
    name: 'VaultCreated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_singleton',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'initializer',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: 'saltNonce',
        type: 'uint256',
      },
    ],
    name: 'createVaultWithNonce',
    outputs: [
      {
        internalType: 'contract Vault',
        name: 'vault',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getChainId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'vaultCreationCode',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
] as const;

export class VaultFactory__factory {
  static readonly abi = _abi;
  static createInterface(): VaultFactoryInterface {
    return new utils.Interface(_abi) as VaultFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VaultFactory {
    return new Contract(address, _abi, signerOrProvider) as VaultFactory;
  }
}
