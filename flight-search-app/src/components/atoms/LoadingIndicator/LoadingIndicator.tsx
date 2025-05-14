'use client';

import React from 'react';
import { Box, Skeleton } from '@mui/material';

// Simple loading indicator using Skeletons to mimic the form/results layout
const LoadingIndicator: React.FC = () => {
    return (
        <Box sx={{ width: '100%', p: 2, minHeight: '500px' }}>
            {/* Mimic a result card */}
            <Skeleton variant="rounded" animation="wave" height={100} sx={{ mb: 2 }} />
            <Skeleton variant="rounded" animation="wave" height={100} />
        </Box>
    );
};

export default LoadingIndicator; 