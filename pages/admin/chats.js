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
import moment from 'moment'
import { get } from 'js-cookie';

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



const Chat = () => {
    const classes = useStyles();
    const [message, setMessage] = useState('')
    const [disable, setDisable] = useState(false)
    const [user, setUser] = useState('')
    const [allUser, setAllUser] = useState([])
    const [online, setOnline] = useState([])
    const [newMessage, setNewMessage] = useState([])
    const [getsender, setGetSender] = useState('')
    const [profile, setProfile] = useState('')
    const [chat, setChat] = useState([])
    const[flag,setFlag]=useState(false)
    const[currentRoom,setRoom]=useState(null)

    const inputMessage = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = async () => {


        const obj = {
            fromUID: user,
            toUID: getsender,
            message,
            roomID:currentRoom

        }

        console.log(obj,"kkkkk")
    
        // const list = new APIservices()
        // const api = `/user/userChat/`
        // const result = await list.chatPost({ body: obj, api })
        socket.emit("message", (obj), () => {
        
        })
        // setChat(chat => [...chat, obj])
        setMessage('')


    }


    useEffect(() => {
        socket.on("uid", (user_uid) => {
            setUser(user_uid)
        })
        console.log('=>>>>>>>>>>>>>>>>>>',socket);
     
        socket.on("chat", (obj) => {
            console.log("hacked", obj)
            // const list = new APIservices()
            // const api = `/user/userChat/`
            // const result =  list.chatPost({ body: obj, api })
            setChat(chat => [...chat, obj])
        })
        const accessToken = access
        const refreshToken = refresh
        const list = new APIservices()
        const api = `${process.env.baseUrl}/user/userCrud`
        list.get(api, { refreshToken: refresh, accessToken: access }).then((res) => {

            setAllUser(res.data)


        })
    }, [])

    const getData = async (e) => {
        setGetSender(e.target.alt)
   setFlag(true)
        const accessToken = access
        const refreshToken = refresh

        const list = new APIservices()
        const api = `${process.env.baseUrl}/user/userCrud/${e.target.alt}`
        list.get(api, { refreshToken: refresh, accessToken: access }).then((res) => {
            setProfile(res.data)
        }).catch((err) => {
            console.log(err)
        })
        list.get(`${process.env.baseUrl}/user/userChat/?fromUID=${user}&toUID=${e.target.alt}`, { refreshToken: refresh, accessToken: access }).then((res) => {
            let arr = []
            console.log(res, "response")
            setRoom(res.data.room)
            res.data.map((res) => {
               
                if ((res.fromUID === user && res.toUID ===e.target.alt)||(res.toUID===user&&res.fromUID===e.target.alt))
                    arr.push(res)
            })
          
            setChat(arr)

        }).catch((err) => {

        })
  socket.emit('toUID',(e.target.alt))
    }


    return (
        <div>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        {
                            profile ? <ListItem button key={profile.uid} >
                                <ListItemIcon>
                                    <Avatar alt={profile.email} src={profile.profilePicture} />
                                </ListItemIcon>
                                <ListItemText primary={profile.firstName}>{profile.firstName}</ListItemText>
                            </ListItem> : " "
                        }
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    <List>
                        {allUser.map(ele => (
                            <ListItem button key={ele.uid} primaryText={ele.uid}>
                                <ListItemIcon onClick={(event) => { event.persist(); getData(event) }}  >
                                    <Avatar alt={ele.uid} src={ele.profilePicture} />
                                </ListItemIcon>
                                <ListItemText primary={ele.firstName}>{ele.firstName} {ele.lastName}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <List className={classes.messageArea}>
                        { flag===true ?chat.map(ele => (<ListItem button key={ele.createdAt} >
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align={ele.fromUID == user ? "left" : "right"} primary={ele.message}></ListItemText>
                                </Grid>
                                <Grid item xs={12}>

                                </Grid>
                            </Grid>
                        </ListItem>)):""}
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





















































