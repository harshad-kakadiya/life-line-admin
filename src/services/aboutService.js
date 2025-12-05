const BASE_URL = 'https://life-line-be.onrender.com/api/about';

const handleResponse = async (response) => {
    if (!response.ok) {
        // Try to get error message from response
        let errorMessage = 'Unable to process about request';
        try {
            const data = await response.json();
            errorMessage = data?.message || errorMessage;
        } catch (e) {
            // If response is not JSON, use status text
            errorMessage = response.statusText || `HTTP ${response.status} Error`;
        }
        
        // Provide more specific error messages
        if (response.status === 404) {
            errorMessage = 'API endpoint not found. Please check if the backend endpoint is configured correctly.';
        } else if (response.status === 500) {
            errorMessage = 'Server error. Please try again later.';
        }
        
        throw new Error(errorMessage);
    }
    const data = await response.json().catch(() => ({}));
    return data;
};

// Normalize API response to match component expectations
const normalizeAbout = (item) => {
    if (!item) return item;
    return {
        ...item,
        id: item._id || item.id,
        name: item.name || '',
        image: item.image || '',
        designation: item.designation || '',
        mobile: item.mobile || '',
        email: item.email || '',
    };
};

export const aboutService = {
    // Get all about entries
    async getAll() {
        const response = await fetch(BASE_URL, {
            cache: 'no-store',
            headers: { Accept: 'application/json' },
        });
        const data = await handleResponse(response);
        // Handle both array response and wrapped response
        const items = Array.isArray(data) ? data : (data?.data ?? []);
        return items.map(normalizeAbout);
    },

    // Get about entry by ID
    async getById(id) {
        if (!id) {
            throw new Error('About id is required');
        }
        const response = await fetch(`${BASE_URL}/${id}`, {
            headers: { Accept: 'application/json' },
        });
        const data = await handleResponse(response);
        return normalizeAbout(data?.data || data);
    },

    // Create new about entry
    async create(aboutData) {
        // If a new file is provided, send multipart/form-data; otherwise send JSON
        let response;
        if (aboutData.imageFile) {
            const formData = new FormData();
            formData.append('image', aboutData.imageFile);
            formData.append('name', aboutData.name || '');
            formData.append('designation', aboutData.designation || '');
            formData.append('mobile', aboutData.mobile || '');
            formData.append('email', aboutData.email || '');
            
            response = await fetch(BASE_URL, {
                method: 'POST',
                body: formData,
            });
        } else {
            response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name: aboutData.name || '',
                    image: aboutData.image || '',
                    designation: aboutData.designation || '',
                    mobile: aboutData.mobile || '',
                    email: aboutData.email || '',
                }),
            });
        }
        const data = await handleResponse(response);
        return normalizeAbout(data?.data || data);
    },

    // Update about entry
    async update(id, aboutData) {
        if (!id) {
            throw new Error('About id is required');
        }

        // If a new file is provided, send multipart/form-data; otherwise send JSON with existing URL
        let response;
        if (aboutData.imageFile) {
            const formData = new FormData();
            formData.append('image', aboutData.imageFile);
            formData.append('name', aboutData.name || '');
            formData.append('designation', aboutData.designation || '');
            formData.append('mobile', aboutData.mobile || '');
            formData.append('email', aboutData.email || '');
            
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
                    name: aboutData.name || '',
                    image: aboutData.image || aboutData.imageUrl || '',
                    designation: aboutData.designation || '',
                    mobile: aboutData.mobile || '',
                    email: aboutData.email || '',
                }),
            });
        }
        const data = await handleResponse(response);
        return normalizeAbout(data?.data || data);
    },

    // Delete about entry
    async delete(id) {
        if (!id) {
            throw new Error('About id is required');
        }
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: { Accept: 'application/json' },
        });
        return handleResponse(response);
    },
};
