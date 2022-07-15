import React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default observer(function ServerError() {
    
    const {commonStore} = useStore();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={8}>
                    <Item>
                        <Alert severity="error">
                            {commonStore.error?.message}
                        </Alert>
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <Link to='/activities'>
                            <Button>Return to activities page</Button>
                        </Link>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
})