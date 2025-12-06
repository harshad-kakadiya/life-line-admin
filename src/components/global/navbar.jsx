'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    AppBar, 
    Toolbar, 
    Button, 
    Box, 
    IconButton, 
    Drawer, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemText,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

function Navbar() {
    const pathname = usePathname();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { path: '/video', label: 'Video' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/slide-image', label: 'Slide Image' },
        { path: '/press-release', label: 'Press Release' },
        { path: '/contact', label: 'Contact' },
        { path: '/person-detail', label: 'Person Detail' },
        { path: '/category', label: 'Category' },
        { path: '/about', label: 'About' },
        { path: '/location', label: 'Location' },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box sx={{ width: 280, pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 2 }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <Image
                        src="/assets/images/img.png"
                        alt="Logo"
                        width={120}
                        height={40}
                        style={{ objectFit: 'contain' }}
                    />
                </Link>
                <IconButton onClick={handleDrawerToggle} sx={{ color: '#64748b' }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <Link href={item.path} style={{ width: '100%', textDecoration: 'none' }} onClick={handleDrawerToggle}>
                            <ListItemButton
                                sx={{
                                    py: 1.5,
                                    px: 3,
                                    backgroundColor: pathname === item.path ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                    borderLeft: pathname === item.path ? '4px solid #6366f1' : '4px solid transparent',
                                    '&:hover': {
                                        backgroundColor: pathname === item.path ? 'rgba(99, 102, 241, 0.15)' : 'rgba(100, 116, 139, 0.08)',
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontWeight: pathname === item.path ? 600 : 500,
                                        color: pathname === item.path ? '#6366f1' : '#64748b',
                                        fontSize: '0.95rem',
                                    }}
                                />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar 
                position="sticky" 
                sx={{ 
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2, md: 6 }, py: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <Image
                                src="/assets/images/img.png"
                                alt="Logo"
                                width={isMobile ? 100 : 140}
                                height={isMobile ? 32 : 45}
                                style={{ objectFit: 'contain' }}
                            />
                        </Link>
                    </Box>
                    {isMobile ? (
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerToggle}
                            sx={{ color: '#64748b' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <Box sx={{ display: 'flex', gap: { xs: 0.5, lg: 1 }, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                            {navItems.map((item) => (
                                <Link key={item.path} href={item.path} style={{ textDecoration: 'none' }}>
                                    <Button
                                        sx={{
                                            color: pathname === item.path ? '#6366f1' : '#64748b',
                                            fontWeight: pathname === item.path ? 600 : 500,
                                            textTransform: 'none',
                                            fontSize: { xs: '13px', sm: '14px', lg: '15px' },
                                            px: { xs: 1.5, sm: 2, lg: 3 },
                                            py: 1,
                                            borderRadius: '8px',
                                            position: 'relative',
                                            transition: 'all 0.3s ease',
                                            whiteSpace: 'nowrap',
                                            '&::before': pathname === item.path ? {
                                                content: '""',
                                                position: 'absolute',
                                                bottom: 0,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                width: '60%',
                                                height: '3px',
                                                backgroundColor: '#6366f1',
                                                borderRadius: '2px',
                                            } : {},
                                            '&:hover': {
                                                backgroundColor: pathname === item.path ? 'rgba(99, 102, 241, 0.1)' : 'rgba(100, 116, 139, 0.08)',
                                                color: pathname === item.path ? '#6366f1' : '#475569',
                                            },
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                </Link>
                            ))}
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 280,
                    },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
}

export default Navbar;
