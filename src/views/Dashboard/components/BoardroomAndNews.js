import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import moment from 'moment';
import styled from 'styled-components';
import CountUp from 'react-countup';
import metamaskLogo from '../../../assets/img/metamask-fox.svg';
import bombLogo from '../../../assets/img/bomb.png';
import bsharesLogo from '../../../assets/img/bshares.png';
import bbondLogo from '../../../assets/img/bbond.png';
import bombbitcoinLogo from '../../../assets/img/bomb-bitcoin-LP.png';
import bsharebnbLogo from '../../../assets/img/bshare-bnb-LP.png';
import { makeStyles } from '@material-ui/core/styles';
import discordLogo from '../../../assets/img/pw4945914.png';
import docsLogo from '../../../assets/img/ww2991106.png';
import bshares from '../../../assets/img/bshares.png';
import bomb from '../../../assets/img/bomb.png';
import { Box, Card, CardContent, Button, Typography, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import useRedeemOnBoardroom from '../../../hooks/useRedeemOnBoardroom';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import useFetchBoardroomAPR from '../../../hooks/useFetchBoardroomAPR';
import useCashPriceInEstimatedTWAP from '..//../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import useTotalStakedOnBoardroom from '../../../hooks/useTotalStakedOnBoardroom';
import useClaimRewardCheck from '../../../hooks/boardroom/useClaimRewardCheck';
import useWithdrawCheck from '../../../hooks/boardroom/useWithdrawCheck';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import ProgressCountdown from './ProgressCountdown';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet';
import useTotalValueLocked from '../../../hooks/useTotalValueLocked';
import HomeImage from '../../../assets/img/background.jpg';
import { Underline } from 'react-feather';
import Value from '../../../components/Value';
import useBombStats from '../../../hooks/useBombStats';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useBombFinance from '../../../hooks/useBombFinance';
import useApprove, {ApprovalState} from '../../../hooks/useApprove';
import useStakeToBoardroom from '../../../hooks/useStakeToBoardroom';
import useWithdrawFromBoardroom from '../../../hooks/useWithdrawFromBoardroom';
import useModal from '../../../hooks/useModal';
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
const TITLE = 'bomb.money | Dashboard';

const useStyles = makeStyles((theme) => ({
    gridItem: {
        height: '100%',
        [theme.breakpoints.up('md')]: {
            height: '85%',
        },
    },
}));
const Line = ({ color }) => (
    <hr
        style={{
            color,
            backgroundColor: color,
            width: '90%',
            Top: '0%',
        }}
    />
);

const BoardroomAndNews = () => {
    const { account } = useWallet();
    const bombFinance = useBombFinance();
    const { onRedeem } = useRedeemOnBoardroom();
    const [approveStatus, approve] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);
    const stakedBalance = useStakedBalanceOnBoardroom();
    const tokenBalance = useTokenBalance(bombFinance.BSHARE);
    const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('BSHARE', bombFinance.BSHARE);
    const StakedtokenPriceInDollars = useMemo(
        () =>
            stakedTokenPriceInDollars
                ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
                : null,
        [stakedTokenPriceInDollars, stakedBalance],
    );
    const bombStats = useBombStats();
    const earnings = useEarningsOnBoardroom();
    const tokenPriceInDollars = useMemo(
        () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
        [bombStats],
    );
    const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);
    const totalStaked = useTotalStakedOnBoardroom();
    const TVL = useTotalValueLocked();
    const boardroomAPR = useFetchBoardroomAPR();
    const {onReward} = useHarvestFromBoardroom();
    const canClaimReward = useClaimRewardCheck();
    const { onStake } = useStakeToBoardroom();
    const { onWithdraw } = useWithdrawFromBoardroom();
    const canWithdrawFromBoardroom = useWithdrawCheck();

    const [onPresentDeposit, onDismissDeposit] = useModal(
        <DepositModal
            max={tokenBalance}
            onConfirm={(value) => {
                onStake(value);
                onDismissDeposit();
            }}
            tokenName={'BShare'}
        />,
    );

    const [onPresentWithdraw, onDismissWithdraw] = useModal(
        <WithdrawModal
            max={stakedBalance}
            onConfirm={(value) => {
                onWithdraw(value);
                onDismissWithdraw();
            }}
            tokenName={'BShare'}
        />,
    );
    return (
        <>
            <div style={{ marginBottom: "10px", paddingBottom: "5px" }}>
                <Helmet>
                    <title>{TITLE}</title>
                </Helmet>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={7}>
                        <Typography style={{
                            fontFamily: 'Nunito',
                            fontWeight: 600,
                            fontSize: '16px',
                            color: "#9EE6FF",
                            marginRight: "20px",
                        }} color="#9EE6FF" align="right">
                            <a style={{ textDecorationLine: "Underline", color: "#9EE6FF", }} href="#">Read Investment Strategy</a> <a>&gt;</a>
                        </Typography>
                        <div style={{
                            "background": "radial-gradient(59345.13% 4094144349.28% at 39511.5% -2722397851.45%, rgba(0, 245, 171, 0.5) 0%, rgba(0, 173, 232, 0.5) 100%) ",
                            "border": "0.5px solid #E41A1A",
                            "marginRight": "20px",
                            "marginTop": "5px"
                        }}>
                            <Typography style={{
                                fontFamily: 'Nunito',
                                fontWeight: 800,
                                fontSize: '24px',
                                color: "#FFFFFF",
                            }} color="#FFFFFF" align="center">
                                Invest Now
                            </Typography>
                        </div>
                        <Grid container spacing={0}>
                            <Grid item xs={6} md={6}>
                                <div style={{
                                    "background": "rgba(255, 255, 255, 0.5)",
                                    "border": "1px solid #728CDF",
                                    "backdropFilter": "blur(25px)",
                                    "marginRight": "20px",
                                    "marginTop": "5px"
                                }}>
                                    <Typography style={{
                                        fontFamily: 'Nunito',
                                        fontWeight: 700,
                                        fontSize: '18px',
                                        color: "#000000",
                                    }} color="#000000" align="center">
                                        <div style={{ "display": "flex", "justifyContent": "center", "alignItems": "center", }}><img src={discordLogo} style={{ "height": "27" }} />Chat on Discord</div>
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <div style={{
                                    "background": "rgba(255, 255, 255, 0.5)",
                                    "border": "1px solid #728CDF",
                                    "backdropFilter": "blur(25px)",
                                    "marginRight": "20px",
                                    "marginTop": "5px"
                                }}>
                                    <Typography style={{
                                        fontFamily: 'Nunito',
                                        fontWeight: 700,
                                        fontSize: '18px',
                                        color: "#000000",
                                    }} color="#000000" align="center">
                                        <div style={{ "display": "flex", "justifyContent": "center", "alignItems": "center" }}><img src={docsLogo} style={{ "height": "27" }} />Read Docs</div>
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <StyledCardWrapper style={{
                            marginRight: "20px",
                            marginTop: "10px",
                            paddingTop: "5px",
                            "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #728CDF", "backdropFilter": "blur(10px)", "borderRadius": "10px"
                        }}>
                            <Grid container spacing={0}>
                                <Grid item xs={1} md={1}>
                                    <img src={bshares} style={{ "height": "50px" }} />
                                </Grid>
                                <Grid item xs={11} md={11}>
                                    <a style={{
                                        fontFamily: 'Nunito',
                                        fontWeight: 700,
                                        fontSize: '22px',
                                        color: "#FFFFFF",
                                    }} color="#FFFFFF" align="left">
                                        Boardroom
                                    </a>
                                    <a style={{
                                        "background": "rgba(0, 232, 162, 0.5)", "borderRadius": "3px", "marginLeft": "10px", paddingLeft: "5px", paddingRight: "5px", fontFamily: 'Nunito',
                                        fontWeight: 600,
                                        fontSize: '12px',
                                        color: "#FFFFFF",
                                    }}>Recommended</a>
                                    <Grid container spacing={0}>
                                        <Grid item xs={8} md={8}>
                                            <div style={{
                                                fontFamily: 'Nunito',
                                                fontWeight: 400,
                                                fontSize: '14px',
                                                color: "#FFFFFF",
                                            }} color="#FFFFFF" align="left">
                                                Stake BSHARE and earn BOMB every epoch
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={4} align="right">
                                            <a style={{
                                                fontWeight: 400,
                                                fontSize: '14px',
                                                color: "#FFFFFF",
                                                align: "right",
                                                marginRight: "30px"
                                            }} align="right">TVL: <CountUp end={TVL} separator="," prefix="$" /></a>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Line color="#FFFFFF" />
                            </Grid>
                            <Typography style={{
                                fontFamily: 'Nunito',
                                fontWeight: 400,
                                fontSize: '14px',
                                color: "#FFFFFF",
                                marginRight: "30px",
                            }} color="#FFFFFF" align="right">
                                Total Staked:<img src={bshares} style={{ "height": "16px" }} />{getDisplayBalance(totalStaked)}
                            </Typography>
                            <Grid container spacing={0}>
                                <Grid item xs={1} md={1}></Grid>
                                <Grid item xs={2} md={2} align="center">
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
                                        {boardroomAPR.toFixed(2)}%
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} md={2}>
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
                                        <img src={bshares} style={{ "height": "16px" }} />{getDisplayBalance(stakedBalance)}
                                    </Typography>
                                    <Typography style={{
                                        fontFamily: 'Nunito',
                                        fontWeight: 400,
                                        fontSize: '14px',
                                        color: "#FFFFFF",
                                    }} color="#FFFFFF" align="left">
                                        {`≈ $${StakedtokenPriceInDollars}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} md={2}>
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
                                {!!account ? (
                                    <Grid item xs={5} md={5} align="center" style={{ marginTop: "1%" }}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={6} md={6} align="left">
                                                <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #FFFFFF", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "90%", cursor: "pointer" }} onClick={onPresentDeposit}>
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
                                            <Grid item xs={6} md={6} align="left">
                                                <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #FFFFFF", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "90%", cursor: "pointer" }}onClick={onPresentWithdraw}>
                                                    <a style={{
                                                        fontFamily: 'Nunito',
                                                        fontWeight: 400,
                                                        fontSize: '15px',
                                                        color: "#FFFFFF",
                                                        marginLeft: "2px",
                                                    }} color="#FFFFFF" align="left" >
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
                                            <Grid item xs={12} md={12} align="left">
                                                <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #FFFFFF", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "95%", marginTop: "2%", cursor: "pointer" }} onClick={onReward}>
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
                                ) : <></>}

                            </Grid>
                        </StyledCardWrapper>

                    </Grid>

                    <Grid item xs={12} md={5} >
                        <StyledCardWrapper style={{
                            "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #728CDF", "backdropFilter": "blur(10px)", "borderRadius": "10px", height: "100%"
                        }}>
                            <Typography style={{
                                fontFamily: 'Nunito',
                                fontWeight: 700,
                                fontSize: '22px',
                                color: "#FFFFFF",
                                marginLeft: "19px",
                                marginTop: "8px"
                            }} color="#FFFFFF" align="left">
                                Latest News
                            </Typography>
                        </StyledCardWrapper >
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
background: rgba(32, 37, 67, 0.5);
border-radius: 5px;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default BoardroomAndNews;

