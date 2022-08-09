import React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface Props {
    errors: any;
}

export default function ValidationErrors({errors}: Props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item>
                    {errors && (
                        <Item>
                            {errors.map((err: any, key: any) => (
                                <Alert key={key} severity="error">
                                    {err}
                                </Alert>
                            ))}
                        </Item>
                    )}
                </Grid>
            </Grid>
        </Box>
    )
}