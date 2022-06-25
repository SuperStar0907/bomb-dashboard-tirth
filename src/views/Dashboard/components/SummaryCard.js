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
import { Typography, Grid } from '@material-ui/core';
import useRedeemOnBoardroom from '../../../hooks/useRedeemOnBoardroom';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import useFetchBoardroomAPR from '../../../hooks/useFetchBoardroomAPR';
import useCashPriceInEstimatedTWAP from '..//../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import useTotalStakedOnBoardroom from '../../../hooks/useTotalStakedOnBoardroom';
import useClaimRewardCheck from '../../../hooks/boardroom/useClaimRewardCheck';
import useWithdrawCheck from '../../../hooks/boardroom/useWithdrawCheck';
import ProgressCountdown from './ProgressCountdown';
import useBombStats from '../../../hooks/useBombStats';
import useLpStats from '../../../hooks/useLpStats';
import useLpStatsBTC from '../../../hooks/useLpStatsBTC';
import useModal from '../../../hooks/useModal';
import useZap from '../../../hooks/useZap';
import useBondStats from '../../../hooks/useBondStats';
import usebShareStats from '../../../hooks/usebShareStats';
import useTotalValueLocked from '../../../hooks/useTotalValueLocked';
import useBombFinance from '../../../hooks/useBombFinance';
import { roundAndFormatNumber } from '../../../0x';
import { Helmet } from 'react-helmet';
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

