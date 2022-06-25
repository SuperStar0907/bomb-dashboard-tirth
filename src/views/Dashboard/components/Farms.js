import React, { useMemo } from 'react';
import styled from 'styled-components';
import bombbitcoinLogo from '../../../assets/img/bomb-bitcoin-LP.png';
import bsharebnbLogo from '../../../assets/img/bshare-bnb-LP.png';
import bshares from '../../../assets/img/bshares.png';
import bomb from '../../../assets/img/bomb.png';
import {Typography, Grid } from '@material-ui/core';
const Farms = () => {
    return (
        <StyledCardWrapper style={{
            marginTop: "10px",
            paddingTop: "5px",
            paddingBottom: "5px",
            marginBottom: "5px",
            "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #728CDF", "backdropFilter": "blur(10px)", "borderRadius": "10px"
        }}>
            <Grid container spacing={3}>
                <Grid item xs={8} md={8}>
                    <Typography style={{
                        fontFamily: 'Nunito',
                        fontWeight: 700,
                        fontSize: '22px',
                        color: "#FFFFFF",
                        marginLeft: "10px"
                    }} color="#FFFFFF" align="left">
                        Bomb Farms
                    </Typography>
                    <Typography style={{
                        fontFamily: 'Nunito',
                        fontWeight: 400,
                        fontSize: '14px',
                        color: "#FFFFFF",
                        marginLeft: "10px"
                    }} color="#FFFFFF" align="left">
                        Stake your LP tokens in our farms to start earning $BSHARE
                    </Typography>
                </Grid>
                <Grid item xs={4} md={4} align="right">
                    <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #FFFFFF", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "40%", marginRight: "20px", marginTop: "15px" }}>
                        <Typography style={{
                            fontFamily: 'Nunito',
                            fontWeight: 400,
                            fontSize: '15px',
                            color: "#FFFFFF",
                        }} color="#FFFFFF" align="center">
                            Claim All <img src={bshares} style={{ "height": "12px" }} />
                        </Typography></div>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={1} md={1} align="right">
                        <img src={bombbitcoinLogo} style={{ "height": "33px",marginRight:"10px" }} />
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
                        }} align="right">TVL: $1,008,430</a>
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
                                            2%
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
                                            <img src={bshares} style={{ "height": "16px" }} />124.21
                                        </Typography>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            ≈ $1171.62
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
                                            <img src={bomb} style={{ "height": "16px" }} />6.4413
                                        </Typography>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            ≈ $298.88
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} md={2}></Grid>
                            <Grid item xs={5} md={5} align="center" style={{ marginTop: "1%" }}>
                                <Grid container spacing={0}>
                                    <Grid item xs={3} md={3} align="left">
                                        <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #FFFFFF", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "90%" }}>
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
                                        <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #FFFFFF", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "90%" }}>
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
                                        <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #FFFFFF", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "95%" }}>
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
                            "border":"0.5px solid #00ADE8",
                        }}
                    />
                    <Grid item xs={1} md={1} align="right">
                        <img src={bsharebnbLogo} style={{ "height": "33px",marginRight:"10px" }} />
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
                        }} align="right">TVL: $1,008,430</a>
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
                                            2%
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
                                            <img src={bshares} style={{ "height": "16px" }} />124.21
                                        </Typography>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            ≈ $1171.62
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} md={3} style={{marginBottom:"10px"}}>
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
                                            <img src={bomb} style={{ "height": "16px" }} />6.4413
                                        </Typography>
                                        <Typography style={{
                                            fontFamily: 'Nunito',
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            color: "#FFFFFF",
                                        }} color="#FFFFFF" align="left">
                                            ≈ $298.88
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} md={2}></Grid>
                            <Grid item xs={5} md={5} align="center" style={{ marginTop: "1%" }}>
                                <Grid container spacing={0}>
                                    <Grid item xs={3} md={3} align="left">
                                        <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #FFFFFF", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "90%" }}>
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
                                        <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #FFFFFF", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "90%" }}>
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
                                        <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #FFFFFF", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "95%" }}>
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

export default Farms;

