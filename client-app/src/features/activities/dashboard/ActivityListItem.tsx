import React, { SyntheticEvent, useState } from "react";
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ListItemButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ListItem from '@mui/material/ListItem';
import { Link } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

interface Props {
    activity: Activity
}

export default function ActivityListItem({activity}: Props) {
    
    const {activityStore} = useStore();
    const {deleteActivity, loading} = activityStore;
    const [target, setTarget] = useState('');
    
    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.id);
        deleteActivity(id);
    }

    return (
        <ListItem key={activity.id}>
            <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/assets/user.png" />
            </ListItemAvatar>
            <ListItemText
            primary={
                <Link to={`/activities/${activity.id}`}>
                    <Typography style={{ color: "white" }}>
                        {activity.title}
                    </Typography>
                </Link>
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
            <LoadingButton 
                onClick={(e) => handleActivityDelete(e, activity.id)}
                id={activity.id}
                loading={loading && target === activity.id}
                color="warning"
            >
                Delete
            </LoadingButton>
            <Link to={`/activities/${activity.id}`}>
                <ListItemButton>
                    <Typography 
                        color="blue"
                    >
                        View
                    </Typography>
                </ListItemButton>

            </Link>
        </ListItem>
    )
}