const SummaryCard = () => {
  const classes = useStyles();
  const { account } = useWallet();
  const { onRedeem } = useRedeemOnBoardroom();
  const stakedBalance = useStakedBalanceOnBoardroom();
  const currentEpoch = useCurrentEpoch();
  const cashStat = useCashPriceInEstimatedTWAP();
  const totalStaked = useTotalStakedOnBoardroom();
  const boardroomAPR = useFetchBoardroomAPR();
  const canClaimReward = useClaimRewardCheck();
  const canWithdraw = useWithdrawCheck();
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const TVL = useTotalValueLocked();
  const { to } = useTreasuryAllocationTimes();
  const bombFinance = useBombFinance();
  const bombStats = useBombStats();
  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);
  const bShareStats = usebShareStats();
  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const bSharePriceInBNB = useMemo(
    () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
    [bShareStats],
  );
  const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);
  const tBondStats = useBondStats();
  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);
  return (
    <StyledCardWrapper>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Typography style={{
        fontFamily: 'Nunito',
        fontWeight: 400,
        fontSize: 22,
        paddingTop: '10px',
      }} color="textPrimary" align="center">
        Bomb Finance Summary
      </Typography>
      <Line color="#f5f5f5" />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={5} className={classes.gridItem}>
          <Grid container spacing={3}>
            <Grid item xs={1} sm={1} md={1}></Grid>
            <Grid item xs={2} sm={2} md={2}></Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '10px',
              }} color="textPrimary" align="center">
                Current Supply
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '10px',
              }} color="textPrimary" align="center">
                Total Supply
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '10px',
              }} color="textPrimary" align="center">
                Price
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={1}></Grid>
          </Grid>
          <Line color="#f5f5f5" />
          <Grid container spacing={3}>
            <Grid item xs={1} sm={1} md={1}><img src={bombLogo} alt="Bomb logo" style={{ height: 20, marginLeft: 10 }} /></Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '12px',
              }} color="textPrimary" align="center">
                $BOMB
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '12px',
              }} color="textPrimary" align="center">
                {roundAndFormatNumber(bombCirculatingSupply, 2)}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '12px',
              }} color="textPrimary" align="center">
                {roundAndFormatNumber(bombTotalSupply, 2)}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '12px',
              }} color="textPrimary" align="center">
                ${bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'}
              </Typography>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '12px',
              }} color="textPrimary" align="center">
                {bombPriceInBNB ? bombPriceInBNB : '-.----'} BTCB
              </Typography>
            </Grid>
            <Grid item xs={1} sm={1} md={1}><img src={metamaskLogo} alt="Metamask logo" style={{ height: 32 }} onClick={() => {
              bombFinance.watchAssetInMetamask('BOMB');
            }} /></Grid>
          </Grid>
          <Line color="#f5f5f5" />
          <Grid container spacing={3}>
            <Grid item xs={1} sm={1} md={1}><img src={bsharesLogo} alt="Bshares logo" style={{ height: 20, marginLeft: 10 }} /></Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '12px',
              }} color="textPrimary" align="center">
                $BSHARE
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '12px',
              }} color="textPrimary" align="center">
                {roundAndFormatNumber(bShareCirculatingSupply, 2)}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '12px',
              }} color="textPrimary" align="center">
                {roundAndFormatNumber(bShareTotalSupply, 2)}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '12px',
              }} color="textPrimary" align="center">
                ${bSharePriceInDollars ? bSharePriceInDollars : '-.--'}
              </Typography>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '12px',
              }} color="textPrimary" align="center">
                {bSharePriceInBNB ? bSharePriceInBNB : '-.----'} BNB
              </Typography>
            </Grid>
            <Grid item xs={1} sm={1} md={1}><img src={metamaskLogo} alt="Metamask logo" style={{ height: 32 }} onClick={() => {
              bombFinance.watchAssetInMetamask('BSHARE');
            }}/></Grid>
          </Grid>
          <Line color="#f5f5f5" />
          <Grid container spacing={3}>
            <Grid item xs={1} sm={1} md={1}><img src={bbondLogo} alt="BBond logo" style={{ height: 20, marginLeft: 10 }} /></Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '12px',
              }} color="textPrimary" align="center">
                $BBOND
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '12px',
              }} color="textPrimary" align="center">
                {roundAndFormatNumber(tBondCirculatingSupply, 2)}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '12px',
              }} color="textPrimary" align="center">
                {roundAndFormatNumber(tBondTotalSupply, 2)}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '12px',
              }} color="textPrimary" align="center">
                ${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}
              </Typography>
              <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '12px',
              }} color="textPrimary" align="center">
                {tBondPriceInBNB ? tBondPriceInBNB : '-.----'} BNB
              </Typography>
            </Grid>
            <Grid item xs={1} sm={1} md={1}><img src={metamaskLogo} alt="Metamask logo" style={{ height: 32 }}onClick={() => {
              bombFinance.watchAssetInMetamask('BBOND');
            }} /></Grid>
          </Grid>
          <Line color="#f5f5f5" />
        </Grid>
        <Grid item xs={12} sm={12} md={2} className={classes.gridItem}>
          <Typography style={{
            fontFamily: 'Nunito',
            fontWeight: 600,
            fontSize: 18,
            paddingTop: '10px',
          }} color="textPrimary" align="center">
            Current Epoch
          </Typography>
          <Typography style={{
            fontFamily: 'Nunito',
            fontWeight: 600,
            fontSize: 18,
          }} color="textPrimary" align="center">
            {Number(currentEpoch)}
          </Typography>
          <Line color="#f5f5f5" />
          <Typography style={{
            fontFamily: 'Nunito',
            fontWeight: 600,
            fontSize: 18,
          }} color="textPrimary" align="center">
            <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
          </Typography>
          <Typography style={{
            fontFamily: 'Nunito',
            fontWeight: 600,
            fontSize: 18,
          }} color="textPrimary" align="center">
            Next Epoch in
          </Typography>
          <Line color="#f5f5f5" />
          <Typography style={{
            fontFamily: 'Nunito',
            fontWeight: 300,
            fontSize: 14,
          }} color="textPrimary" align="center">
            Live TWAP: <a style={{ color: '#00ff00' }}>${Number(scalingFactor)}</a>
          </Typography>
          <Typography style={{
            fontFamily: 'Nunito',
            fontWeight: 300,
            fontSize: 14,
          }} color="textPrimary" align="center">
            TVL: <a style={{ color: '#00ff00' }}><CountUp end={TVL} separator="," prefix="$" /></a>
          </Typography>
          <Typography style={{
            fontFamily: 'Nunito',
            fontWeight: 300,
            fontSize: 14,
          }} color="textPrimary" align="center">
            Last Epoch TWAP: <a style={{ color: '#00ff00' }}>${Number(scalingFactor)}</a>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} className={classes.gridItem}>
          <div align="center">
            <div style={{
              "width": "130px",
              "height": "130px",
              "borderRadius": "50%",
              "border": "12px solid transparent",
              "backgroundSize": "100% 100%, 50% 50%, 50% 50%, 50% 50%, 50% 50%",
              "backgroundRepeat": "no-repeat",
              "backgroundImage": "linear-gradient(rgba(32, 37, 67, 1), rgba(32, 37, 67, 1)), \nlinear-gradient(30deg, red 36%, red 30%),\nlinear-gradient(120deg, yellow 36%, yellow 30%),\nlinear-gradient(300deg, blue 36%, blue 30%),\nlinear-gradient(210deg, green 36%, green 30%)",
              "backgroundPosition": "center center, left top, right top, left bottom, right bottom",
              "backgroundOrigin": "content-box, border-box, border-box, border-box, border-box",
              "backgroundClip": "content-box, border-box, border-box, border-box, border-box",
            }} align="center">
              <div style={{
                "marginTop": "50%",
                "marginLeft": "50%",
                "-ms-transform": "translate(-50%, -50%)",
                "transform": "translate(-50%, -50%)",
                "width": "100px",
                "height": "100px",
                "borderRadius": "50%",
                "border": "12px solid transparent",
                "backgroundSize": "100% 100%, 50% 50%, 50% 50%, 50% 50%, 50% 50%",
                "backgroundRepeat": "no-repeat",
                "backgroundImage": "linear-gradient(rgba(19, 24, 59, 1), rgba(19, 24, 59, 1))",
                "backgroundPosition": "center center, left top, right top, left bottom, right bottom",
                "backgroundOrigin": "content-box, border-box, border-box, border-box, border-box",
                "backgroundClip": "content-box, border-box, border-box, border-box, border-box"
              }}>
                <div style={{
                  "marginTop": "50%",
                  "-ms-transform": "translate(0, -50%)",
                  "transform": "translate(0, -50%)",
                }}
                >
                  <Typography style={{
                    fontFamily: 'Nunito',
                    fontWeight: 600,
                    fontSize: 18,
                    color: '#fff',
                  }} align="center">
                    $10,451
                  </Typography>
                  <Typography style={{
                    fontFamily: 'Nunito',
                    fontWeight: 600,
                    fontSize: 18,
                    color: '#5DFDB0',
                  }} align="center">
                    +22%
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div style={{ "marginLeft": "10%", "marginTop": "5%" }}>
            <Grid container spacing={0}>
              <Grid item xs={6} sm={6} md={6}>
                <img src={bombLogo} alt="Bomb logo" style={{ height: 14 }} /><t />
                <a style={{
                  fontFamily: 'Nunito',
                  fontWeight: 300,
                  fontSize: 12,
                  paddingTop: '10px',
                  color: '#fff',
                }}>&nbsp;&nbsp;Bomb:</a>
                <a style={{
                  fontFamily: 'Nunito',
                  fontWeight: 600,
                  fontSize: 14,
                  paddingTop: '10px',
                  color: '#fff',
                }}> 17%</a>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <img src={bombbitcoinLogo} alt="Bomb Bitcoin logo" style={{ height: 14 }} /><t />
                <a style={{
                  fontFamily: 'Nunito',
                  fontWeight: 300,
                  fontSize: 12,
                  paddingTop: '10px',
                  color: '#fff',
                }}>&nbsp;&nbsp;Bomb-BTCB:</a>
                <a style={{
                  fontFamily: 'Nunito',
                  fontWeight: 600,
                  fontSize: 14,
                  paddingTop: '10px',
                  color: '#fff',
                }}> 17%</a>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <img src={bsharesLogo} alt="BShares logo" style={{ height: 14 }} /><t />
                <a style={{
                  fontFamily: 'Nunito',
                  fontWeight: 300,
                  fontSize: 12,
                  paddingTop: '10px',
                  color: '#fff',
                }}>&nbsp;&nbsp;BShare:</a>
                <a style={{
                  fontFamily: 'Nunito',
                  fontWeight: 600,
                  fontSize: 14,
                  paddingTop: '10px',
                  color: '#fff',
                }}> 17%</a>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <img src={bsharebnbLogo} alt="BShares BNB logo" style={{ height: 14 }} /><t />
                <a style={{
                  fontFamily: 'Nunito',
                  fontWeight: 300,
                  fontSize: 12,
                  paddingTop: '10px',
                  color: '#fff',
                }}>&nbsp;&nbsp;Bshare-BNB:</a>
                <a style={{
                  fontFamily: 'Nunito',
                  fontWeight: 600,
                  fontSize: 14,
                  paddingTop: '10px',
                  color: '#fff',
                }}> 17%</a>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <img src={bbondLogo} alt="Bbond logo" style={{ height: 14 }} /><t />
                <a style={{
                  fontFamily: 'Nunito',
                  fontWeight: 300,
                  fontSize: 12,
                  paddingTop: '10px',
                  color: '#fff',
                }}>&nbsp;&nbsp;BBond:</a>
                <a style={{
                  fontFamily: 'Nunito',
                  fontWeight: 600,
                  fontSize: 14,
                  paddingTop: '10px',
                  color: '#fff',
                }}>12%</a>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Grid container spacing={0}>
                  <Grid item xs={1} sm={1} md={1}>
                    <div style={{
                      "marginTop": "5px",
                      "width": "14px",
                      "height": "14px",
                      "borderRadius": "50%",
                      "backgroundSize": "100% 100%",
                      "backgroundRepeat": "no-repeat",
                      "backgroundImage": "linear-gradient(rgba(55, 55, 71, 1), rgba(55, 55, 71, 1))"
                    }}></div>
                  </Grid>
                  <Grid item xs={11} sm={11} md={11}>
                    <a style={{
                      fontFamily: 'Nunito',
                      fontWeight: 300,
                      fontSize: 12,
                      paddingTop: '10px',
                      color: '#fff',
                    }}>&nbsp;&nbsp;Others:</a>
                    <a style={{
                      fontFamily: 'Nunito',
                      fontWeight: 600,
                      fontSize: 14,
                      paddingTop: '10px',
                      color: '#fff',
                    }}> 17%</a>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={0} sm={0} md={1} className={classes.gridItem} align="center"></Grid>
      </Grid>
    </StyledCardWrapper >
  );
};

const StyledCardWrapper = styled.div`
background: rgba(32, 37, 67, 0.5);
margin-bottom: 20px;
border-radius: 5px;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default SummaryCard;

