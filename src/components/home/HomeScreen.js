import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { userStartLoading } from '../../actions/users';
import { UserTable } from '../ui/UserTable';

export const HomeScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userStartLoading())
    }, [dispatch])
    

    return (
        <>
            <Box sx={{ flexGrow: 1, justifyContent: 'center', display: 'flex', marginTop: '20px' }}>
                <Grid
                    container
                    spacing={3}
                    maxWidth='97%'
                >
                    <Grid item xs>
                        
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant='h4'>Usuarios</Typography>
                        <hr/>
                        <UserTable />
                    </Grid>
                    <Grid item xs>
                        
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
