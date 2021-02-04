import * as React from 'react';
import { useState } from 'react'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Link from 'next/link'
import Person from "@material-ui/icons/Person";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { Alert, AlertTitle } from '@material-ui/lab';
import { sortAndDeduplicateDiagnostics } from 'typescript';
import { URLSearchParams } from 'url';
import { getCookie } from 'react-use-cookie';
import openSocket from "socket.io-client";


import APIservices from '../../../services/APIservices'

const path = require("path")
const axios = require('axios');
import * as cookie from 'cookie'
import Router from "next/router";
const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0",
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF",
        },
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1",
        },
    },
};


const useStyles = makeStyles(styles);
export default function employees({ data }) {

   
    const arr = []
    data.map((res) => {
        const { uid: id, firstName, lastName, designation } = res
        arr.push({ id, firstName, lastName, designation })
    })

    const [alert, setAlert] = useState(true)
    const [params, setParams] = useState('')
    const [sort, setSort] = useState(arr)

    const generateId = (uid) => {
        setParams(uid)
        setAlert(false)
    }
    const columns = [

        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
        }, {
            field: '   ',
            headerName: '  Update ',
            width: 100,
            renderCell: (params) => (
                <strong>
                    <Link href={path.join("/admin/employ/" + params.row.id)}>

                        <Button
                            variant="contained"
                            color="inherit"
                            size="small"
                            style={{ marginLeft: 15 }} ><EditRoundedIcon /> </Button>
                    </Link>

                </strong>
            ),
        },
        {
            field: 'Delete ',
            headerName: ' Delete',
            width: 100,
            renderCell: (params) => (
                <strong>
                    <Button onClick={() => generateId(params.row.id)}
                        variant="contained"
                        color="inherit"
                        size="small"
                        style={{ marginLeft: 16 }}
                    ><DeleteRoundedIcon />
                    </Button>
                </strong>
            ),
        },
        {
            field: 'View ',
            headerName: 'View',
            width: 100,
            renderCell: (params) => (
                <strong>
                    <Link href={path.join("/admin/employ/" + params.row.id)}>
                        <Button
                            variant="contained"
                            color="inherit"
                            size="small"
                            style={{ marginLeft: 16 }} > < Person /> </Button>
                    </Link>
                </strong>
            ),
        }
    ];
    const dataDelete = () => {
        const del = new APIservices()
        const api = `${process.env.baseUrl}/user/userCrud/${params}`

        del.deleted({ api }).then((res) => {
            setSort(sort.filter((el) => el.id !== params));
            setAlert(true)
        }).catch((err) => {
            console.log(err,)
        })
    }
    const rows = sort
    const classes = useStyles();
    return (
        <div>
            {alert ? " " : <Alert onClose={() => setAlert(true)} variant="filled" severity="info" action={
                <div>
                    <Button onClick={dataDelete} color="inherit" size="small"> confirm</Button>
                    <Button onClick={() => setAlert(true)} color="inherit" size="small">cancel</Button>
                </div>
            } >Do you want to delete  </Alert>}
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5}
                />
            </div >
        </div>

    )
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
    const api = `${process.env.baseUrl}/user/userCrud`
    const list = new APIservices
    const employeeList = await list.get(api, { refreshToken, accessToken })
    const data = [...employeeList.data]

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
employees.layout = Admin;
