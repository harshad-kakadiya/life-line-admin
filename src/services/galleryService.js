// Gallery Service - API layer for gallery operations
// When API is available, replace the mock implementation with actual API calls

let mockPhotos = [];
let nextId = 1;

export const galleryService = {
    // Get all photos
    async getAll() {
        // TODO: Replace with actual API call
        // Example: const response = await fetch('/api/gallery');
        // return await response.json();
        
        return mockPhotos;
    },

    // Get photo by ID
    async getById(id) {
        // TODO: Replace with actual API call
        // Example: const response = await fetch(`/api/gallery/${id}`);
        // return await response.json();
        
        return mockPhotos.find(photo => photo.id === id);
    },

    // Create new photo
    async create(photoData) {
        // TODO: Replace with actual API call
        // Example:
        // const formData = new FormData();
        // formData.append('photo', photoData.photo);
        // const response = await fetch('/api/gallery', {
        //     method: 'POST',
        //     body: formData,
        // });
        // return await response.json();
        
        const newPhoto = {
            id: nextId++,
            photoUrl: photoData.photoUrl,
            createdAt: new Date().toISOString(),
        };
        mockPhotos.push(newPhoto);
        return newPhoto;
    },

    // Update photo
    async update(id, photoData) {
        // TODO: Replace with actual API call
        // Example:
        // const formData = new FormData();
        // if (photoData.photo) {
        //     formData.append('photo', photoData.photo);
        // }
        // const response = await fetch(`/api/gallery/${id}`, {
        //     method: 'PUT',
        //     body: formData,
        // });
        // return await response.json();
        
        const index = mockPhotos.findIndex(photo => photo.id === id);
        if (index !== -1) {
            mockPhotos[index] = {
                ...mockPhotos[index],
                photoUrl: photoData.photoUrl || mockPhotos[index].photoUrl,
                updatedAt: new Date().toISOString(),
            };
            return mockPhotos[index];
        }
        throw new Error('Photo not found');
    },

    // Delete photo
    async delete(id) {
        // TODO: Replace with actual API call
        // Example: await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
        
        const index = mockPhotos.findIndex(photo => photo.id === id);
        if (index !== -1) {
            mockPhotos.splice(index, 1);
            return true;
        }
        throw new Error('Photo not found');
    },
};

