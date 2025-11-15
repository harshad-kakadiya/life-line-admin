// Video Service - API layer for video operations
// When API is available, replace the mock implementation with actual API calls

let mockVideos = [];
let nextId = 1;

export const videoService = {
    // Get all videos
    async getAll() {
        // TODO: Replace with actual API call
        // Example: const response = await fetch('/api/videos');
        // return await response.json();
        
        return mockVideos;
    },

    // Get video by ID
    async getById(id) {
        // TODO: Replace with actual API call
        // Example: const response = await fetch(`/api/videos/${id}`);
        // return await response.json();
        
        return mockVideos.find(video => video.id === id);
    },

    // Create new video
    async create(videoData) {
        // TODO: Replace with actual API call
        // Example:
        // const formData = new FormData();
        // formData.append('title', videoData.title);
        // formData.append('description', videoData.description);
        // formData.append('video', videoData.video);
        // const response = await fetch('/api/videos', {
        //     method: 'POST',
        //     body: formData,
        // });
        // return await response.json();
        
        const newVideo = {
            id: nextId++,
            title: videoData.title,
            description: videoData.description,
            videoUrl: videoData.videoUrl,
            createdAt: new Date().toISOString(),
        };
        mockVideos.push(newVideo);
        return newVideo;
    },

    // Update video
    async update(id, videoData) {
        // TODO: Replace with actual API call
        // Example:
        // const formData = new FormData();
        // formData.append('title', videoData.title);
        // formData.append('description', videoData.description);
        // if (videoData.video) {
        //     formData.append('video', videoData.video);
        // }
        // const response = await fetch(`/api/videos/${id}`, {
        //     method: 'PUT',
        //     body: formData,
        // });
        // return await response.json();
        
        const index = mockVideos.findIndex(video => video.id === id);
        if (index !== -1) {
            mockVideos[index] = {
                ...mockVideos[index],
                title: videoData.title,
                description: videoData.description,
                videoUrl: videoData.videoUrl || mockVideos[index].videoUrl,
                updatedAt: new Date().toISOString(),
            };
            return mockVideos[index];
        }
        throw new Error('Video not found');
    },

    // Delete video
    async delete(id) {
        // TODO: Replace with actual API call
        // Example: await fetch(`/api/videos/${id}`, { method: 'DELETE' });
        
        const index = mockVideos.findIndex(video => video.id === id);
        if (index !== -1) {
            mockVideos.splice(index, 1);
            return true;
        }
        throw new Error('Video not found');
    },
};

