const BASE_URL = 'https://life-line-be.onrender.com/api/press-release';

const handleResponse = async (response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const message = data?.message || 'Unable to process press release request';
        throw new Error(message);
    }
    return data;
};

// Normalize API response to match component expectations
const normalizePressRelease = (item) => {
    if (!item) return item;
    return {
        ...item,
        id: item._id || item.id,
        imageUrl: item.image || item.imageUrl,
        publishDate: item.date || item.publishDate,
    };
};

const pressReleaseService = {
    // Get all press releases
    async getAll() {
        const response = await fetch(BASE_URL, {
            cache: 'no-store',
            headers: { Accept: 'application/json' },
        });
        const data = await handleResponse(response);
        const items = data?.data ?? [];
        return items.map(normalizePressRelease);
    },

    // Get press release by ID
    async getById(id) {
        if (!id) {
            throw new Error('Press release id is required');
        }
        const response = await fetch(`${BASE_URL}/${id}`, {
            headers: { Accept: 'application/json' },
        });
        const data = await handleResponse(response);
        return normalizePressRelease(data?.data || data);
    },

    // Create new press release
    async create(pressReleaseData) {
        const formData = new FormData();
        formData.append('title', pressReleaseData.title);
        formData.append('date', pressReleaseData.publishDate);
        
        if (pressReleaseData.image) {
            formData.append('image', pressReleaseData.image);
        }

        const response = await fetch(BASE_URL, {
            method: 'POST',
            body: formData,
        });
        const data = await handleResponse(response);
        return normalizePressRelease(data?.data || data);
    },

    // Update press release
    async update(id, pressReleaseData) {
        if (!id) {
            throw new Error('Press release id is required');
        }

        // If a new file is provided, send multipart/form-data; otherwise send JSON
        let response;
        if (pressReleaseData.image) {
            const formData = new FormData();
            formData.append('title', pressReleaseData.title);
            formData.append('date', pressReleaseData.publishDate);
            formData.append('image', pressReleaseData.image);
            
            response = await fetch(`${BASE_URL}/${id}`, {
                method: 'PUT',
                body: formData,
            });
        } else {
            response = await fetch(`${BASE_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    title: pressReleaseData.title,
                    date: pressReleaseData.publishDate,
                    image: pressReleaseData.imageUrl,
                }),
            });
        }
        const data = await handleResponse(response);
        return normalizePressRelease(data?.data || data);
    },

    // Delete press release
    async delete(id) {
        if (!id) {
            throw new Error('Press release id is required');
        }
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: { Accept: 'application/json' },
        });
        return handleResponse(response);
    },
};

export { pressReleaseService };
export default pressReleaseService;
