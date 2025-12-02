const BASE_URL = 'https://life-line-be.onrender.com/api/gallery';

const handleResponse = async (response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const message = data?.message || 'Unable to process gallery request';
        throw new Error(message);
    }
    return data;
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
        const formData = new FormData();
        if (photoData.photo) {
            formData.append('image', photoData.photo);
        }

        const response = await fetch(BASE_URL, {
            method: 'POST',
            body: formData,
        });
        return handleResponse(response);
    },

    async update(id, photoData) {
        if (!id) {
            throw new Error('Gallery id is required');
        }

        // If a new file is provided, send multipart/form-data; otherwise send JSON with existing URL
        let response;
        if (photoData.photo) {
            const formData = new FormData();
            formData.append('image', photoData.photo);
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
                    image: photoData.photoUrl,
                }),
            });
        }
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