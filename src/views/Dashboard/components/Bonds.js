import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import bbond from '../../../assets/img/bbond.png';
import { Typography, Grid } from '@material-ui/core';
import useBondStats from '../../../hooks/useBondStats';
import useBombFinance from '../../../hooks/useBombFinance';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';
import { useTransactionAdder } from '../../../state/transactions/hooks';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useBondsPurchasable from '../../../hooks/useBondsPurchasable';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../../bomb-finance/constants';
import { getDisplayBalance } from '../../../utils/formatBalance';
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
const Bombs = () => {
    const bombFinance = useBombFinance();
    const addTransaction = useTransactionAdder();
    const bondStat = useBondStats();
    //const bombStat = useBombStats();
    const cashPrice = useCashPriceInLastTWAP();

    const bondsPurchasable = useBondsPurchasable();

    const bondBalance = useTokenBalance(bombFinance?.BBOND);
    //const scalingFactor = useMemo(() => (cashPrice ? Number(cashPrice) : null), [cashPrice]);

    const handleBuyBonds = useCallback(
        async (amount) => {
            const tx = await bombFinance.buyBonds(amount);
            addTransaction(tx, {
                summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
            });
        },
        [bombFinance, addTransaction],
    );

    const handleRedeemBonds = useCallback(
        async (amount) => {
            const tx = await bombFinance.redeemBonds(amount);
            addTransaction(tx, { summary: `Redeem ${amount} BBOND` });
        },
        [bombFinance, addTransaction],
    );
    const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
    const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);
    const isBondPayingPremium = useMemo(() => Number(bondStat?.tokenInFtm) >= 1.1, [bondStat]);
    // console.log("bondstat", Number(bondStat?.tokenInFtm))
    const bondScale = (Number(cashPrice) / 100000000000000).toFixed(4);
    return (
        <StyledCardWrapper style={{
            marginTop: "10px",
            paddingTop: "5px",
            paddingBottom: "15px",
            marginBottom: "5px",
            "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #728CDF", "backdropFilter": "blur(10px)", "borderRadius": "10px"
        }}>
            <img src={bbond} style={{ width: "50px", height: "50px", float: "left" }} />
            <a style={{
                fontFamily: 'Nunito',
                fontWeight: 700,
                fontSize: '22px',
                color: "#FFFFFF",
                float: "top",
            }} color="#FFFFFF" align="left">
                Bonds
            </a>
            <Typography style={{
                fontFamily: 'Nunito',
                fontWeight: 400,
                fontSize: '14px',
                color: "#FFFFFF",
            }} color="#FFFFFF" align="left">
                BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={4} md={4} align="center" style={{ marginLeft: "20px", marginTop: "20px" }}>
                    <Typography style={{
                        fontFamily: 'Nunito',
                        fontWeight: 300,
                        fontSize: '16px',
                        color: "#FFFFFF",
                    }} color="#FFFFFF" align="left">
                        Current Price: (Bomb)^2
                    </Typography>
                    <Typography style={{
                        fontFamily: 'Nunito',
                        fontWeight: 700,
                        fontSize: '22px',
                        color: "#FFFFFF",
                    }} color="#FFFFFF" align="left">
                        BBOND = {Number(bondStat?.tokenInFtm).toFixed(4) || '-'} BTCB
                    </Typography>
                </Grid>
                <Grid item xs={3} md={3} style={{ marginTop: "10px" }}>
                    <Typography style={{
                        fontFamily: 'Nunito',
                        fontWeight: 300,
                        fontSize: '16px',
                        color: "#FFFFFF",
                    }} color="#FFFFFF" align="left">
                        Available to redeem:
                    </Typography>
                    <img src={bbond} height="39px" width="39px" />
                    <a style={{
                        fontFamily: 'Nunito',
                        fontWeight: 600,
                        fontSize: '36px',
                        color: "#FFFFFF",
                    }} color="#FFFFFF" align="left">
                        {getDisplayBalance(bondBalance)}
                    </a>
                </Grid>
                <Grid item xs={4} md={4} >
                    <Grid container spacing={0}>
                        <Grid item xs={6} md={6}>
                            <Typography style={{
                                fontFamily: 'Nunito',
                                fontWeight: 600,
                                fontSize: '16px',
                                color: "#FFFFFF",
                            }} color="#FFFFFF" align="left">
                                Purchase BBond
                            </Typography>
                            <Typography style={{
                                fontFamily: 'Nunito',
                                fontWeight: 300,
                                fontSize: '16px',
                                color: "#FFFFFF",
                            }} color="#FFFFFF" align="left">
                                {isBondPayingPremium === false ?
                                    ("Bomb is over peg") : ({})}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid rgba(255, 255, 255, 0.5)", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "50%", float: "right", marginTop: "15px" }}>
                                {isBondPayingPremium === false ?
                                    (
                                        <>
                                            <a style={{
                                                fontFamily: 'Nunito',
                                                fontWeight: 400,
                                                fontSize: '15px',
                                                color: "rgba(255, 255, 255, 0.5)",
                                                marginLeft: "5px",
                                            }} color="rgba(255, 255, 255, 0.5)" align="left">
                                                Purchase
                                            </a><a style={{
                                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                                width: "20px",
                                                height: "20px",
                                                borderRadius: "50%",
                                                textAlign: "center",
                                                float: "right",
                                                color: "#149EE3"
                                            }} align="right">&uarr;
                                            </a>
                                        </>)
                                    : (<div style={{cursor:"pointer"}} onClick={handleBuyBonds}>
                                        <a style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 400,
                                            fontSize: '15px',
                                            color: "rgba(255, 255, 255, 1)",
                                            marginLeft: "5px",
                                        }} color="rgba(255, 255, 255, 1)" align="left">
                                            Purchase
                                        </a><a style={{
                                            backgroundColor: "rgba(255, 255, 255, 1)",
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "50%",
                                            textAlign: "center",
                                            float: "right",
                                            color: "#149EE3"
                                        }} align="right">&uarr;
                                        </a>
                                    </div>)
                                }
                            </div>
                        </Grid>
                        <hr
                            style={{ "border": "0.5px solid rgba(195, 197, 203, 0.5)", "width": "100%" }}
                        />
                        <Grid item xs={6} md={6}>
                            <Typography style={{
                                fontFamily: 'Nunito',
                                fontWeight: 600,
                                fontSize: '16px',
                                color: "#FFFFFF",
                            }} color="#FFFFFF" align="left">
                                Redeem Bomb
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid rgba(255, 255, 255, 0.5)", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "50%", float: "right"}}>
                                {!bondStat || bondBalance.eq(0) || !isBondRedeemable ?(
                                    <>
                                <a style={{
                                    fontFamily: 'Nunito',
                                    fontWeight: 400,
                                    fontSize: '15px',
                                    color: "rgba(255, 255, 255, 0.5)",
                                    marginLeft: "5px",
                                }} color="rgba(255, 255, 255, 0.5)" align="left">
                                    Redeem
                                </a><a style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    textAlign: "center",
                                    float: "right",
                                    color: "#149EE3"
                                }} align="right">&darr;</a>
                                </>
                                ):(<div style={{cursor:"pointer" }} onClick={handleRedeemBonds}>
                                    <a style={{
                                        fontFamily: 'Nunito',
                                        fontWeight: 400,
                                        fontSize: '15px',
                                        color: "rgba(255, 255, 255, 1)",
                                        marginLeft: "5px",
                                    }} color="rgba(255, 255, 255, 1)" align="left">
                                        Redeem
                                    </a><a style={{
                                        backgroundColor: "rgba(255, 255, 255, 1)",
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        textAlign: "center",
                                        float: "right",
                                        color: "#149EE3"
                                    }} align="right">&darr;</a>
                                    </div>)}
                                
                                
                                
                                </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </StyledCardWrapper>
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

export default Bombs;

