const BASE_URL = 'https://life-line-be.onrender.com/api/gallery';

const handleResponse = async (response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const message = data?.message || 'Unable to process gallery request';
        throw new Error(message);
    }
    return data;
};

const jsonHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

export const galleryService = {
    async getAll() {
        const response = await fetch(BASE_URL, {
            cache: 'no-store',
            headers: { Accept: 'application/json' },
        });
        const data = await handleResponse(response);
        return data?.data ?? [];
    },

    async create(photoData) {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: jsonHeaders,
            body: JSON.stringify(photoData),
        });
        return handleResponse(response);
    },

    async update(id, photoData) {
        if (!id) {
            throw new Error('Gallery id is required');
        }
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: jsonHeaders,
            body: JSON.stringify(photoData),
        });
        return handleResponse(response);
    },

    async delete(id) {
        if (!id) {
            throw new Error('Gallery id is required');
        }
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: { Accept: 'application/json' },
        });
        return handleResponse(response);
    },
};