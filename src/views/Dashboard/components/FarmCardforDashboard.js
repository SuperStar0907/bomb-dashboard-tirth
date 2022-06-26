import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Typography, Grid } from '@material-ui/core';
import styled from 'styled-components';
import TokenSymbol from '../../../components/TokenSymbol';
import { useWallet } from 'use-wallet';
import UnlockWallet from '../../../components/UnlockWallet';
import { Bank as BankEntity } from '../../../bomb-finance';
import useBombFinance from '../../../hooks/useBombFinance';
import bombbitcoinLogo from '../../../assets/img/bomb-bitcoin-LP.png';
import bsharebnbLogo from '../../../assets/img/bshare-bnb-LP.png';
import bshares from '../../../assets/img/bshares.png';
import bomb from '../../../assets/img/bomb.png';
import useRedeem from '../../../hooks/useRedeem';
import useStatsForPool from '../../../hooks/useStatsForPool';
import useBombStats from '../../../hooks/useBombStats';
import useShareStats from '../../../hooks/usebShareStats';
import useEarnings from '../../../hooks/useEarnings';
import useHarvest from '../../../hooks/useHarvest';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useTokenBalance from '../../../hooks/useTokenBalance';
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import useModal from '../../../hooks/useModal';
import useStake from '../../../hooks/useStake';
import useZap from '../../../hooks/useZap';
import useWithdraw from '../../../hooks/useWithdraw';
const FarmCard = ({ bank }) => {
    const { account } = useWallet();
    const { onRedeem } = useRedeem(bank);
    let depositToken = bank.depositTokenName.toUpperCase();
    let statsOnPool = useStatsForPool(bank);
    if (depositToken === 'BOMB-BTCB-LP') {
        depositToken = 'BOMB-MAXI';
    }
    if (depositToken === 'BSHARE-BNB-LP') {
        depositToken = 'BSHARE-MAXI';
    }
    const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
    const { onReward } = useHarvest(bank);
    const bombStats = useBombStats();
    const tShareStats = useShareStats();
    const tokenName = bank.earnTokenName === 'BSHARE' ? 'BSHARE' : 'BOMB';
    const tokenStats = bank.earnTokenName === 'BSHARE' ? tShareStats : bombStats;
    const tokenPriceInDollars = useMemo(
        () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
        [tokenStats],
    );
    const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);
    const tokenBalance = useTokenBalance(bank.depositToken);
    const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
    const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);
    const StakedtokenPriceInDollars = useMemo(
        () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
        [stakedTokenPriceInDollars],
    );
    const stakedInDollars = (Number(StakedtokenPriceInDollars) * Number(getDisplayBalance(stakedBalance, bank.depositToken.decimal))).toFixed(2);
    const { onStake } = useStake(bank);
    const { onZap } = useZap(bank);
    const { onWithdraw } = useWithdraw(bank);

    const [onPresentDeposit, onDismissDeposit] = useModal(
        <DepositModal
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
    const [onPresentWithdraw, onDismissWithdraw] = useModal(
        <WithdrawModal
            max={stakedBalance}
            decimals={bank.depositToken.decimal}
            onConfirm={(amount) => {
                if (Number(amount) <= 0 || isNaN(Number(amount))) return;
                onWithdraw(amount);
                onDismissWithdraw();
            }}
            tokenName={bank.depositTokenName}
        />,
    );
    return (
        <>
            <Grid container spacing={0}>
                {depositToken.toUpperCase() === 'BOMB-MAXI' ? (<>
                    <Grid item xs={1} md={1} align="right">
                        <img src={bombbitcoinLogo} style={{ "height": "33px", marginRight: "10px" }} />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <a style={{
                            fontFamily: 'Nunito',
                            fontWeight: 700,
                            fontSize: '22px',
                            color: "#FFFFFF",
                        }} color="#FFFFFF" align="left">
                            BOMB-BTCB
                        </a>
                        <a style={{
                            "background": "rgba(0, 232, 162, 0.5)", "borderRadius": "3px", "marginLeft": "10px", paddingLeft: "5px", paddingRight: "5px", fontFamily: 'Nunito',
                            fontWeight: 600,
                            fontSize: '12px',
                            color: "#FFFFFF",
                        }}>Recommended</a>
                    </Grid>
                    <Grid item xs={5} md={5} align="right">
                        <a style={{
                            fontWeight: 400,
                            fontSize: '14px',
                            color: "#FFFFFF",
                            align: "right",
                            marginRight: "30px",
                        }} align="right">TVL: ${statsOnPool?.TVL}</a>
                    </Grid>
                    <hr
                        style={{
                            backgroundColor: "#FFFFFF",
                            Top: '0%',
                            width: "93%",
                            marginRight: "30px",

                        }}
                    />
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={0}>
                            <Grid item xs={5} md={5}>
                                <Grid container spacing={0}>
                                    <Grid item xs={4} md={4} align="center" style={{ marginLeft: "40px" }}>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            Daily Returns:
                                        </Typography>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 600,
                                            fontSize: '22px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            {bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            Your Stake:
                                        </Typography>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 800,
                                            fontSize: '16px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            <img src={bshares} style={{ "height": "16px" }} />{getDisplayBalance(stakedBalance, bank.depositToken.decimal)}
                                        </Typography>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            {`≈ $${stakedInDollars}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} md={3}>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            Earned:
                                        </Typography>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 800,
                                            fontSize: '16px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            <img src={bomb} style={{ "height": "16px" }} />{getDisplayBalance(earnings)}
                                        </Typography>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            {`≈ $${earnedInDollars}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} md={2}></Grid>
                            <Grid item xs={5} md={5} align="center" style={{ marginTop: "1%" }}>
                                <Grid container spacing={0}>
                                    <Grid item xs={3} md={3} align="left">
                                        <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #FFFFFF", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "90%", cursor: "pointer" }} onClick={() => (bank.closedForStaking ? null : onPresentDeposit())}>
                                            <a style={{
                                                fontFamily: 'Nunito',
                                                fontWeight: 400,
                                                fontSize: '15px',
                                                color: "#FFFFFF",
                                                marginLeft: "5px",
                                            }} color="#FFFFFF" align="left">
                                                Deposit
                                            </a><a style={{
                                                backgroundColor: "#FFFFFF",
                                                width: "20px",
                                                height: "20px",
                                                borderRadius: "50%",
                                                textAlign: "center",
                                                float: "right",
                                                color: "#149EE3"
                                            }} align="right">&uarr;</a></div>
                                    </Grid>
                                    <Grid item xs={3} md={3} align="left">
                                        <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #FFFFFF", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "90%", cursor: "pointer" }} onClick={onPresentWithdraw}>
                                            <a style={{
                                                fontFamily: 'Nunito',
                                                fontWeight: 400,
                                                fontSize: '15px',
                                                color: "#FFFFFF",
                                                marginLeft: "2px",
                                            }} color="#FFFFFF" align="left">
                                                Withdraw
                                            </a><a style={{
                                                backgroundColor: "#FFFFFF",
                                                width: "20px",
                                                height: "20px",
                                                borderRadius: "50%",
                                                textAlign: "center",
                                                float: "right",
                                                color: "#149EE3"
                                            }} align="right">&darr;</a></div>
                                    </Grid>
                                    <Grid item xs={5} md={5} align="left">
                                        <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #FFFFFF", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "95%", cursor: "pointer" }} onClick={onRedeem}>
                                            <Typography style={{
                                                fontFamily: 'Nunito',
                                                fontWeight: 400,
                                                fontSize: '15px',
                                                color: "#FFFFFF",
                                                marginLeft: "5px"
                                            }} color="#FFFFFF" align="center">
                                                Claim Rewards <img src={bshares} style={{ "height": "12px" }} />
                                            </Typography></div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <hr
                        style={{
                            backgroundColor: "#FFFFFF",
                            Top: '0%',
                            width: "98%",
                            marginRight: "11px",
                            "border": "0.5px solid #00ADE8",
                        }}
                    />
                </>
                ) : (<>
                    <Grid item xs={1} md={1} align="right">
                        <img src={bsharebnbLogo} style={{ "height": "33px", marginRight: "10px" }} />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <a style={{
                            fontFamily: 'Nunito',
                            fontWeight: 700,
                            fontSize: '22px',
                            color: "#FFFFFF",
                        }} color="#FFFFFF" align="left">
                            BSHARE-BNB
                        </a>
                        <a style={{
                            "background": "rgba(0, 232, 162, 0.5)", "borderRadius": "3px", "marginLeft": "10px", paddingLeft: "5px", paddingRight: "5px", fontFamily: 'Nunito',
                            fontWeight: 600,
                            fontSize: '12px',
                            color: "#FFFFFF",
                        }}>Recommended</a>
                    </Grid>
                    <Grid item xs={5} md={5} align="right">
                        <a style={{
                            fontWeight: 400,
                            fontSize: '14px',
                            color: "#FFFFFF",
                            align: "right",
                            marginRight: "30px",
                        }} align="right">TVL: ${statsOnPool?.TVL}</a>
                    </Grid>
                    <hr
                        style={{
                            backgroundColor: "#FFFFFF",
                            Top: '0%',
                            width: "93%",
                            marginRight: "30px"
                        }}
                    />
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={0}>
                            <Grid item xs={5} md={5}>
                                <Grid container spacing={0}>
                                    <Grid item xs={4} md={4} align="center" style={{ marginLeft: "40px" }}>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            Daily Returns:
                                        </Typography>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 600,
                                            fontSize: '22px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            {bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            Your Stake:
                                        </Typography>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 800,
                                            fontSize: '16px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            <img src={bshares} style={{ "height": "16px" }} />{getDisplayBalance(stakedBalance, bank.depositToken.decimal)}
                                        </Typography>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            {`≈ $${stakedInDollars}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} md={3} style={{ marginBottom: "10px" }}>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            Earned:
                                        </Typography>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 800,
                                            fontSize: '16px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            <img src={bomb} style={{ "height": "16px" }} />{getDisplayBalance(earnings)}
                                        </Typography>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            {`≈ $${earnedInDollars}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} md={2}></Grid>
                            <Grid item xs={5} md={5} align="center" style={{ marginTop: "1%" }}>
                                <Grid container spacing={0}>
                                    <Grid item xs={3} md={3} align="left">
                                        <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #FFFFFF", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "90%", cursor: "pointer" }}onClick={() => (bank.closedForStaking ? null : onPresentDeposit())}>
                                            <a style={{
                                                fontFamily: 'Nunito',
                                                fontWeight: 400,
                                                fontSize: '15px',
                                                color: "#FFFFFF",
                                                marginLeft: "5px",
                                            }} color="#FFFFFF" align="left">
                                                Deposit
                                            </a><a style={{
                                                backgroundColor: "#FFFFFF",
                                                width: "20px",
                                                height: "20px",
                                                borderRadius: "50%",
                                                textAlign: "center",
                                                float: "right",
                                                color: "#149EE3"
                                            }} align="right">&uarr;</a></div>
                                    </Grid>
                                    <Grid item xs={3} md={3} align="left">
                                        <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #FFFFFF", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "90%", cursor: "pointer" }} onClick={onPresentWithdraw}>
                                            <a style={{
                                                fontFamily: 'Nunito',
                                                fontWeight: 400,
                                                fontSize: '15px',
                                                color: "#FFFFFF",
                                                marginLeft: "2px",
                                            }} color="#FFFFFF" align="left">
                                                Withdraw
                                            </a><a style={{
                                                backgroundColor: "#FFFFFF",
                                                width: "20px",
                                                height: "20px",
                                                borderRadius: "50%",
                                                textAlign: "center",
                                                float: "right",
                                                color: "#149EE3"
                                            }} align="right">&darr;</a></div>
                                    </Grid>
                                    <Grid item xs={5} md={5} align="left">
                                        <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #FFFFFF", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "95%", cursor: "pointer" }}onClick={onRedeem}>
                                            <Typography style={{
                                                fontFamily: 'Nunito',
                                                fontWeight: 400,
                                                fontSize: '15px',
                                                color: "#FFFFFF",
                                                marginLeft: "5px"
                                            }} color="#FFFFFF" align="center">
                                                Claim Rewards <img src={bshares} style={{ "height": "12px" }} />
                                            </Typography></div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
                )}
            </Grid>


        </>
    );
};
const LPTokenHelpText = ({ bank }) => {
    const bombFinance = useBombFinance();
    const bombAddr = bombFinance.BOMB.address;
    const bshareAddr = bombFinance.BSHARE.address;
    const busmAddr = bombFinance.BUSM.address;
    const busdAddr = bombFinance.BUSD.address;

    //const depositToken = bank.depositTokenName;
    //console.log({depositToken})
    let pairName;
    let uniswapUrl;
    // let vaultUrl: string;
    if (bank.depositTokenName.includes('BOMB-BTCB')) {
        pairName = 'BOMB-BTCB pair';
        uniswapUrl = 'https://pancakeswap.finance/add/0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c/' + bombAddr;
        //   vaultUrl = 'https://www.bomb.farm/#/bsc/vault/bomb-bomb-btcb';
    } else if (bank.depositTokenName.includes('80BOMB-20BTCB-LP')) {
        pairName = 'BOMB MAXI 80% BOMB - 20% BTCB (at ACSI.finance)';
        uniswapUrl =
            'https://app.acsi.finance/#/pool/0xd6f52e8ab206e59a1e13b3d6c5b7f31e90ef46ef000200000000000000000028/invest';
        //   vaultUrl = 'https://www.bomb.farm/#/bsc/vault/bomb-bomb-btcb';
    } else if (bank.depositTokenName.includes('80BSHARE-20WBNB-LP')) {
        pairName = 'BSHARE MAXI 80% BSHARE - 20% BNB (at ACSI.finance)';
        uniswapUrl =
            'https://app.acsi.finance/#/pool/0x2c374ed1575e5c2c02c569f627299e902a1972cb000200000000000000000027/invest';
        //   vaultUrl = 'https://www.bomb.farm/#/bsc/vault/bomb-bomb-btcb';
    } else if (bank.depositTokenName.includes('BOMB-BSHARE')) {
        pairName = 'BOMB-BSHARE pair';
        uniswapUrl = 'https://pancakeswap.finance/add/' + bombAddr + '/' + bshareAddr;
        //   vaultUrl = 'https://www.bomb.farm/#/bsc/vault/bomb-bomb-btcb';
    } else if (bank.depositTokenName.includes('BUSM-BUSD')) {
        pairName = 'BUSM-BUSD pair';
        uniswapUrl = 'https://pancakeswap.finance/add/' + busmAddr + '/' + busdAddr;
        //   vaultUrl = 'https://www.bomb.farm/#/bsc/vault/bomb-bomb-btcb';
    } else {
        pairName = 'BSHARE-BNB pair';
        uniswapUrl = 'https://pancakeswap.finance/add/BNB/' + bshareAddr;
        //   vaultUrl = 'https://www.bomb.farm/#/bsc/vault/bomb-bshare-bnb';
    }
    return (
        <Card>
            <CardContent>
                <StyledLink href={uniswapUrl} target="_blank">
                    {`Provide liquidity for ${pairName} now!`}
                </StyledLink>
            </CardContent>
        </Card>
    );
};
const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;
const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export default FarmCard;
