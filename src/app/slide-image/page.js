'use client';

import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardMedia,
    CardActions,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress,
    Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import DeleteIcon from '@mui/icons-material/Delete';
import { slideImageService } from '@/services/slideImageService';

export default function SlideImagePage() {
    const [slides, setSlides] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        image: null,
        imageUrl: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadSlides();
    }, []);

    const loadSlides = async () => {
        setLoading(true);
        try {
            const data = await slideImageService.getAll();
            setSlides(data || []);
        } catch (error) {
            console.error('Error loading slide images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = () => {
        setFormData({
            image: null,
            imageUrl: '',
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setFormData({
            image: null,
            imageUrl: '',
        });
    };

    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({
                image: file,
                imageUrl: reader.result,
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        if (!formData.image) {
            alert('Please select an image to upload.');
            return;
        }

        setLoading(true);
        try {
            await slideImageService.create(formData);
            await loadSlides();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving slide image:', error);
            alert('Error saving slide image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this slide image?')) {
            return;
        }

        setLoading(true);
        try {
            await slideImageService.delete(id);
            await loadSlides();
        } catch (error) {
            console.error('Error deleting slide image:', error);
            alert('Error deleting slide image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const hasSlides = slides && slides.length > 0;

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 64px)',
                background: 'linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%)',
                py: 4,
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 4,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{ fontWeight: 700, color: '#1e293b', mb: 0.5 }}
                        >
                            Slide Image Management
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Manage your slide images and homepage banners
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpenDialog}
                        sx={{
                            textTransform: 'none',
                            px: 3,
                            py: 1.5,
                            borderRadius: '12px',
                            backgroundColor: '#FFB5C3',
                            boxShadow: '0 4px 15px rgba(255, 181, 195, 0.6)',
                            '&:hover': {
                                backgroundColor: '#f49fb0',
                                boxShadow: '0 6px 20px rgba(255, 181, 195, 0.8)',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Add Slide Image
                    </Button>
                </Box>

                {loading && !hasSlides ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                        <CircularProgress size={60} sx={{ color: '#FFB5C3' }} />
                    </Box>
                ) : !hasSlides ? (
                    <Card
                        sx={{
                            textAlign: 'center',
                            py: 8,
                            borderRadius: '20px',
                            background: '#ffffff',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        }}
                    >
                        <SlideshowIcon sx={{ fontSize: 80, color: '#cbd5e1', mb: 2 }} />
                        <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                            No slide images yet
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                            Start by adding your first slide image
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleOpenDialog}
                            sx={{
                                textTransform: 'none',
                                borderRadius: '12px',
                                backgroundColor: '#FFB5C3',
                                boxShadow: '0 4px 15px rgba(255, 181, 195, 0.6)',
                                '&:hover': {
                                    backgroundColor: '#f49fb0',
                                    boxShadow: '0 6px 20px rgba(255, 181, 195, 0.8)',
                                },
                            }}
                        >
                            Add Your First Slide Image
                        </Button>
                    </Card>
                ) : (
                    <Grid container spacing={3}>
                        {slides.map((slide) => (
                            <Grid item xs={12} sm={6} md={4} key={slide.id}>
                                <Card
                                    sx={{
                                        borderRadius: '20px',
                                        background: '#ffffff',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="260"
                                        image={slide.imageUrl}
                                        alt="Slide image"
                                        sx={{
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                                        <IconButton
                                            onClick={() => handleDelete(slide.id)}
                                            sx={{
                                                color: '#ef4444',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(239,68,68,0.1)',
                                                },
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}

                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: '20px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        },
                    }}
                >
                    <DialogTitle
                        sx={{
                            background: 'linear-gradient(135deg, #FFB5C3 0%, #ff9aa8 100%)',
                            color: '#ffffff',
                            fontWeight: 600,
                            py: 2.5,
                        }}
                    >
                        Add New Slide Image
                    </DialogTitle>
                    <DialogContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
                            <Box>
                                <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500, color: '#475569' }}>
                                    Select Image
                                </Typography>
                                <Box
                                    sx={{
                                        border: '2px dashed #cbd5e1',
                                        borderRadius: '12px',
                                        p: 4,
                                        textAlign: 'center',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            borderColor: '#FFB5C3',
                                            backgroundColor: 'rgba(255, 181, 195, 0.05)',
                                        },
                                    }}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageFileChange}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Box>
                                {formData.imageUrl && (
                                    <Box sx={{ mt: 2 }}>
                                        <img
                                            src={formData.imageUrl}
                                            alt="Preview"
                                            style={{
                                                width: '100%',
                                                maxHeight: '400px',
                                                objectFit: 'contain',
                                                borderRadius: '12px',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                            }}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, pt: 2 }}>
                        <Button
                            onClick={handleCloseDialog}
                            disabled={loading}
                            sx={{
                                textTransform: 'none',
                                borderRadius: '10px',
                                px: 3,
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            disabled={loading}
                            sx={{
                                textTransform: 'none',
                                borderRadius: '10px',
                                px: 3,
                                background: 'linear-gradient(135deg, #FFB5C3 0%, #ff9aa8 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #f49fb0 0%, #ff8296 100%)',
                                },
                            }}
                        >
                            {loading ? <CircularProgress size={20} color="inherit" /> : 'Add'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
