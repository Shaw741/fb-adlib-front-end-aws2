import { Button, CircularProgress, Divider, Grid, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import paymentCheckboxicon from "../../src/assets/paymentcheckboxicon.svg"
import annualplancheckboxicon from "../../src/assets/annualplancheckbox.svg"
import { monthsubscription,yearsubcription } from '../services';
const useStyles = makeStyles((theme) => ({
    fontSizeCustomize: {
        [theme.breakpoints.up("minWidth: 1140px")]: {
            fontSize: 15
        }
    },
    paymentheading: {
        fontWeight: "900 !important",
        fontSize: "24px !important",
        lineHeight: "31px !important",
        background: "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textFillColor: "transparent",
    },
    plansheading: {
        fontWeight: "600 !important",
        fontSize: "22px !important",
        background: "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textFillColor: "transparent",
    },
    chooseplanbutton: {
        fontWeight: "600 !important",
        height: "35px",
        background: "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textFillColor: "transparent",
        width: "80%",
        textTransform: "none",
    },
    yearplanbutton: {
        fontWeight: "600 !important",
        height: "35px",
        background: "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
        fontFamily: "Neue Haas Grotesk Display Pro",
        width: "80%",
        textTransform: "none",
    },
    fontcolor: {
        fontSize: "1px",
        color: '#F6F6FB',
    },
    monthplanborder: {
        border: "1px solid #EBEBEB",
    },
    dividerColor: {
        backgroundColor: 'white',
    },
    month: {
        color: "#D3D5E1"
    }
}));
const Payment = () => {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const [loadingyear, setLoadingyear] = useState(false)
    const buySubscriptionmonthly = async () => {
        setLoading(true);
        try {
            const res = await monthsubscription();
            window.open(res.data.data.url)
        } catch {
            setLoading(false)
        }
    }
    const buySubscriptionAnnually = async () => {
        setLoadingyear(true);
        try {
            const res = await yearsubcription();
            window.open(res.data.data.url)
        } catch {
            setLoadingyear(false)
        }
    }
    return (
        <>
            <Box className={classes.fontSizeCustomize}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }} align='center'>Experience The <span
                    className={classes.paymentheading}>
                    All-Seeing Eye</span> For Yourself
                </Typography>
                <Typography variant="h5" gutterBottom align='center' p={1.5}>Try it free for 24 hours!</Typography>
            </Box>

            <Grid container spacing={2} p={2} className={classes.fontSizeCustomize}>
                <Grid item xs={6} lg={6} className={classes.monthplanborder} sx={{ borderRadius: "44px 18px 1px 1px" }} >
                    <Stack
                        p={2}
                    >
                        <Typography className={classes.plansheading} pl={9}> Monthly Plan </Typography>
                        <Stack p={2}>
                            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                                <Typography variant="h3" gutterBottom component="div" > $49</Typography>
                                <Typography variant="h6" m={2.7} className={classes.month}>/MONTH</Typography>
                            </Box>
                            <Typography>Cancel Anytime, No Commitments</Typography>
                            <Divider variant='fullWidth' />
                            <Stack direction={"row"} >
                                <img src={paymentCheckboxicon} alt="paymentchekbox" />
                                <Typography m={2}>
                                    Addlibrary Database With Over 30,000 Acctive dropshipping sites
                                </Typography>
                            </Stack>
                            <Stack direction={"row"}>
                                <img src={paymentCheckboxicon} alt="paymentchekbox" />
                                <Typography m={2}>
                                    Early Access to the Most Powerfull Ecom Spy Tool
                                </Typography>
                            </Stack>
                            <Stack direction={"row"}>
                                <img src={paymentCheckboxicon} alt="paymentchekbox" />
                                <Typography m={2}>
                                    Thousands of New Sites Added Daily
                                </Typography>
                            </Stack>
                            <Stack direction={"row"}>
                                <img src={paymentCheckboxicon} alt="paymentchekbox" />
                                <Typography m={2}>
                                    Customer Support
                                </Typography>
                            </Stack>
                            <Stack direction={"row"}>
                                <img src={paymentCheckboxicon} alt="paymentchekbox" />
                                <Typography m={2}>
                                    New Tools and Features Coming Soon
                                </Typography>
                            </Stack>
                        </Stack>
                        <Box style={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="outlined"
                                className={classes.chooseplanbutton}
                                onClick={buySubscriptionmonthly}
                                style={{
                                    borderRadius: 30,
                                    fontSize: 22,
                                    borderColor: "#EBEBEB",
                                    textTransform: "none",
                                }}>
                                {loading ? <CircularProgress size={25} style={{ color: "#00CBFF" }} /> : "Choose Plan"}
                            </Button>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={6} lg={6} sx={{ background: "linear-gradient(321.16deg, #231259 87.91%, #5D88C3 100%)", borderRadius: "10px 40px 10px 10px" }}>
                    <Stack
                        p={2}
                    >
                        <Button className={classes.annualheadinglabel}
                            sx={{
                                marginLeft: "16px",
                                padding: "0px",
                                width: "43%",
                                border: "2px solid",
                                borderImageSlice: 1,
                                borderImageSource: "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
                                color: "#F6F6FB",
                                fontWeight: 700,
                                fontSize: "19px",
                                borderRadius: 15,
                                textTransform: 'none'
                            }}
                        >
                            Annual Plan
                        </Button>
                        <Stack p={2}>
                            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                                <Typography variant="h3" gutterBottom component="div" className={classes.fontcolor} > $29</Typography>
                                <Typography variant="h6" m={2.7} className={classes.month}>/MONTH</Typography>
                            </Box>
                            <Typography className={classes.fontcolor}>Save 40% By Paying Annually</Typography>
                            <Divider variant='fullWidth' className={classes.dividerColor} />
                            <Stack direction={"row"}>
                                <img src={annualplancheckboxicon} alt="paymentchekbox" />
                                <Typography m={2} sx={{ borderStyle: "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)" }} className={classes.fontcolor}>
                                    Addlibrary Database With Over 30,000 Active dropshipping sites
                                </Typography>
                            </Stack>
                            <Stack direction={"row"}>
                                <img src={annualplancheckboxicon} alt="paymentchekbox" />
                                <Typography m={2} className={classes.fontcolor}>
                                    Early Access to the Most Powerfull Ecom Spy Tool
                                </Typography>
                            </Stack>
                            <Stack direction={"row"}>
                                <img src={annualplancheckboxicon} alt="paymentchekbox" />
                                <Typography m={2} className={classes.fontcolor}>
                                    Thousands of New Sites Added Daily
                                </Typography>
                            </Stack>
                            <Stack direction={"row"}>
                                <img src={annualplancheckboxicon} alt="paymentchekbox" />
                                <Typography m={2} className={classes.fontcolor}>
                                    Customer Support
                                </Typography>
                            </Stack>

                            <Stack direction={"row"}>
                                <img src={annualplancheckboxicon} alt="paymentchekbox" />
                                <Typography m={2} className={classes.fontcolor}>
                                    New Tools and Features Coming Soon
                                </Typography>
                            </Stack>
                        </Stack>
                        <Box style={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="contained"
                                size="large"
                                className={classes.yearplanbutton}
                                onClick={buySubscriptionAnnually}
                                sx={{ borderRadius: 30, fontSize: 22, textTransform: "none", }}
                            >
                                {loadingyear ? <CircularProgress size={25} style={{ color: "#F6F6FB" }} /> : "Choose Plan"}
                            </Button >
                        </Box >
                    </Stack>
                </Grid>
            </Grid >
        </>
    )
}

export default Payment