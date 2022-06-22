import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import { Activity } from "../../../app/models/activity";
import { ListItemButton } from "@mui/material";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityList({activities, selectActivity, deleteActivity}: Props) {
    return (
        <Box
        display="flex" 
        alignItems="center"
        justifyContent="center"
        >
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {activities.map(activity => (
                <ListItem key={activity.id}>
                    <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary={
                        <Typography style={{ color: "white" }}>
                            {activity.title}
                        </Typography>
                    }
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {activity.category}
                            </Typography>
                            {` — ${activity.description}`}
                        </>
                    }
                    />
                    <ListItemButton onClick={() => selectActivity(activity.id)}>
                        <Typography 
                            color="blue"
                        >
                            View
                        </Typography>
                    </ListItemButton>
                    <ListItemButton onClick={() => deleteActivity(activity.id)}>
                        <Typography 
                            color="red"
                        >
                            Delete
                        </Typography>
                    </ListItemButton>
                </ListItem>
                ))}
                <Divider variant="inset" component="li" />
            </List>
        </Box>
    )
}