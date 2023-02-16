import { Modal, useModal } from '../../context/Modal';
import {
  ModalOutterWrapper,
  ModalBackdrop,
  ModalInnerWrapper,
  ModalHeader,
  ModalContentWithNoPadding,
  Step,
  ModalTitle,
} from './styles';
import { ContractReceipt, ContractTransaction } from 'ethers';
import { getExplorerLink } from '../../utils';
import { ChainId } from 'dca-sdk';

export enum CreateVaultAndDepositStep {
  APPROVE_FACTORY,
  CREATE_ORDER,
}

export type VaultCreateAndDepositStepsModalProps = {
  stepsCompleted: CreateVaultAndDepositStep[];
  // Approve factory
  approveFactoryTransaction?: ContractTransaction;
  approveFactoryReceipt?: ContractReceipt;
  // Vault creation
  createOrderTransaction?: ContractTransaction;
  createOrderReceipt?: ContractReceipt;
  vault?: string;
  // Required
  tokenSymbol: string;
  tokenDepositAmount: number;
  chainId: ChainId;
};

export function CreateVaultStepsModal() {
  const { modal, data, closeModal } =
    useModal<VaultCreateAndDepositStepsModalProps>();

  if (modal === null || modal !== Modal.VaultCreateAndDepositSteps) {
    return null;
  }

  if (data === null) {
    throw new Error('No data provided to modal. Expected vault data.');
  }

  const {
    approveFactoryTransaction,
    approveFactoryReceipt,
    createOrderTransaction,
    createOrderReceipt,
    stepsCompleted,
    chainId,
  } = data;

  const isFactoryApproved =
    approveFactoryReceipt &&
    stepsCompleted.includes(CreateVaultAndDepositStep.APPROVE_FACTORY)
      ? true
      : false;

  const isOrderCreated =
    createOrderReceipt &&
    stepsCompleted.includes(CreateVaultAndDepositStep.CREATE_ORDER)
      ? true
      : false;

  const approveFactoryTransactionLink = approveFactoryTransaction
    ? getExplorerLink(chainId, approveFactoryTransaction.hash, 'transaction')
    : undefined;

  const createOrderTransactionLink = createOrderTransaction
    ? getExplorerLink(chainId, createOrderTransaction.hash, 'transaction')
    : undefined;

  return (
    <ModalBackdrop onClick={closeModal}>
      <ModalOutterWrapper maxWidth="500px" onClick={(e) => e.stopPropagation()}>
        <ModalInnerWrapper>
          <ModalHeader>
            <ModalTitle>Create New DCA Order</ModalTitle>
          </ModalHeader>
          <ModalContentWithNoPadding>
            {isFactoryApproved ? (
              <Step
                href={approveFactoryTransactionLink}
                isSuccess={true}
                target="_blank"
                rel="noopener noreferrer"
              >
                Approved Factory
              </Step>
            ) : approveFactoryTransaction ? (
              <Step
                href={approveFactoryTransactionLink}
                isBusy={true}
                target="_blank"
                rel="noopener noreferrer"
              >
                Approving Factory
              </Step>
            ) : (
              <Step isBusy={true}>Approving Factory</Step>
            )}
            {isOrderCreated ? (
              <Step
                href={createOrderTransactionLink}
                isSuccess={true}
                target="_blank"
                rel="noopener noreferrer"
              >
                Created Order
              </Step>
            ) : createOrderTransaction ? (
              <Step
                href={createOrderTransactionLink}
                isBusy={true}
                target="_blank"
                rel="noopener noreferrer"
              >
                Creating Order
              </Step>
            ) : (
              <Step>Create Order</Step>
            )}
          </ModalContentWithNoPadding>
        </ModalInnerWrapper>
      </ModalOutterWrapper>
    </ModalBackdrop>
  );
}
