

import React ,{useState} from "react";
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

const useStyles = makeStyles(styles);

function deleteacc() {
     const classes = useStyles();
    return (
        <div>
            <GridContainer>

                <CardHeader>
                    <h4 className={classes.cardTitleWhite}>Register</h4>
                    <p className={classes.cardCategoryWhite}>Complete your profile</p>
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

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="User Name"
                                        id="first-name"

                                        inputProps={{
                                            onChange: ({ target: { name, value } }) => {
                                                { console.log({ name, value }) }
                                            },
                                            name: "first_name"
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
                                                console.log(name, value)
                                            },
                                            name: "password"
                                        }}
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    />
                                </GridItem>

                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Link href="/admin/chats">
                                        <Button color="rose">delete</Button>
                                    </Link>

                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                               
                            </GridContainer>
                        </CardBody>

                    </Card>
                </GridItem>
                <CardHeader>
                    <h4 className={classes.cardTitleWhite}>Register</h4>
                    <p className={classes.cardCategoryWhite}>Complete your profile</p>
                </CardHeader>
            </GridContainer>
        </div>
    )
}

export default deleteacc
deleteacc.layout = Admin;