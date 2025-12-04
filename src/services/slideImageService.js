const BASE_URL = 'https://life-line-be.onrender.com/api/slider';

// NOTE: If your backend uses a different endpoint for slide images,
// update BASE_URL accordingly.

const handleResponse = async (response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const message = data?.message || 'Unable to process slide image request';
        throw new Error(message);
    }
    return data;
};

export const slideImageService = {
    async getAll() {
        const response = await fetch(BASE_URL, {
            cache: 'no-store',
            headers: { Accept: 'application/json' },
        });
        const data = await handleResponse(response);
        const items = data?.data ?? data ?? [];
        return (items || []).map((item, index) => ({
            ...item,
            id: item._id ?? item.id ?? index,
            imageUrl: item.imageUrl ?? item.image ?? '',
        }));
    },

    async create(slideData) {
        const formData = new FormData();
        if (slideData.image) {
            formData.append('image', slideData.image);
        }

        const response = await fetch(BASE_URL, {
            method: 'POST',
            body: formData,
        });
        return handleResponse(response);
    },

    async delete(id) {
        if (!id) {
            throw new Error('Slide image id is required');
        }
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: { Accept: 'application/json' },
        });
        return handleResponse(response);
    },
};


