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
    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
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
                <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} onClick={handleDrawerToggle}>
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
            {/* Top Teal/Greenish-Blue Bar */}
            <Box
                sx={{
                    width: '100%',
                    height: '4px',
                    backgroundColor: '#2d7a7a',
                    position: 'sticky',
                    top: 0,
                    zIndex: theme.zIndex.drawer + 2,
                }}
            />
            
            <AppBar 
                position="sticky" 
                sx={{ 
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    top: '4px',
                    zIndex: theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar 
                    sx={{ 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        px: { xs: 1.5, sm: 2, md: 3, lg: 4, xl: 6 }, 
                        py: 0,
                        minHeight: '75px !important',
                        height: '75px',
                        maxHeight: '75px',
                        gap: { xs: 1, sm: 1.5, md: 2 },
                    }}
                >
                    {/* Logo - Left Side */}
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            flexShrink: 0,
                            height: '100%',
                        }}
                    >
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', height: '100%' }}>
                            <Image
                                src="/assets/images/img.png"
                                alt="Logo"
                                width={isMobile ? 70 : isTablet ? 90 : 110}
                                height={isMobile ? 70 : isTablet ? 75 : 75}
                                style={{ 
                                    objectFit: 'contain',
                                    width: 'auto',
                                    height: '100%',
                                    maxHeight: '75px',
                                }}
                                priority
                            />
                        </Link>
                    </Box>

                    {/* Navigation Menu - Right Side */}
                    {isMobile ? (
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerToggle}
                            sx={{ 
                                color: '#64748b',
                                flexShrink: 0,
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                gap: { md: 0.5, lg: 0.75, xl: 1 },
                                flexWrap: 'nowrap',
                                justifyContent: 'flex-end',
                                flexGrow: 1,
                                minWidth: 0,
                            }}
                        >
                            {navItems.map((item) => (
                                <Link key={item.path} href={item.path} style={{ textDecoration: 'none', flexShrink: 0 }}>
                                    <Button
                                        sx={{
                                            color: pathname === item.path ? '#6366f1' : '#64748b',
                                            fontWeight: pathname === item.path ? 600 : 500,
                                            textTransform: 'none',
                                            fontSize: { md: '12px', lg: '13px', xl: '14px' },
                                            px: { md: 0.75, lg: 1, xl: 1.25 },
                                            py: { md: 0.5, lg: 0.75 },
                                            whiteSpace: 'nowrap',
                                            minWidth: 'auto',
                                            transition: 'all 0.2s ease',
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
            
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: { xs: 280, sm: 320 },
                    },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
}

export default Navbar;
