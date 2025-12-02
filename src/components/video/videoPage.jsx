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
    Modal,
    Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import CloseIcon from '@mui/icons-material/Close';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { videoService } from '@/services/videoService';

export default function VideoPage() {
    const [videos, setVideos] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openVideoModal, setOpenVideoModal] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [editingVideo, setEditingVideo] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        videoUrl: '',
        image: null,
        imageUrl: '',
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
            videoUrl: '',
            image: null,
            imageUrl: '',
        });
        setOpenDialog(true);
    };

    const handleOpenVideoModal = (video) => {
        setSelectedVideo(video);
        setOpenVideoModal(true);
    };

    const handleCloseVideoModal = () => {
        setOpenVideoModal(false);
        setSelectedVideo(null);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingVideo(null);
        setFormData({
            title: '',
            description: '',
            videoUrl: '',
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
        if (!formData.title || !formData.description || !formData.videoUrl) {
            alert('Please fill in all required fields, including the video link');
            return;
        }

        setLoading(true);
        try {
            await videoService.create(formData);
            await loadVideos();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving video:', error);
            alert('Error saving video. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, e) => {
        e?.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this video?')) {
            return;
        }
        setLoading(true);
        try {
            await videoService.delete(id);
            await loadVideos();
        } catch (error) {
            console.error('Error deleting video:', error);
            alert('Error deleting video. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', py: 4 }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
                    <Box>
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{
                                fontWeight: 800,
                                color: '#ffffff',
                                mb: 1,
                                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                            }}
                        >
                            Video Library
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>
                            {videos.length} {videos.length === 1 ? 'video' : 'videos'} in your collection
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpenAddDialog}
                        sx={{
                            textTransform: 'none',
                            px: 4,
                            py: 1.5,
                            borderRadius: '16px',
                            background: '#ffffff',
                            color: '#667eea',
                            fontWeight: 600,
                            fontSize: '1rem',
                            boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                            '&:hover': {
                                background: '#f8f9fa',
                                boxShadow: '0 12px 35px rgba(0,0,0,0.3)',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Add New Video
                    </Button>
                </Box>

                {loading && videos.length === 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                        <CircularProgress size={80} sx={{ color: '#ffffff' }} />
                    </Box>
                ) : videos.length === 0 ? (
                    <Card
                        sx={{
                            textAlign: 'center',
                            py: 10,
                            px: 4,
                            borderRadius: '24px',
                            background: '#ffffff',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                        }}
                    >
                        <VideoLibraryIcon sx={{ fontSize: 100, color: '#cbd5e1', mb: 3 }} />
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: '#1e293b' }}>
                            No videos yet
                        </Typography>
                        <Typography variant="body1" color="textSecondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
                            Start building your video library by adding your first video
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleOpenAddDialog}
                            sx={{
                                textTransform: 'none',
                                borderRadius: '16px',
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                                '&:hover': {
                                    boxShadow: '0 12px 35px rgba(102, 126, 234, 0.5)',
                                },
                            }}
                        >
                            Add Your First Video
                        </Button>
                    </Card>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {videos.map((video, index) => (
                            <Card
                                key={video.id ?? video._id ?? index}
                                onClick={() => handleOpenVideoModal(video)}
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: 'row' },
                                    borderRadius: '20px',
                                    background: '#ffffff',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    '&:hover': {
                                        transform: 'translateX(8px)',
                                        boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
                                        '& .play-overlay': {
                                            opacity: 1,
                                        },
                                        '& .video-thumbnail': {
                                            transform: 'scale(1.05)',
                                        },
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: { xs: '100%', md: '400px' },
                                        minWidth: { md: '400px' },
                                        height: { xs: '250px', md: '200px' },
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {video.image || video.videoUrl ? (
                                        <>
                                            {video.image ? (
                                                <Box
                                                    component="img"
                                                    src={video.image}
                                                    alt={video.title}
                                                    className="video-thumbnail"
                                                    sx={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        transition: 'transform 0.5s ease',
                                                    }}
                                                />
                                            ) : (
                                                <video
                                                    className="video-thumbnail"
                                                    src={video.videoUrl}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        transition: 'transform 0.5s ease',
                                                    }}
                                                    muted
                                                    loop
                                                    playsInline
                                                />
                                            )}
                                            <Box
                                                className="play-overlay"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    background: 'linear-gradient(to right, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        background: 'rgba(255,255,255,0.2)',
                                                        backdropFilter: 'blur(10px)',
                                                        borderRadius: '50%',
                                                        p: 2,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <PlayCircleFilledIcon
                                                        sx={{
                                                            fontSize: 60,
                                                            color: '#ffffff',
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        </>
                                    ) : (
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <VideoLibraryIcon sx={{ fontSize: 60, color: 'rgba(255,255,255,0.7)' }} />
                                        </Box>
                                    )}
                                    <Chip
                                        label="Video"
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            left: 12,
                                            background: 'rgba(255,255,255,0.95)',
                                            backdropFilter: 'blur(10px)',
                                            fontWeight: 700,
                                            fontSize: '0.75rem',
                                        }}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography
                                            variant="h5"
                                            component="h2"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 1.5,
                                                color: '#1e293b',
                                                fontSize: '1.5rem',
                                            }}
                                        >
                                            {video.title}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                            sx={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: { xs: 3, md: 2 },
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                lineHeight: 1.7,
                                                fontSize: '1rem',
                                                mb: 2,
                                            }}
                                        >
                                            {video.description}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            pt: 2,
                                            borderTop: '1px solid #e2e8f0',
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PlayCircleFilledIcon sx={{ fontSize: 20, color: '#667eea' }} />
                                            <Typography variant="body2" sx={{ color: '#667eea', fontWeight: 600 }}>
                                                Click to play
                                            </Typography>
                                        </Box>
                                        <IconButton
                                            onClick={(e) => handleDelete(video.id ?? video._id, e)}
                                            sx={{
                                                color: '#ef4444',
                                                background: 'rgba(248,113,113,0.1)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(248,113,113,0.2)',
                                                    transform: 'scale(1.05)',
                                                },
                                                transition: 'all 0.2s ease',
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Card>
                        ))}
                    </Box>
                )}

                {/* Video Player Modal */}
                <Modal
                    open={openVideoModal}
                    onClose={handleCloseVideoModal}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2,
                    }}
                >
                    <Paper
                        sx={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '900px',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            background: '#000000',
                            boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
                        }}
                    >
                        <IconButton
                            onClick={handleCloseVideoModal}
                            sx={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                zIndex: 10,
                                background: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)',
                                color: '#ffffff',
                                '&:hover': {
                                    background: 'rgba(255,255,255,0.3)',
                                },
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        {selectedVideo && (
                            <Box>
                                <video
                                    src={selectedVideo.videoUrl}
                                    controls
                                    autoPlay
                                    style={{
                                        width: '100%',
                                        maxHeight: '80vh',
                                        display: 'block',
                                    }}
                                />
                                <Box sx={{ p: 3, background: '#ffffff' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>
                                        {selectedVideo.title}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        {selectedVideo.description}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Paper>
                </Modal>

                {/* Add/Edit Dialog */}
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: '24px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        },
                    }}
                >
                    <DialogTitle
                        sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: '#ffffff',
                            fontWeight: 700,
                            py: 3,
                            fontSize: '1.5rem',
                        }}
                    >
                        {editingVideo ? 'Edit Video' : 'Add New Video'}
                    </DialogTitle>
                    <DialogContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, pt: 2 }}>
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
                            <TextField
                                label="Video Link"
                                name="videoUrl"
                                value={formData.videoUrl}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                variant="outlined"
                                placeholder="https://example.com/video.mp4"
                                helperText="Paste a direct video URL or streaming link"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                    },
                                }}
                            />
                            <Box>
                                <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500, color: '#475569' }}>
                                    Image (Thumbnail)
                                </Typography>
                                <Box
                                    sx={{
                                        border: '2px dashed #cbd5e1',
                                        borderRadius: '12px',
                                        p: 3,
                                        textAlign: 'center',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: '#667eea',
                                            backgroundColor: 'rgba(102, 126, 234, 0.05)',
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
                            {formData.videoUrl && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#475569' }}>
                                        Video Preview
                                    </Typography>
                                    <video
                                        src={formData.videoUrl}
                                        width="100%"
                                        height="250"
                                        controls
                                        style={{
                                            borderRadius: '16px',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 4, pt: 2 }}>
                        <Button
                            onClick={handleCloseDialog}
                            disabled={loading}
                            sx={{
                                textTransform: 'none',
                                borderRadius: '12px',
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
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
                                borderRadius: '12px',
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.5)',
                                },
                            }}
                        >
                            {loading ? <CircularProgress size={20} color="inherit" /> : editingVideo ? 'Update Video' : 'Add Video'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
