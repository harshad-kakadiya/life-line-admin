'use client';

import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent } from '@mui/material';
import Link from 'next/link';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ArticleIcon from '@mui/icons-material/Article';

export default function Home() {
    const features = [
        {
            title: 'Video Management',
            description: 'Upload, edit, and manage your video content with ease',
            icon: <VideoLibraryIcon sx={{ fontSize: 48, color: '#6366f1' }} />,
            link: '/video',
            color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
            title: 'Gallery Management',
            description: 'Organize and showcase your photo collection',
            icon: <PhotoLibraryIcon sx={{ fontSize: 48, color: '#10b981' }} />,
            link: '/gallery',
            color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        },
        {
            title: 'Press Release',
            description: 'Manage press releases with images and links',
            icon: <ArticleIcon sx={{ fontSize: 48, color: '#f59e0b' }} />,
            link: '/press-release',
            color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        },
    ];

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 64px)',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(120, 119, 198, 0.3), transparent 50%)',
                },
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography 
                        variant="h2" 
                        component="h1" 
                        sx={{ 
                            fontWeight: 700, 
                            mb: 2,
                            color: '#ffffff',
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                        }}
                    >
                        Welcome to Life Line Admin
                    </Typography>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            color: 'rgba(255, 255, 255, 0.9)',
                            mb: 4,
                            fontSize: { xs: '1rem', md: '1.25rem' },
                        }}
                    >
                        Manage your content with a modern, intuitive interface
                    </Typography>
                </Box>
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Link href={feature.link} style={{ textDecoration: 'none' }}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        background: '#ffffff',
                                        borderRadius: '20px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
                                            '& .feature-icon': {
                                                transform: 'scale(1.1) rotate(5deg)',
                                            },
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: '120px',
                                            background: feature.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                top: '-50%',
                                                left: '-50%',
                                                width: '200%',
                                                height: '200%',
                                                background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                                                animation: 'pulse 3s ease-in-out infinite',
                                            },
                                        }}
                                    >
                                        <Box className="feature-icon" sx={{ transition: 'transform 0.3s ease', zIndex: 1 }}>
                                            {feature.icon}
                                        </Box>
                                    </Box>
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 1, color: '#1e293b' }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.7 }}>
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
