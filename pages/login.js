import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Link from 'next/link'
import login from "layouts/Admin.js";
import avatar from "assets/img/faces/download.png";
const axios = require('axios');
import Router from "next/router";
import { useCookie } from 'next-cookie'
import { setCookie } from 'react-use-cookie';
import Cookies from 'js-cookie'
import APIservices from '../services/APIservices'
import S3 from 'react-aws-s3';



import { Alert, AlertTitle } from '@material-ui/lab';
import AuthServices from "../services/AuthServices";

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
    },
};

const config = {
    bucketName: "bulletin-live",
    region: "us-east-1",
    accessKeyId: "AKIATJHCR6HHR2VP7SI3",
    secretAccessKey: "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",
    IdentityPoolId: "us-east-1:77c00627-dd1b-4fb8-a0ed-7ae1f777ac19",
}
const ReactS3Client = new S3(config);
console.log(avatar,"avatrat")
const file='download.png'
// ReactS3Client
//     .uploadFile(file)
//     .then(data => console.log(data))
//     .catch(err => console.error(err))


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));


function UserProfile() {

    

    const classes = useStyles();
    const [alert, setAlert] = useState(true)
    const [userData, setUserData] = useState({
        firstName: "",
        password: ""
    })

    const login = async () => {
        const login = new APIservices()
    
        const { firstName, password } = userData
        // const api = `${process.env.baseUrl}/user/login`
        const api='/user/login'
        const body = { firstName, password }
        login.post({ body,api }).then((res) => {
            
            Router.push("/admin/employ")
      
        }).catch((err) => {
            setAlert(false)
          
        })
 

    }


    return (
        <div>
            <GridContainer>

                <CardHeader>
                    <h4 className={classes.cardTitleWhite}>.</h4>
                    <p className={classes.cardCategoryWhite}>.</p>
                </CardHeader>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>

                    <Card profile>
                        <CardAvatar profile>

                            <img src={avatar} alt="..." />


                        </CardAvatar>

                        <CardBody profile>
                            {alert ? " " : <Alert severity="error" onClose={() => setAlert(true)}>Invalid Crendiatials!!! </Alert>
                            }
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="User Name"
                                        id="first-name"

                                        inputProps={{
                                            onChange: ({ target: { name, value,file } }) => {
                                             
                                                { console.log({ name, value ,file}) }
                                                setUserData({
                                                    ...userData,
                                                    firstName: value
                                                })
                                            },
                                            
                                        }}
                                        formControlProps={{
                                            fullWidth: true,

                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Password"
                                        id="password"
                                      
                                        inputProps={{
                                            onChange: ({ target: { name, value } }) => {
                                                setUserData({
                                                    ...userData,
                                                    password: value
                                                })

                                            },
                                            name: "password",
                                            type:"password"

                                        }}
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    />
                                </GridItem>

                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>

                                    <Button onClick={login} color="rose">login</Button>

                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Link href="/register">
                                        <a>Create Account</a>
                                    </Link>

                                </GridItem>
                            </GridContainer>
                        </CardBody>

                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}



export default UserProfile;











