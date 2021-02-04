import React, { useState,useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// layout for this page
import Admin from "layouts/Admin.js";
import Image from 'next/image'
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
const axios = require('axios');
import * as cookie from 'cookie'
import avatar from "assets/img/faces/default.jpg";
import { useRouter } from 'next/router'
import { getCookie } from 'react-use-cookie';
import Router from "next/router";
import APIservices from '../../../services/APIservices'
import AuthServices from "../../../services/AuthServices";
import profilePic from "assets/img/faces/default.jpg";
import AWSservices from '../../../services/awsServices'
import button from "@material-ui/core/Button";

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

function UserProfile({ data }) {
  const { firstName, lastName, designation, email, uid, profilePicture ,password} = data
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    designation: "",
    password: "",
   

  })
  useEffect(()=>{

setUserData(data)


  },[data])
  const [list, setList] = useState({
    name: firstName,
    design: designation
  })
  const { name, design } = list
  const[image,setImage]=useState(profilePicture)
  const [file, setFile] = useState('')
  const [name1, setName1] = useState('')
  const updateprofile=async ()=>{
    
  }
  console.log(image,"imagekkk")
  const update = async () => {
    const register = new APIservices()
    const aws = new AWSservices()
    const result = await aws.s3Upload({ file, filename: name1 })
    const body = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      designation: userData.designation,
      password: userData.password,
      profilePicture:result.Location
    }
    
    const update = new APIservices()
    const api = `${process.env.baseUrl}/user/userCrud/${uid}`
    update.update({ api,body }).then((res) => {
      const { firstName: name, designation: design } = userData
      setList({
        name,
        design
      })
    }).catch((err) => {
      console.log(err,)
    })
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
    setName1(e.target.files[0].name)
    getBase64(e.target.files[0]).then((res) => { setImage(res) }).catch((err) => {
      console.log(err)
    })

  }
  const uploadClass = uploadStyles()
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={7}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={14} sm={12} md={3}>
                  <CustomInput
                    labelText="First Name"
                    id="firstName"
                    inputProps={{
                      onChange: ({ target: { name, value } }) => {
                        setUserData({
                          ...userData,
                          firstName: value
                        })

                      },
                      value:userData.firstName


                    }}

                    formControlProps={{
                      fullWidth: true,
                    }}
                  />

                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Last Name"
                    id="lastName"
                    inputProps={{
                      onChange: ({ target: { name, value } }) => {
                        setUserData({
                          ...userData,
                          lastName: value
                        })

                      },
                      value:userData.lastName
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
                    labelText="Email Address"
                    id="email"
                    inputProps={{
                      onChange: ({ target: { name, value } }) => {
                        setUserData({
                          ...userData,
                          email: value
                        })

                      },
                      value:userData.email



                    }}

                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="designation"
                    id="designation"
                    inputProps={{
                      onChange: ({ target: { name, value } }) => {
                        setUserData({
                          ...userData,
                          designation: value
                        })

                      },
                      value:userData.designation

                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
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
                      // value:userData.password,
                      name: "password",
                       type: "password"
                      
                    }}
                    
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>


              </GridContainer>


            </CardBody>
            <CardFooter>
              <Button onClick={update} color="primary">Update</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <Image src={image} alt="..." width={500}
                  height={500} />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>{design}</h6>
              <h4 className={classes.cardTitle}>{name}</h4>

             <GridItem>
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
                    Upload
        </Button>
                </label>
               
             </GridItem>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}


export async function getServerSideProps(context) {
 
  if (!context.req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }
  const parsedCookies = cookie.parse(context.req.headers.cookie)
  const { refreshToken, accessToken } = parsedCookies
  const url = context.params
  const { uid } = url
  const list = await new APIservices()
  const api = `${process.env.baseUrl}/user/userCrud/${uid}`
  const employeeList = await list.get(api,{refreshToken,accessToken})
  const data = employeeList.data

  if (employeeList.message === 'Authentication failed') {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }
  return { props: { data } }
}

UserProfile.layout = Admin;

export default UserProfile;
