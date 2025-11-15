'use client';

import React, { useState } from 'react';
import {
    Container,
    Typography,
    Button,
    Grid,
    Card,
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
import AddIcon from '@mui/icons-material/Add';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { videoService } from '@/services/videoService';

export default function VideoPage() {
    const [videos, setVideos] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingVideo, setEditingVideo] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        video: null,
        videoUrl: '',
    });
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        loadVideos();
    }, []);

    const loadVideos = async () => {
        setLoading(true);
        try {
            const data = await videoService.getAll();
            setVideos(data);
        } catch (error) {
            console.error('Error loading videos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAddDialog = () => {
        setEditingVideo(null);
        setFormData({
            title: '',
            description: '',
            video: null,
            videoUrl: '',
        });
        setOpenDialog(true);
    };

    const handleOpenEditDialog = (video) => {
        setEditingVideo(video);
        setFormData({
            title: video.title || '',
            description: video.description || '',
            video: null,
            videoUrl: video.videoUrl || '',
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingVideo(null);
        setFormData({
            title: '',
            description: '',
            video: null,
            videoUrl: '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleVideoFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                video: file,
                videoUrl: URL.createObjectURL(file),
            }));
        }
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.description) {
            alert('Please fill in all required fields');
            return;
        }

        setLoading(true);
        try {
            if (editingVideo) {
                await videoService.update(editingVideo.id, formData);
            } else {
                await videoService.create(formData);
            }
            await loadVideos();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving video:', error);
            alert('Error saving video. Please try again.');
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
                            Video Management
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Manage and organize your video content
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
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.5)',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Add Video
                    </Button>
                </Box>

                {loading && videos.length === 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                        <CircularProgress size={60} sx={{ color: '#6366f1' }} />
                    </Box>
                ) : videos.length === 0 ? (
                    <Card
                        sx={{
                            textAlign: 'center',
                            py: 8,
                            borderRadius: '20px',
                            background: '#ffffff',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        }}
                    >
                        <PlayCircleOutlineIcon sx={{ fontSize: 80, color: '#cbd5e1', mb: 2 }} />
                        <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                            No videos yet
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                            Get started by adding your first video
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleOpenAddDialog}
                            sx={{
                                textTransform: 'none',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            }}
                        >
                            Add Your First Video
                        </Button>
                    </Card>
                ) : (
                    <Grid container spacing={3}>
                        {videos.map((video) => (
                            <Grid item xs={12} md={6} lg={4} key={video.id}>
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
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            width: '100%',
                                            height: '200px',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {video.videoUrl ? (
                                            <video
                                                src={video.videoUrl}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                                muted
                                            />
                                        ) : (
                                            <PlayCircleOutlineIcon sx={{ fontSize: 60, color: 'rgba(255,255,255,0.8)' }} />
                                        )}
                                    </Box>
                                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                        <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1, color: '#1e293b' }}>
                                            {video.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            sx={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                lineHeight: 1.6,
                                            }}
                                        >
                                            {video.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ p: 2, pt: 0 }}>
                                        <IconButton
                                            onClick={() => handleOpenEditDialog(video)}
                                            sx={{
                                                color: '#6366f1',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                                },
                                            }}
                                        >
                                            <EditIcon />
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
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: '#ffffff',
                            fontWeight: 600,
                            py: 2.5,
                        }}
                    >
                        {editingVideo ? 'Edit Video' : 'Add New Video'}
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
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                multiline
                                rows={4}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                    },
                                }}
                            />
                            <Box>
                                <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500, color: '#475569' }}>
                                    Video File
                                </Typography>
                                <Box
                                    sx={{
                                        border: '2px dashed #cbd5e1',
                                        borderRadius: '12px',
                                        p: 3,
                                        textAlign: 'center',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: '#6366f1',
                                            backgroundColor: 'rgba(99, 102, 241, 0.05)',
                                        },
                                    }}
                                >
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={handleVideoFileChange}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Box>
                                {formData.videoUrl && (
                                    <Box sx={{ mt: 2 }}>
                                        <video
                                            src={formData.videoUrl}
                                            width="100%"
                                            height="200"
                                            controls
                                            style={{ borderRadius: '12px', marginTop: '8px' }}
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
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                                },
                            }}
                        >
                            {loading ? <CircularProgress size={20} color="inherit" /> : editingVideo ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
