'use client';

import React, { useState } from 'react';
import {
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardMedia,
    CardActions,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    CircularProgress,
    Fade,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { galleryService } from '@/services/galleryService';

export default function GalleryPage() {
    const [photos, setPhotos] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingPhoto, setEditingPhoto] = useState(null);
    const [formData, setFormData] = useState({
        photo: null,
        photoUrl: '',
    });
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        loadPhotos();
    }, []);

    const loadPhotos = async () => {
        setLoading(true);
        try {
            const data = await galleryService.getAll();
            setPhotos(data);
        } catch (error) {
            console.error('Error loading photos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAddDialog = () => {
        setEditingPhoto(null);
        setFormData({
            photo: null,
            photoUrl: '',
        });
        setOpenDialog(true);
    };

    const handleOpenEditDialog = (photo) => {
        setEditingPhoto(photo);
        setFormData({
            photo: null,
            photoUrl: photo.photoUrl || '',
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingPhoto(null);
        setFormData({
            photo: null,
            photoUrl: '',
        });
    };

    const handlePhotoFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    photo: file,
                    photoUrl: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!formData.photo && !editingPhoto) {
            alert('Please select a photo');
            return;
        }

        setLoading(true);
        try {
            if (editingPhoto) {
                await galleryService.update(editingPhoto.id, formData);
            } else {
                await galleryService.create(formData);
            }
            await loadPhotos();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving photo:', error);
            alert('Error saving photo. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this photo?')) {
            return;
        }

        setLoading(true);
        try {
            await galleryService.delete(id);
            await loadPhotos();
        } catch (error) {
            console.error('Error deleting photo:', error);
            alert('Error deleting photo. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%)', py: 4 }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: '#1e293b', mb: 0.5 }}>
                            Gallery Management
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Showcase your photo collection
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpenAddDialog}
                        sx={{
                            textTransform: 'none',
                            px: 3,
                            py: 1.5,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #e081f0 0%, #e4465a 100%)',
                                boxShadow: '0 6px 20px rgba(245, 87, 108, 0.5)',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Add Photo
                    </Button>
                </Box>

                {loading && photos.length === 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                        <CircularProgress size={60} sx={{ color: '#f5576c' }} />
                    </Box>
                ) : photos.length === 0 ? (
                    <Card
                        sx={{
                            textAlign: 'center',
                            py: 8,
                            borderRadius: '20px',
                            background: '#ffffff',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        }}
                    >
                        <PhotoCameraIcon sx={{ fontSize: 80, color: '#cbd5e1', mb: 2 }} />
                        <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                            No photos yet
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                            Start building your gallery by adding your first photo
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleOpenAddDialog}
                            sx={{
                                textTransform: 'none',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            }}
                        >
                            Add Your First Photo
                        </Button>
                    </Card>
                ) : (
                    <Grid container spacing={3}>
                        {photos.map((photo, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
                                <Fade in timeout={300 + index * 100}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: '20px',
                                            background: '#ffffff',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            '&:hover': {
                                                transform: 'translateY(-8px) scale(1.02)',
                                                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                                                '& .photo-overlay': {
                                                    opacity: 1,
                                                },
                                            },
                                        }}
                                    >
                                        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                                            <CardMedia
                                                component="img"
                                                height="300"
                                                image={photo.photoUrl}
                                                alt="Gallery image"
                                                sx={{
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.5s ease',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                    },
                                                }}
                                            />
                                            <Box
                                                className="photo-overlay"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease',
                                                    display: 'flex',
                                                    alignItems: 'flex-end',
                                                    justifyContent: 'center',
                                                    pb: 2,
                                                }}
                                            >
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <IconButton
                                                        onClick={() => handleOpenEditDialog(photo)}
                                                        sx={{
                                                            color: '#ffffff',
                                                            background: 'rgba(255,255,255,0.2)',
                                                            backdropFilter: 'blur(10px)',
                                                            '&:hover': {
                                                                background: 'rgba(255,255,255,0.3)',
                                                            },
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleDelete(photo.id)}
                                                        sx={{
                                                            color: '#ffffff',
                                                            background: 'rgba(255,255,255,0.2)',
                                                            backdropFilter: 'blur(10px)',
                                                            '&:hover': {
                                                                background: 'rgba(239, 68, 68, 0.8)',
                                                            },
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <CardActions
                                            sx={{
                                                justifyContent: 'center',
                                                p: 2,
                                                display: { xs: 'flex', sm: 'none' },
                                            }}
                                        >
                                            <IconButton
                                                onClick={() => handleOpenEditDialog(photo)}
                                                sx={{
                                                    color: '#f5576c',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(245, 87, 108, 0.1)',
                                                    },
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDelete(photo.id)}
                                                sx={{
                                                    color: '#ef4444',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                                    },
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Fade>
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
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            color: '#ffffff',
                            fontWeight: 600,
                            py: 2.5,
                        }}
                    >
                        {editingPhoto ? 'Edit Photo' : 'Add New Photo'}
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
                                            borderColor: '#f5576c',
                                            backgroundColor: 'rgba(245, 87, 108, 0.05)',
                                        },
                                    }}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoFileChange}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Box>
                                {formData.photoUrl && (
                                    <Box sx={{ mt: 2 }}>
                                        <img
                                            src={formData.photoUrl}
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
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #e081f0 0%, #e4465a 100%)',
                                },
                            }}
                        >
                            {loading ? <CircularProgress size={20} color="inherit" /> : editingPhoto ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
