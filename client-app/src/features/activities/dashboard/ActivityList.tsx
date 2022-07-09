import React from "react";
import List from '@mui/material/List';
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Divider from '@mui/material/Divider';
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";


export default observer(function ActivityList() {
    
    const {activityStore} = useStore();
    const {groupedActivities} = activityStore;

    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <Box
                    key={group}
                    display="flex" 
                    alignItems="center"
                    justifyContent="center"
                >
                    <Alert severity="success">{group}</Alert>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {activities.map(activity => (
                            <ActivityListItem key={activity.id} activity={activity} />
                            ))}
                        <Divider variant="inset" component="li" />
                    </List>
                </Box>
            ))}
        </>
    )
})