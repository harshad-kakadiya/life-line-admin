'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import Image from 'next/image';

function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { path: '/video', label: 'Video' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/press-release', label: 'Press Release' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <AppBar 
            position="sticky" 
            sx={{ 
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 }, py: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <Image
                            src="/assets/images/img.png"
                            alt="Logo"
                            width={140}
                            height={45}
                            style={{ objectFit: 'contain' }}
                        />
                    </Link>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {navItems.map((item) => (
                        <Link key={item.path} href={item.path} style={{ textDecoration: 'none' }}>
                            <Button
                                sx={{
                                    color: pathname === item.path ? '#6366f1' : '#64748b',
                                    fontWeight: pathname === item.path ? 600 : 500,
                                    textTransform: 'none',
                                    fontSize: '15px',
                                    px: 3,
                                    py: 1,
                                    borderRadius: '8px',
                                    position: 'relative',
                                    transition: 'all 0.3s ease',
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
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
