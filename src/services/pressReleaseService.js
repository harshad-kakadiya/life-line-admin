// Press Release Service - API layer for press release operations
// When API is available, replace the mock implementation with actual API calls

let mockPressReleases = [];
let nextId = 1;

const pressReleaseService = {
    // Get all press releases
    async getAll() {
        // TODO: Replace with actual API call
        // Example: const response = await fetch('/api/press-release');
        // return await response.json();
        
        return mockPressReleases;
    },

    // Get press release by ID
    async getById(id) {
        // TODO: Replace with actual API call
        // Example: const response = await fetch(`/api/press-release/${id}`);
        // return await response.json();
        
        return mockPressReleases.find(pressRelease => pressRelease.id === id);
    },

    // Create new press release
    async create(pressReleaseData) {
        // TODO: Replace with actual API call
        // Example:
        // const formData = new FormData();
        // formData.append('title', pressReleaseData.title);
        // formData.append('link', pressReleaseData.link);
        // formData.append('image', pressReleaseData.image);
        // const response = await fetch('/api/press-release', {
        //     method: 'POST',
        //     body: formData,
        // });
        // return await response.json();
        
        const newPressRelease = {
            id: nextId++,
            title: pressReleaseData.title,
            publishDate: pressReleaseData.publishDate,
            imageUrl: pressReleaseData.imageUrl,
            createdAt: new Date().toISOString(),
        };
        mockPressReleases.push(newPressRelease);
        return newPressRelease;
    },

    // Update press release
    async update(id, pressReleaseData) {
        // TODO: Replace with actual API call
        // Example:
        // const formData = new FormData();
        // formData.append('title', pressReleaseData.title);
        // formData.append('link', pressReleaseData.link);
        // if (pressReleaseData.image) {
        //     formData.append('image', pressReleaseData.image);
        // }
        // const response = await fetch(`/api/press-release/${id}`, {
        //     method: 'PUT',
        //     body: formData,
        // });
        // return await response.json();
        
        const index = mockPressReleases.findIndex(pressRelease => pressRelease.id === id);
        if (index !== -1) {
            mockPressReleases[index] = {
                ...mockPressReleases[index],
                title: pressReleaseData.title,
                publishDate: pressReleaseData.publishDate,
                imageUrl: pressReleaseData.imageUrl || mockPressReleases[index].imageUrl,
                updatedAt: new Date().toISOString(),
            };
            return mockPressReleases[index];
        }
        throw new Error('Press release not found');
    },

    // Delete press release
    async delete(id) {
        // TODO: Replace with actual API call
        // Example: await fetch(`/api/press-release/${id}`, { method: 'DELETE' });
        
        const index = mockPressReleases.findIndex(pressRelease => pressRelease.id === id);
        if (index !== -1) {
            mockPressReleases.splice(index, 1);
            return true;
        }
        throw new Error('Press release not found');
    },
};

export { pressReleaseService };
export default pressReleaseService;
