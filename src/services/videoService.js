const BASE_URL = 'https://life-line-be.onrender.com/api/videos';

const handleResponse = async (response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const message = data?.message || 'Unable to process video request';
        throw new Error(message);
    }
    return data;
};

// Normalize API response to match component expectations
const normalizeVideo = (item) => {
    if (!item) return item;
    return {
        ...item,
        id: item._id || item.id,
        videoUrl: item.videourl || item.video || item.videoUrl || item.url,
        description: item.subtitle || item.description,
        image: item.image,
    };
};

export const videoService = {
    // Get all videos
    async getAll() {
        const response = await fetch(BASE_URL, {
            cache: 'no-store',
            headers: { Accept: 'application/json' },
        });
        const data = await handleResponse(response);
        // Handle both array response and wrapped response
        const items = Array.isArray(data) ? data : (data?.data ?? []);
        return items.map(normalizeVideo);
    },

    // Get video by ID
    async getById(id) {
        if (!id) {
            throw new Error('Video id is required');
        }
        const response = await fetch(`${BASE_URL}/${id}`, {
            headers: { Accept: 'application/json' },
        });
        const data = await handleResponse(response);
        return normalizeVideo(data?.data || data);
    },

    // Create new video
    async create(videoData) {
        // Check if image file is provided for upload
        let response;
        if (videoData.image && videoData.image instanceof File) {
            // If image file is provided, use FormData
            const formData = new FormData();
            formData.append('title', videoData.title);
            formData.append('subtitle', videoData.description || videoData.subtitle || '');
            formData.append('videourl', videoData.videoUrl || '');
            formData.append('image', videoData.image);
            
            response = await fetch(BASE_URL, {
                method: 'POST',
                body: formData,
            });
        } else {
            // Otherwise, send JSON
            response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    title: videoData.title,
                    subtitle: videoData.description || videoData.subtitle || '',
                    videourl: videoData.videoUrl || '',
                    image: videoData.image || '',
                }),
            });
        }
        const data = await handleResponse(response);
        return normalizeVideo(data?.data || data);
    },

    // Update video
    async update(id, videoData) {
        if (!id) {
            throw new Error('Video id is required');
        }

        // Check if image file is provided for upload
        let response;
        if (videoData.image && videoData.image instanceof File) {
            // If image file is provided, use FormData
            const formData = new FormData();
            formData.append('title', videoData.title);
            formData.append('subtitle', videoData.description || videoData.subtitle || '');
            formData.append('videourl', videoData.videoUrl || '');
            formData.append('image', videoData.image);
            
            response = await fetch(`${BASE_URL}/${id}`, {
                method: 'PUT',
                body: formData,
            });
        } else {
            // Otherwise, send JSON
            response = await fetch(`${BASE_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    title: videoData.title,
                    subtitle: videoData.description || videoData.subtitle || '',
                    videourl: videoData.videoUrl || '',
                    image: videoData.image || videoData.imageUrl || '',
                }),
            });
        }
        const data = await handleResponse(response);
        return normalizeVideo(data?.data || data);
    },

    // Delete video
    async delete(id) {
        if (!id) {
            throw new Error('Video id is required');
        }
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: { Accept: 'application/json' },
        });
        return handleResponse(response);
    },
};


