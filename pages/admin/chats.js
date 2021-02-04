import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Admin from "layouts/Admin.js";
import AuthServices from '../../services/AuthServices'
import APIservices from '../../services/APIservices'
import Router from "next/router";
import * as cookie from 'cookie'
import jwt_decode from "jwt-decode";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
});

const authService = new AuthServices();
const { access, refresh } = authService.getAuth()
const socket = openSocket.connect('http://localhost:3500', {
    query: { access, refresh }
})
// console.log(access,"accessss")
// var token = `"${access}"` 
// var decoded = jwt_decode(token);

// console.log(decoded,"kkk");

const Chat = ({ }) => {
    //     let s=1
    //     const classes = useStyles();
    //     const [message, setMessage] = useState('')
    //     const[flags,setflag]=useState(true)
    //     const[data,setData]=useState([])
    //     const[intial,setIntialId]=useState([])


    //     useEffect(() => {
    //         socket.on('message1', (m) => {
    //            setData([...data,m])

    //             console.log(m,"result")
    //         })



    //     }, [data])
    //     // useEffect(()=>{
    //     //     socket.on('message', result => {
    //     //         setIntialId([...intial,result.uid])
    //     //     })
    //     // },[intial])

    //     const inputMessage = (e) => {
    //         setMessage(e.target.value)
    //     }

    //     const sendMessage = () => {
    //         socket.emit('sendMessage', message, (message) => {
    //             console.log(message)
    //         })
    //         setMessage('')


    //     }
    // console.log("welocome",intial)



    const classes = useStyles();
    const [message, setMessage] = useState('')
    const [disable, setDisable] = useState(false)
    const [user, setUser] = useState('')
    const [data, setData] = useState([])
    const [list, setList] = useState([])
    const[id,setId]=useState()

    const inputMessage = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = () => {

        setDisable(true)
        console.log("data", data)
        socket.emit('sendMessage', {uid:id,message}, (message) => {
            setDisable(false)
            setMessage('')
            console.log(message)
        })
    }

    useEffect(() => {
        socket.on('message', (m) => {
            // console.log(socket.id, "client")
            // if (m.message !== "welocome")
            //     setData(data => [...data, m])
            if (m.message === "welocome") {
                setUser(m.uid)


            }

        })

        socket.on("delivered", (data) => {
            setData(data => [...data, m])
            console.log("getettete", data)
        })

        console.log(user, "sarath")
        const list = new APIservices()
        const api = `${process.env.baseUrl}/user/userCrud/${user}`
        list.get(api, { refreshToken: refresh, accessToken: access }).then((employeeList) => {

            const data = employeeList.data

            setList(data)
        })







    }, [data])

    // (function () {
    //     /* */
    // })()

    // ( data= async () => {


    //     const list = new APIservices()
    //     const api = `${process.env.baseUrl}/user/userCrud/${user}`
    //     list.get(api, { refreshToken: refresh, accessToken: access }).then((employeeList) => {

    //         const data = employeeList.data

    //         setList(data)
    //     })


    // })()




    const fetch = async (e) => {
    
        setId(e.target.alt)

        console.log(id,"jjjjj")
    }




    return (
        <div>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        {
                            list.map(ele => (
                                ele.uid === user ? <ListItem button key={ele.email} >
                                    <ListItemIcon>

                                        <Avatar alt={ele.email} src={ele.profilePicture} />


                                    </ListItemIcon>
                                    <ListItemText primary={ele.firstName}>{ele.firstName} {ele.lastName}</ListItemText>
                                </ListItem> : " "
                            ))
                        }
                    </List>

                    <Grid item xs={12} style={{ padding: '10px' }}>
                    </Grid>
                    <List>
                        {list.map(ele => (
                            <ListItem button key={ele.uid}
                                primaryText={ele.uid}  >
                                <ListItemIcon onClick={(event) => { event.persist(); fetch(event) }}  >
                                    <Avatar alt={ele.uid} src={ele.profilePicture} />
                                </ListItemIcon>
                                <ListItemText primary={ele.firstName}>{ele.firstName} {ele.lastName}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <List className={classes.messageArea}>
                        {data.map(e => (
                            <ListItem key="1">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align={e.uid == user ? "right" : "left"} primary={e.message} secondary={e.time}></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>

                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <Grid container style={{ padding: '9px' }}>
                        <Grid item xs={11}>
                            <TextField id="basic" label="Type Something" fullWidth onChange={inputMessage} value={message || ''} />
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add" onClick={sendMessage} {...(disable ? { disabled: true } : {})}><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}


Chat.layout = Admin;
export default Chat;































































