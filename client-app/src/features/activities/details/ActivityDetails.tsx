import React, { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles';
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

export default observer(function ActivityDetails() {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    
    const {id} = useParams<{id: string}>();
    
    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);
    
    if (loadingInitial || !activity) return <LoadingComponent />;

    return (
        <Grid container spacing={1}>
            <Grid item xs={7}>
                <Item>
                    <ActivityDetailedHeader activity={activity} />
                </Item>
            </Grid>
            <Grid item xs={5}>
                <Item>
                    <ActivityDetailedSidebar />
                </Item>
            </Grid>
        </Grid>
    )
})