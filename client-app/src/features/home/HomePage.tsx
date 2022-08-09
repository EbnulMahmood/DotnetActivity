import React from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default observer(function HomePage() {
    const {userStore: {isLoggedIn}, modalStore: {openModal}} = useStore();
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh', backgroundColor: 'black' }}
        >
            <Grid item xs={3}>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <Item>
                            <Avatar alt="Remy Sharp" src="/assets/logo.png" />
                        </Item>
                    </Grid>
                    <Grid item xs={10}>
                        <Item>
                            <Typography 
                                variant="h3"
                                component="div"
                                gutterBottom
                            >
                                .NET Activity
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
                {isLoggedIn ? (
                    <>
                        <Item>
                            <Typography 
                                variant="h5"
                                component="div"
                                gutterBottom
                            >
                                Welcome to .NET activities
                            </Typography>
                        </Item>
                        <Item>
                            <Typography 
                                variant="h6"
                                component="div"
                                gutterBottom
                            >
                                Go to <Link to='/activities'>
                                    <Button variant="contained">Activities</Button>    
                                </Link>
                            </Typography>
                        </Item>
                    </>
                ) : (
                    <Item>
                        <Typography 
                            variant="h6"
                            component="div"
                            gutterBottom
                        >
                            <>
                                <Button 
                                    onClick={() => openModal(<LoginForm />)} 
                                    variant="contained"
                                >
                                    Login
                                </Button>   
                                <Button 
                                    onClick={() => openModal(<RegisterForm />)} 
                                    variant="contained"
                                >
                                    Register
                                </Button> 
                            </>
                        </Typography>
                    </Item>
                )}
            </Grid>   
        </Grid>
    )
})