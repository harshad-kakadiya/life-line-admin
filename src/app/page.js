'use client';

import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import Link from 'next/link';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PersonIcon from '@mui/icons-material/Person';


export default function Home() {
    const features = [
        {
            title: 'Video Management',
            description: 'Upload, edit, and manage your video content with ease',
            icon: <VideoLibraryIcon sx={{ fontSize: 80, color: '#ffffff' }} />,
            link: '/video',
            color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
            title: 'Gallery Management',
            description: 'Organize and showcase your photo collection',
            icon: <PhotoLibraryIcon sx={{ fontSize: 80, color: '#ffffff' }} />,
            link: '/gallery',
            color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        },
        {
            title: 'Press Release',
            description: 'Manage press releases with images and links',
            icon: <ArticleIcon sx={{ fontSize: 80, color: '#ffffff' }} />,
            link: '/press-release',
            color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        },
        {
            title: 'Contact Management',
            description: 'Review and respond to contact form submissions',
            icon: <ContactMailIcon sx={{ fontSize: 80, color: '#ffffff' }} />,
            link: '/contact',
            color: 'linear-gradient(135deg, #34e89e 0%, #0f3443 100%)',
        },
        {
            title: 'Slide Image',
            description: 'Manage and organize slide images for your content',
            icon: <SlideshowIcon sx={{ fontSize: 80, color: '#ffffff' }} />,
            link: '/slide-image',
            color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        },
        {
            title: 'Person Detail ',
            description: 'Manage and organize person details and information',
            icon: <PersonIcon sx={{ fontSize: 80, color: '#ffffff' }} />,
            link: '/person-detail',
            color: 'linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)',
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
                        Welcome to Lock Rakshak Admin
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
                <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                            <Link href={feature.link} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        minHeight: '320px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: '20px',
                                        background: '#ffffff',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flex: '0 0 65%',
                                            minHeight: '200px',
                                            background: feature.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>
                                    <CardContent 
                                        sx={{ 
                                            flex: '0 0 35%',
                                            p: 3,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            backgroundColor: '#ffffff',
                                        }}
                                    >
                                        <Typography 
                                            variant="h5" 
                                            component="h2" 
                                            sx={{ 
                                                fontWeight: 700, 
                                                mb: 1, 
                                                color: '#1e293b',
                                                fontSize: '1.25rem',
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: '#475569',
                                                lineHeight: 1.6,
                                                fontSize: '0.875rem',
                                            }}
                                        >
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
