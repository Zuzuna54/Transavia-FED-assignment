'use client';

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import theme from '@/styles/theme';
// Import LicenseInfo from the newer package
import { LicenseInfo } from '@mui/x-license';
// Emotion Cache specific imports for SSR
import createCache, { Options as EmotionCacheOptions } from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';

// This implementation is based on the official MUI documentation for App Router
// https://mui.com/material-ui/integrations/nextjs/#app-router

export default function ThemeRegistry(props: { options?: EmotionCacheOptions; children: React.ReactNode }) {
    console.log("--- Rendering ThemeRegistry ---");
    const { options, children } = props;

    // Set the license key synchronously at the start of the component function body
    LicenseInfo.setLicenseKey(
        '8b16ac2d95778816b4a88387905c5a38Tz03NzIxMCxFPTE3NDg1ODcyMDAwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI='
    );

    const [{ cache, flush }] = React.useState(() => {
        const cache = createCache({ key: 'mui', ...options });
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: string[] = [];
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };
        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
            return null;
        }
        let styles = '';
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(' ')}`}
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        );
    });

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    {children}
                </LocalizationProvider>
            </ThemeProvider>
        </CacheProvider>
    );
} 