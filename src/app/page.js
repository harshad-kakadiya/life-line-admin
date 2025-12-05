'use client';

import React from 'react';
import {Container, Typography, Box, Grid, Card, CardContent} from '@mui/material';
import Link from 'next/link';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import InfoIcon from '@mui/icons-material/Info';


export default function Home() {
    const features = [
        {
            title: 'Video Management',
            description: 'Upload, edit, and manage your video content with ease',
            icon: VideoLibraryIcon,
            link: '/video',
            color: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        },
        {
            title: 'Gallery Management',
            description: 'Organize and showcase your photo collection',
            icon: PhotoLibraryIcon,
            link: '/gallery',
            color: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
        },
        {
            title: 'Press Release',
            description: 'Manage press releases with images and links',
            icon: ArticleIcon,
            link: '/press-release',
            color: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 100%)',
        },
        {
            title: 'Contact Management',
            description: 'Review and respond to contact form submissions',
            icon: ContactMailIcon,
            link: '/contact',
            color: 'linear-gradient(135deg, #4ade80 0%, #16a34a 100%)',
        },
        {
            title: 'Slide Image',
            description: 'Manage and organize slide images for your content',
            icon: SlideshowIcon,
            link: '/slide-image',
            color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        },
        {
            title: 'Person Detail ',
            description: 'Manage and organize person details and information',
            icon: PersonIcon,
            link: '/person-detail',
            color: 'linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)',
        },
        {
            title: 'Category',
            description: 'Create and manage categories for organizing content',
            icon: CategoryIcon,
            link: '/category',
            color: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        },
        {
            title: 'About',
            description: 'Manage about page entries with team member information',
            icon: InfoIcon,
            link: '/about',
            color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        },
    ];

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 64px)',
                background: 'linear-gradient(135deg, #a78bfa 0%, #c084fc 50%, #f093fb 100%)',
                position: 'relative',
                overflow: 'hidden',
                py: {xs: 4, sm: 6, md: 8},
            }}
        >
            <Container maxWidth="lg" sx={{position: 'relative', zIndex: 1, px: {xs: 2, sm: 3, md: 4}}}>
                <Box sx={{textAlign: 'center', mb: {xs: 4, sm: 6, md: 8}}}>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            color: '#ffffff',
                            fontSize: {xs: '2rem', sm: '2.75rem', md: '3.5rem', lg: '4rem'},
                            textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Welcome to Lock Rakshak Admin
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.95)',
                            mb: 4,
                            fontSize: {xs: '0.95rem', sm: '1.1rem', md: '1.25rem'},
                            fontWeight: 400,
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
                            letterSpacing: '0.01em',
                        }}
                    >
                        Manage your content with a modern, intuitive interface
                    </Typography>
                </Box>
                <Grid
                    container
                    spacing={{xs: 3, sm: 3.5, md: 4}}
                    sx={{
                        justifyContent: 'center',
                    }}
                >
                    {features.map((feature, index) => {
                        const isSeventhItem = features.length === 8 && index === 6;
                        const isEighthItem = features.length === 8 && index === 7;
                        return (
                            <React.Fragment key={index}>
                                {isSeventhItem && (
                                    <Grid
                                        item
                                        xs={0}
                                        sm={0}
                                        md={4}
                                        lg={4}
                                        sx={{display: {xs: 'none', sm: 'none', md: 'block'}}}
                                    />
                                )}
                                {isEighthItem && (
                                    <Grid
                                        item
                                        xs={0}
                                        sm={0}
                                        md={4}
                                        lg={4}
                                        sx={{display: {xs: 'none', sm: 'none', md: 'block'}}}
                                    />
                                )}
                                <Grid
                                    item
                                    size={{
                                        xs: 12,
                                        sm: 6,
                                        md: 4,
                                        lg: 4,
                                    }}
                                    sx={{
                                        display: 'flex',
                                    }}
                                >
                                    <Link
                                        href={feature.link}
                                        style={{
                                            textDecoration: 'none',
                                            display: 'flex',
                                            width: '100%',
                                        }}
                                    >
                                        <Card
                                            sx={{
                                                width: '100%',
                                                height: {xs: '320px', sm: '360px', md: '400px', lg: '440px'},
                                                display: 'flex',
                                                flexDirection: 'column',
                                                borderRadius: {xs: '32px', sm: '36px', md: '40px'},
                                                background: '#ffffff',
                                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                cursor: 'pointer',
                                                overflow: 'hidden',
                                                position: 'relative',
                                                '&:hover': {
                                                    transform: 'translateY(-8px)',
                                                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.18), 0 4px 16px rgba(0, 0, 0, 0.12)',
                                                    '& .icon-square': {
                                                        transform: 'scale(1.05)',
                                                    },
                                                },
                                            }}
                                        >
                                            {/* Top Section - Gradient with Icon (2/3 of card) */}
                                            <Box
                                                sx={{
                                                    flex: '0 0 66.67%',
                                                    minHeight: '66.67%',
                                                    background: feature.color,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {/* Rounded Square Container for Icon */}
                                                <Box
                                                    className="icon-square"
                                                    sx={{
                                                        width: {xs: '100px', sm: '120px', md: '140px', lg: '160px'},
                                                        height: {xs: '100px', sm: '120px', md: '140px', lg: '160px'},
                                                        borderRadius: {xs: '20px', sm: '24px', md: '28px'},
                                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                                        backdropFilter: 'blur(10px)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        border: '2px solid rgba(255, 255, 255, 0.3)',
                                                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                                                    }}
                                                >
                                                    <feature.icon sx={{
                                                        fontSize: {xs: '48px', sm: '56px', md: '64px', lg: '72px'},
                                                        color: '#ffffff',
                                                    }}/>
                                                </Box>
                                            </Box>

                                            {/* Bottom Section - White with Text (1/3 of card) */}
                                            <CardContent
                                                sx={{
                                                    flex: '0 0 33.33%',
                                                    minHeight: '33.33%',
                                                    p: {xs: 3, sm: 3.5, md: 4},
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#ffffff',
                                                    position: 'relative',
                                                }}
                                            >
                                                <Typography
                                                    variant="h5"
                                                    component="h2"
                                                    sx={{
                                                        fontWeight: 700,
                                                        mb: 1.5,
                                                        color: '#1e293b',
                                                        fontSize: {xs: '1.15rem', sm: '1.25rem', md: '1.35rem'},
                                                        lineHeight: 1.2,
                                                        letterSpacing: '-0.01em',
                                                    }}
                                                >
                                                    {feature.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: '#64748b',
                                                        lineHeight: 1.6,
                                                        fontSize: {xs: '0.875rem', sm: '0.9rem', md: '0.95rem'},
                                                        fontWeight: 400,
                                                    }}
                                                >
                                                    {feature.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </Grid>
                            </React.Fragment>
                        );
                    })}
                </Grid>
            </Container>
        </Box>
    );
}
