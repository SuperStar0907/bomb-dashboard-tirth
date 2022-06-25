import React, { useMemo } from 'react';
import styled from 'styled-components';
import bbond from '../../../assets/img/bbond.png';
import {Typography, Grid } from '@material-ui/core';
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
                <Grid item xs={4} md={4} align="center" style={{ marginLeft: "20px",marginTop:"20px" }}>
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
                        BBOND = 6.2872 BTCB
                    </Typography>
                </Grid>
                <Grid item xs={3} md={3} style={{marginTop:"10px" }}>
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
                        456
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
                                Bomb is over peg
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid rgba(255, 255, 255, 0.5)", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "50%",float:"right",marginTop:"15px"}}>
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
                                }} align="right">&uarr;</a></div>
                        </Grid>
                                <hr
                                style={{"border":"0.5px solid rgba(195, 197, 203, 0.75)", "width":"100%"}}
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
                        <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid rgba(255, 255, 255, 1)", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "50%",float:"right"}}>
                                <a style={{
                                    fontFamily: 'Nunito',
                                    fontWeight: 400,
                                    fontSize: '15px',
                                    color: "rgba(255, 255, 255, 1)",
                                    marginLeft: "5px",
                                }} color="rgba(255, 255, 255, 0.5)" align="left">
                                    Redeem
                                </a><a style={{
                                    backgroundColor: "rgba(255, 255, 255, 1)",
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    textAlign: "center",
                                    float: "right",
                                    color: "#149EE3"
                                }} align="right">&darr;</a></div>
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

