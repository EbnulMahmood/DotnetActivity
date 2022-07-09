import React from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Calendar from 'react-calendar';
import Divider from "@mui/material/Divider";

export default function ActivityFilters() {
    return (
        <>
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                    Filters
                    </ListSubheader>
                }
                >
                <ListItemButton>
                    <ListItemText primary="All Activities" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemText primary="I'm going" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemText primary="I'm hosting" />
                </ListItemButton>
            </List>
            <Divider />
            <Calendar />
        </>
    )
}