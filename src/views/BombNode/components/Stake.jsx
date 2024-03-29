import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import DepositModal from './DepositModal';

import CardIcon from '../../../components/CardIcon';
import { AddIcon } from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useStake from '../../../hooks/useStake';
import useNodePrice from '../../../hooks/useNodePrice';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../../utils/formatBalance';
import TokenSymbol from '../../../components/TokenSymbol';
import MetamaskFox from '../../../assets/img/metamask-fox.svg';
import useBombFinance from '../../../hooks/useBombFinance';

const Stake = ({ bank }) => {
  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);
  const grapeFinance = useBombFinance();
  const tokenBalance = useTokenBalance(bank.depositToken);
  const nodePrice = useNodePrice(bank.contract, bank.poolId, bank.sectionInUI);
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);

  const tokenPriceInDollars = useMemo(
    () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
    [stakedTokenPriceInDollars],
  );
  const earnedInDollars = (
    Number(tokenPriceInDollars) * Number(getDisplayBalance(nodePrice, bank.depositToken.decimal))
  ).toFixed(2);
  const { onStake } = useStake(bank);


  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      bank={bank}
      max={tokenBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onStake(amount);
        onDismissDeposit();
      }}
      tokenName={bank.depositTokenName}
    />,
  );



  return (
    <Card>
      <CardContent>

        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              {
                bank.depositTokenName == 'BOMB-BTCB-LP'
                  ? <TokenSymbol symbol={'BOMB-BTCB-LP'} size={54} />
                  : <TokenSymbol symbol={'BOMB'} size={54} />
              }

            </CardIcon>
            <Typography >
              <Value value={getDisplayBalance(nodePrice, bank.depositToken.decimal, 1)} />
            </Typography>

            <Label text={`≈ $${earnedInDollars}`} variant="yellow" />

            <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>{`${bank.earnTokenName} NODE COST`}</Typography>
          </StyledCardHeader>
          <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED ? (
              <Button
                disabled={
                  bank.closedForStaking ||
                  approveStatus === ApprovalState.PENDING ||
                  approveStatus === ApprovalState.UNKNOWN
                }
                onClick={approve}
                className={
                  bank.closedForStaking ||
                    approveStatus === ApprovalState.PENDING ||
                    approveStatus === ApprovalState.UNKNOWN
                    ? 'shinyButtonDisabled'
                    : 'shinyButton'
                }
                style={{ marginTop: '20px' }}
              >
                {`Approve ${bank.depositTokenName}`}
              </Button>
            ) : (
              <IconButton
                disabled={bank.closedForStaking}
                onClick={() => (bank.closedForStaking ? null : onPresentDeposit())}
              >
                <AddIcon />
              </IconButton>
            )
            }
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  width: 100%;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
