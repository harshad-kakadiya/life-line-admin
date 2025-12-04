const BASE_URL = 'https://life-line-be.onrender.com/api/contact';

const handleResponse = async (response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const message = data?.message || 'Unable to process contact request';
        throw new Error(message);
    }
    return data;
};

export const contactService = {
    async getAll() {
        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            cache: 'no-store',
        });
        const data = await handleResponse(response);
        return data?.data ?? [];
    },

    async create(contactData) {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(contactData),
        });
        return handleResponse(response);
    },

    async delete(id) {
        if (!id) {
            throw new Error('Contact id is required');
        }
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        });
        return handleResponse(response);
    },
};




