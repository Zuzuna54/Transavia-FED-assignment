'use client';

import React from 'react';
import { Box, Skeleton, Grid } from '@mui/material';

// Simple loading indicator using Skeletons to mimic the form/results layout
const LoadingIndicator: React.FC = () => {
    return (
        <Box sx={{ width: '100%', p: 2 }}>
            {/* Mimic a couple of form fields */}
            <Grid container={true} spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Skeleton variant="rounded" animation="wave" height={56} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Skeleton variant="rounded" animation="wave" height={56} />
                </Grid>
            </Grid>
            {/* Mimic a result card */}
            <Skeleton variant="rounded" animation="wave" height={100} sx={{ mb: 2 }} />
            <Skeleton variant="rounded" animation="wave" height={100} />
        </Box>
    );
};

export default LoadingIndicator; 