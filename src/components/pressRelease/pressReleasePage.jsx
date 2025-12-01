'use client';

import React, { useState } from 'react';
import {
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    CircularProgress,
    Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArticleIcon from '@mui/icons-material/Article';
import { pressReleaseService } from '@/services/pressReleaseService';

export default function PressReleasePage() {
    const [pressReleases, setPressReleases] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingPressRelease, setEditingPressRelease] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        publishDate: '',
        image: null,
        imageUrl: '',
    });
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        loadPressReleases();
    }, []);

    const loadPressReleases = async () => {
        setLoading(true);
        try {
            const data = await pressReleaseService.getAll();
            setPressReleases(data);
        } catch (error) {
            console.error('Error loading press releases:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAddDialog = () => {
        setEditingPressRelease(null);
        setFormData({
            title: '',
            publishDate: '',
            image: null,
            imageUrl: '',
        });
        setOpenDialog(true);
    };

    const handleOpenEditDialog = (pressRelease) => {
        setEditingPressRelease(pressRelease);
        setFormData({
            title: pressRelease.title || '',
            publishDate: pressRelease.publishDate
                ? new Date(pressRelease.publishDate).toISOString().slice(0, 10)
                : '',
            image: null,
            imageUrl: pressRelease.imageUrl || '',
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingPressRelease(null);
        setFormData({
            title: '',
            publishDate: '',
            image: null,
            imageUrl: '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    image: file,
                    imageUrl: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.publishDate || (!formData.image && !editingPressRelease)) {
            alert('Please fill in all required fields and select an image');
            return;
        }

        setLoading(true);
        try {
            if (editingPressRelease) {
                await pressReleaseService.update(editingPressRelease.id, formData);
            } else {
                await pressReleaseService.create(formData);
            }
            await loadPressReleases();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving press release:', error);
            alert('Error saving press release. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this press release?')) {
            return;
        }

        setLoading(true);
        try {
            await pressReleaseService.delete(id);
            await loadPressReleases();
        } catch (error) {
            console.error('Error deleting press release:', error);
            alert('Error deleting press release. Please try again.');
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
                            Press Release Management
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Manage your press releases and announcements
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
                            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                            boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #3d9be8 0%, #00d9f2 100%)',
                                boxShadow: '0 6px 20px rgba(79, 172, 254, 0.5)',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Add Press Release
                    </Button>
                </Box>

                {loading && pressReleases.length === 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                        <CircularProgress size={60} sx={{ color: '#4facfe' }} />
                    </Box>
                ) : pressReleases.length === 0 ? (
                    <Card
                        sx={{
                            textAlign: 'center',
                            py: 8,
                            borderRadius: '20px',
                            background: '#ffffff',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        }}
                    >
                        <ArticleIcon sx={{ fontSize: 80, color: '#cbd5e1', mb: 2 }} />
                        <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                            No press releases yet
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                            Start by adding your first press release
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleOpenAddDialog}
                            sx={{
                                textTransform: 'none',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                            }}
                        >
                            Add Your First Press Release
                        </Button>
                    </Card>
                ) : (
                    <Grid container spacing={3}>
                        {pressReleases.map((pressRelease) => (
                            <Grid item xs={12} sm={6} md={4} key={pressRelease.id}>
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
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                                        },
                                    }}
                                >
                                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={pressRelease.imageUrl}
                                            alt={pressRelease.title}
                                            sx={{
                                                objectFit: 'cover',
                                                transition: 'transform 0.5s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.1)',
                                                },
                                            }}
                                        />
                                    </Box>
                                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                        <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1, color: '#1e293b' }}>
                                            {pressRelease.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#475569', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <OpenInNewIcon fontSize="small" sx={{ color: '#4facfe' }} />
                                            {pressRelease.publishDate
                                                ? new Date(pressRelease.publishDate).toLocaleDateString()
                                                : 'No date provided'}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
                                        <Box>
                                            <Chip
                                                label="Press Release"
                                                size="small"
                                                sx={{
                                                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                                    color: '#ffffff',
                                                    fontWeight: 500,
                                                }}
                                            />
                                        </Box>
                                        <Box>
                                            <IconButton
                                                onClick={() => handleOpenEditDialog(pressRelease)}
                                                sx={{
                                                    color: '#4facfe',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(79, 172, 254, 0.1)',
                                                    },
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDelete(pressRelease.id)}
                                                sx={{
                                                    color: '#ef4444',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                                    },
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
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
                            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                            color: '#ffffff',
                            fontWeight: 600,
                            py: 2.5,
                        }}
                    >
                        {editingPressRelease ? 'Edit Press Release' : 'Add New Press Release'}
                    </DialogTitle>
                    <DialogContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
                            <TextField
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                    },
                                }}
                            />
                            <TextField
                                label="Publish Date"
                                name="publishDate"
                                type="date"
                                value={formData.publishDate}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                                helperText="Select the date this press release is published"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                    },
                                }}
                            />
                            <Box>
                                <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500, color: '#475569' }}>
                                    Image
                                </Typography>
                                <Box
                                    sx={{
                                        border: '2px dashed #cbd5e1',
                                        borderRadius: '12px',
                                        p: 3,
                                        textAlign: 'center',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: '#4facfe',
                                            backgroundColor: 'rgba(79, 172, 254, 0.05)',
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
                                                maxHeight: '300px',
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
                                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #3d9be8 0%, #00d9f2 100%)',
                                },
                            }}
                        >
                            {loading ? <CircularProgress size={20} color="inherit" /> : editingPressRelease ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
