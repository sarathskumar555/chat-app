import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Link from 'next/link'
import { Alert, AlertTitle } from '@material-ui/lab';
import Router from "next/router";
import avatar from "assets/img/faces/marc.jpg";
import profilePic from "assets/img/faces/default.jpg";
const axios = require('axios');
import { useCookie } from 'next-cookie'
import cookieCutter from 'cookie-cutter'
import APIservices from '../services/APIservices'
// import S3FileUpload from 'react-s3';
import AWSservices from '../services/awsServices'
import ImageUploading from 'react-images-uploading';
import Image from 'next/image'



import S3 from 'react-aws-s3';
// import AWS from 'aws-sdk';
// import S3FileUpload from 'react-s3';
// import { uploadFile } from 'react-s3';




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
const uploadStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1)
        }
    },
    input: {
        display: "none"
    }
}))

const useStyles = makeStyles(styles);



function UserProfile() {




    const classes = useStyles();
    const [disable, setDisable] = useState(false)
    const [alert, setAlert] = useState(true)
    const [isFirstName, setFirstName] = useState(true)
    const [file, setFile] = useState(profilePic)
    const [name, setName] = useState('')
    const [link, setLink] = useState('')
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        designation: "",
        password: "",
        confirmPassword: "",
        profilePic: ""
    })
    const [img, setImg] = useState(profilePic)

    const register = async () => {
        const { firstName, lastName, email, designation, password, confirmPassword } = userData
        if (firstName !== "" && lastName !== "" && email !== "" && designation !== "" && password !== "" && confirmPassword != "") {
            const register = new APIservices()
            const aws = new AWSservices()
            const result = await aws.s3Upload({ file, filename: name })
            const api = '/user/userCrud'
            const body = { firstName, lastName, email, designation, password, profilePicture: result.Location }
            register.post({ body, api }).then((res) => {


                Router.push("/admin/employ")
            })
                .catch((err) => {
                    setFirstName(false)
                })
        }
        else {
            setAlert(false)
        }

    }
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    const files = (e) => {

        setFile(e.target.files[0])
        setName(e.target.files[0].name)
        getBase64(e.target.files[0]).then((res) => { setImg(res) }).catch((err) => {
            console.log(err)
        })

    }
    const uploadClass = uploadStyles()
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
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                <Image src={img} alt="..." width={500}
                                    height={500} />
                            </a>
                        </CardAvatar>

                        <CardBody profile>
                            {alert ? " " : <Alert onClose={() => setAlert(true)} variant="filled" severity="info"  >field required!!! </Alert>}
                            {isFirstName ? " " : <Alert onClose={() => setFirstName(true)} variant="filled" severity="info"  >Username already exist!!! </Alert>}
                            <GridContainer>


                                <GridItem xs={12} sm={12} md={6}>

                                    <CustomInput
                                        labelText="First Name"
                                        id="first-name"
                                        inputProps={{
                                            onChange: ({ target: { name, value } }) => {
                                                setUserData({
                                                    ...userData,
                                                    firstName: value
                                                })
                                                console.log([name])
                                            },
                                            name: "first_name",


                                        }}
                                        formControlProps={{
                                            fullWidth: true,

                                        }}

                                    />

                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Last Name"
                                        id="last-name"
                                        inputProps={{
                                            onChange: ({ target: { name, value } }) => {
                                                setUserData({
                                                    ...userData,
                                                    lastName: value
                                                })
                                            },
                                            name: "last_name"

                                        }}

                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Designation"
                                        id="designation"
                                        inputProps={{
                                            onChange: ({ target: { name, value } }) => {
                                                setUserData({
                                                    ...userData,
                                                    designation: value
                                                })
                                            },
                                            name: "designation"
                                        }}
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Email address"
                                        id="email-address"
                                        inputProps={{
                                            onChange: ({ target: { name, value } }) => {
                                                setUserData({
                                                    ...userData,
                                                    email: value
                                                })
                                            },
                                            name: "email_address"
                                        }}
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
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
                                            name: "password"

                                        }}
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    />

                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>


                                    {(userData.confirmPassword === userData.password) && ((userData.password) && (userData.confirmPassword)).length >= 6 ? <CustomInput
                                        labelText="Confirm Password"
                                        id="confirm-password"
                                        success={Boolean}
                                        inputProps={{
                                            onChange: ({ target: { name, value } }) => {
                                                setUserData({
                                                    ...userData,
                                                    confirmPassword: value
                                                })

                                            },
                                            name: "confirm_password"

                                        }}
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    /> : <CustomInput
                                            labelText="Confirm Password"
                                            id="confirm-password"
                                            error={Boolean}
                                            inputProps={{
                                                onChange: ({ target: { name, value } }) => {
                                                    setUserData({
                                                        ...userData,
                                                        confirmPassword: value
                                                    })

                                                },
                                                name: "confirm_password"

                                            }}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />}


                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <input
                                        accept="image/*"
                                        className={uploadClass.input}
                                        id="contained-button-file"
                                        onChange={files}
                                        multiple
                                        type="file"
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" color="primary" component="span">
                                            Upload profile picture
        </Button>
                                    </label>

                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>

                                    <Button color="primary" onClick={register} disabled={disable}>Register</Button>


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












