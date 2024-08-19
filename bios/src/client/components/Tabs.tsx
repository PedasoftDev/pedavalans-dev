import { Box, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

interface StyledTabProps {
    label: string;
    disabled?: boolean;
}

export const AntTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: '#1890ff',
    },
});

export const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        minWidth: 0,
        [theme.breakpoints.up('sm')]: {
            minWidth: 0,
        },
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(1),
        color: 'rgba(0, 0, 0, 0.85)',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            background: 'rgba(0, 0, 0, 0.03)',
            opacity: 1,
        },
        '&.Mui-selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
            '&:hover': {
                background: 'transparent',
            }
        },
        '&.Mui-focusVisible': {
            backgroundColor: '#d1eaff',
        },
    }),
);

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

export function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}