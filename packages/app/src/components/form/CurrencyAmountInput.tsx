import { Amount, Currency, USDC } from 'dca-sdk';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { InputGroup } from './InputGroup';
import { NumberInput } from './NumberInput';
import { SelectBalanceButtonContainer } from '../SelectBalanceButtonContainer';
import { CurrencySearchModal } from '../SearchModal/CurrencySearchModal';
import { useNetwork } from 'wagmi';

interface CurrencyAmountInputProps {
  value?: Amount<Currency>;
  onChange: (tokenAmount: Amount<Currency>) => void;
  /**
   * User's address. If provided, the user's balance will be shown.
   */
  userAddress?: string;
  /**
   * Chain ID. If provided, the user's balance will be shown.
   */
  chainId?: number;
  showNativeCurrency?: boolean;
  disabled?: boolean;
}

export function CurrencyAmountInput({
  value,
  onChange,
  userAddress,
  showNativeCurrency,
  disabled,
}: CurrencyAmountInputProps) {
  const { chain } = useNetwork();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const handleDismissSearch = useCallback(() => {
    setIsSearchModalOpen(false);
  }, [setIsSearchModalOpen]);
  // Start with USDC
  const [currencyAmount, setCurrencyAmount] = useState<Amount<Currency>>(
    value || new Amount(USDC[1], '0') // Start with USDC if no value is provided
  );

  // Close the search modal if the chain changes
  useEffect(() => {
    setIsSearchModalOpen(false);
    return;
  }, [chain]);

  return (
    <CurrencyAmountInputInnerWrapper>
      <InputGroup>
        <TokenButton
          disabled={disabled}
          type="button"
          onClick={() => setIsSearchModalOpen(true)}
        >
          {currencyAmount.currency.symbol}
        </TokenButton>
        <NumberInput
          disabled={disabled}
          value={currencyAmount.toString()}
          onChange={(nextSellAmount) => {
            const nextCurrencyAmount = new Amount(
              currencyAmount.currency,
              nextSellAmount
            );
            setCurrencyAmount(nextCurrencyAmount);
            onChange(nextCurrencyAmount);
          }}
        />
        <CurrencySearchModal
          isOpen={isSearchModalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={(nextCurrency) => {
            const nextCurrencyAmount = Amount.fromRawAmount(
              nextCurrency,
              currencyAmount.toRawAmount()
            );
            setCurrencyAmount(nextCurrencyAmount);
            onChange(nextCurrencyAmount);
            handleDismissSearch();
          }}
          selectedCurrency={currencyAmount.currency}
          showCommonBases={true}
          showCurrencyAmount={true}
          showNativeCurrency={showNativeCurrency}
          disableNonToken={false}
        />
      </InputGroup>
      {userAddress && !disabled ? (
        <SelectBalanceButtonContainer
          currency={currencyAmount.currency}
          userAddress={userAddress}
          onBalanceSelect={(userBalance) => {
            if (disabled) return;
            const nextCurrencyAmount = userBalance;
            setCurrencyAmount(nextCurrencyAmount);
            onChange(nextCurrencyAmount);
          }}
        />
      ) : null}
    </CurrencyAmountInputInnerWrapper>
  );
}

const CurrencyAmountInputInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TokenButton = styled.button`
  border-radius: 0;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
  border: 2px solid #000;
  padding: 8px 8px;
  font-weight: 600;
`;
