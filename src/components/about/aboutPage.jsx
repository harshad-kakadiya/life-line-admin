'use client';

import React, { useState } from 'react';
import {
    Container,
    Typography,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    CircularProgress,
    Alert,
    Collapse,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { aboutService } from '@/services/aboutService';

export default function AboutPage() {
    const [aboutEntries, setAboutEntries] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        image: null,
        imageUrl: '',
        designation: '',
        mobile: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState({ type: '', message: '' });

    React.useEffect(() => {
        loadAboutEntries();
    }, []);

    const loadAboutEntries = async () => {
        setLoading(true);
        try {
            const data = await aboutService.getAll();
            setAboutEntries(data);
        } catch (error) {
            console.error('Error loading about entries:', error);
            setFeedback({
                type: 'error',
                message: error.message || 'Failed to fetch about entries',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAddDialog = () => {
        setEditingEntry(null);
        setFormData({
            name: '',
            image: null,
            imageUrl: '',
            designation: '',
            mobile: '',
            email: '',
        });
        setOpenDialog(true);
    };

    const handleOpenEditDialog = (entry) => {
        setEditingEntry(entry);
        setFormData({
            name: entry.name || '',
            image: null,
            imageUrl: entry.image || '',
            designation: entry.designation || '',
            mobile: entry.mobile || '',
            email: entry.email || '',
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingEntry(null);
        setFormData({
            name: '',
            image: null,
            imageUrl: '',
            designation: '',
            mobile: '',
            email: '',
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
        if (!formData.name || !formData.designation || !formData.mobile || !formData.email) {
            setFeedback({
                type: 'error',
                message: 'Please fill in all required fields: Name, Designation, Mobile, and Email',
            });
            return;
        }

        if (!formData.image && !formData.imageUrl && !editingEntry) {
            setFeedback({
                type: 'error',
                message: 'Please select an image',
            });
            return;
        }

        setLoading(true);
        try {
            const aboutData = {
                name: formData.name,
                designation: formData.designation,
                mobile: formData.mobile,
                email: formData.email,
                imageFile: formData.image,
                image: formData.imageUrl,
            };

            if (editingEntry) {
                await aboutService.update(editingEntry.id || editingEntry._id, aboutData);
                setFeedback({ type: 'success', message: 'About entry updated successfully' });
            } else {
                await aboutService.create(aboutData);
                setFeedback({ type: 'success', message: 'About entry added successfully' });
            }
            await loadAboutEntries();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving about entry:', error);
            setFeedback({
                type: 'error',
                message: error.message || 'Error saving about entry. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, e) => {
        e?.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this about entry?')) {
            return;
        }
        setLoading(true);
        try {
            await aboutService.delete(id);
            setFeedback({ type: 'success', message: 'About entry deleted successfully' });
            await loadAboutEntries();
        } catch (error) {
            console.error('Error deleting about entry:', error);
            setFeedback({
                type: 'error',
                message: error.message || 'Error deleting about entry. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    const renderTableContent = () => {
        if (loading && aboutEntries.length === 0) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                    <CircularProgress size={60} sx={{ color: '#10b981' }} />
                </Box>
            );
        }

        if (!aboutEntries.length) {
            return (
                <Box sx={{ textAlign: 'center', py: 10 }}>
                    <PersonIcon sx={{ fontSize: 80, color: '#cbd5e1', mb: 2 }} />
                    <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                        No about entries yet
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                        Start by adding your first about entry
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpenAddDialog}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        }}
                    >
                        Add Your First About Entry
                    </Button>
                </Box>
            );
        }

        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Image</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Designation</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Mobile</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {aboutEntries.map((entry) => (
                            <TableRow 
                                key={entry.id || entry._id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(16, 185, 129, 0.04)',
                                    },
                                }}
                            >
                                <TableCell>
                                    {entry.image ? (
                                        <Avatar
                                            src={entry.image}
                                            alt={entry.name || 'About entry'}
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: '12px',
                                            }}
                                        />
                                    ) : (
                                        <Avatar
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: '12px',
                                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                            }}
                                        >
                                            <PersonIcon />
                                        </Avatar>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                        {entry.name || '—'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ color: '#6366f1', fontWeight: 500 }}>
                                        {entry.designation || '—'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ color: '#475569' }}>
                                        {entry.mobile || '—'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ color: '#475569' }}>
                                        {entry.email || '—'}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                        <Tooltip title="Edit entry">
                                            <IconButton
                                                onClick={() => handleOpenEditDialog(entry)}
                                                sx={{
                                                    color: '#6366f1',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                                    },
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete entry">
                                            <IconButton
                                                onClick={(e) => handleDelete(entry.id || entry._id, e)}
                                                sx={{
                                                    color: '#ef4444',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                                    },
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Box sx={{ minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%)', py: 4 }}>
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between', 
                    alignItems: { xs: 'flex-start', sm: 'center' }, 
                    mb: 4,
                    gap: { xs: 2, sm: 0 }
                }}>
                    <Box>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{ 
                                fontWeight: 700, 
                                color: '#1e293b', 
                                mb: 0.5,
                                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                            }}
                        >
                            About Management
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Manage and organize about page entries
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpenAddDialog}
                        sx={{
                            textTransform: 'none',
                            px: { xs: 2, sm: 2.5, md: 3 },
                            py: { xs: 1, sm: 1.25, md: 1.5 },
                            borderRadius: '12px',
                            fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' },
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.5)',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Add About Entry
                    </Button>
                </Box>

                <Collapse in={Boolean(feedback.message)}>
                    {feedback.message && (
                        <Alert
                            severity={feedback.type || 'info'}
                            onClose={() => setFeedback({ type: '', message: '' })}
                            sx={{ mb: 3, borderRadius: '12px' }}
                        >
                            {feedback.message}
                        </Alert>
                    )}
                </Collapse>

                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        overflow: 'hidden',
                        background: '#ffffff',
                    }}
                >
                    {renderTableContent()}
                </Paper>
            </Container>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: { xs: '16px', sm: '20px' },
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        m: { xs: 2, sm: 3 },
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: '#ffffff',
                        fontWeight: 600,
                        py: 2.5,
                    }}
                >
                    {editingEntry ? 'Edit About Entry' : 'Add New About Entry'}
                </DialogTitle>
                <DialogContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            variant="outlined"
                            helperText="Enter the name for this entry"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                },
                            }}
                        />
                        <TextField
                            label="Designation"
                            name="designation"
                            value={formData.designation}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            variant="outlined"
                            helperText="Enter the designation/title for this entry"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                },
                            }}
                        />
                        <TextField
                            label="Mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            variant="outlined"
                            helperText="Enter the mobile number"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                },
                            }}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            variant="outlined"
                            placeholder="example@email.com"
                            helperText="Enter the email address"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                },
                            }}
                        />
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500, color: '#475569' }}>
                                {editingEntry ? 'Update Image (optional)' : 'Select Image *'}
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
                                        borderColor: '#10b981',
                                        backgroundColor: 'rgba(16, 185, 129, 0.05)',
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
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                            },
                        }}
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : editingEntry ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
