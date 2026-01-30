// API configuration for connecting to the backend
// Replace this URL with your Render deployment URL when ready

const API_BASE_URL = process.env.GATSBY_API_URL || 'http://localhost:5000/api';

// Helper function for API requests
async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            credentials: 'include',
        });

        const data = await response.json();
        return data;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Auth API
export const authApi = {
    login: (email: string, password: string) =>
        apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }),
    logout: () => apiRequest('/auth/logout', { method: 'POST' }),
    getProfile: () => apiRequest('/auth/me'),
    verify: () => apiRequest('/auth/verify'),
    refreshToken: () => apiRequest('/auth/refresh', { method: 'POST' }),
};

// Appointment API
export const appointmentApi = {
    create: (data: {
        name: string;
        email: string;
        phone: string;
        note?: string;
        preferredDate: string;
        preferredTime: string;
    }) =>
        apiRequest('/appointments', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
    getAll: (status?: string) =>
        apiRequest(`/appointments${status ? `?status=${status}` : ''}`),
    getById: (id: string) => apiRequest(`/appointments/${id}`),
    accept: (id: string) =>
        apiRequest(`/appointments/${id}/accept`, { method: 'PATCH' }),
    reject: (id: string) =>
        apiRequest(`/appointments/${id}/reject`, { method: 'PATCH' }),
    delete: (id: string) =>
        apiRequest(`/appointments/${id}`, { method: 'DELETE' }),
};

// Contact API
export const contactApi = {
    getInfo: () => apiRequest('/contact/info'),
    updateInfo: (data: {
        email: string;
        phone: string;
        address: string;
        officeHours: string;
    }) =>
        apiRequest('/contact/info', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
    sendMessage: (data: {
        name: string;
        email: string;
        phone: string;
        subject: string;
        message: string;
        preferredContact: 'email' | 'phone';
        urgency: 'low' | 'medium' | 'high';
    }) =>
        apiRequest('/contact/messages', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
    getMessages: (status?: string) =>
        apiRequest(`/contact/messages${status ? `?status=${status}` : ''}`),
    getMessage: (id: string) => apiRequest(`/contact/messages/${id}`),
    updateMessageStatus: (id: string, status: string) =>
        apiRequest(`/contact/messages/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        }),
    deleteMessage: (id: string) =>
        apiRequest(`/contact/messages/${id}`, { method: 'DELETE' }),
};

// Journal API
export const journalApi = {
    getAll: (type?: string, search?: string) => {
        const params = new URLSearchParams();
        if (type) params.append('type', type);
        if (search) params.append('search', search);
        return apiRequest(`/journal?${params.toString()}`);
    },
    getById: (id: string) => apiRequest(`/journal/${id}`),
    getByType: (type: string) => apiRequest(`/journal/type/${type}`),
    search: (query: string) => apiRequest(`/journal/search?q=${query}`),
    getStats: () => apiRequest('/journal/stats/all'),
    create: (data: { title: string; type: string; excerpt: string; content: string; tags?: string[] }) =>
        apiRequest('/journal', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
    update: (id: string, data: { title?: string; excerpt?: string; content?: string; tags?: string[] }) =>
        apiRequest(`/journal/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),
    delete: (id: string) =>
        apiRequest(`/journal/${id}`, { method: 'DELETE' }),
};

// Testimonial API
export const testimonialApi = {
    getAll: (includeAll?: boolean) =>
        apiRequest(`/testimonials${includeAll ? '?all=true' : ''}`),
    getFeatured: () => apiRequest('/testimonials/featured'),
    getById: (id: string) => apiRequest(`/testimonials/${id}`),
    toggleFeatured: (id: string) =>
        apiRequest(`/testimonials/${id}/feature`, { method: 'PATCH' }),
    getCertificates: () => apiRequest('/testimonials/certificates'),
};

// Memory (Gallery) API
export const memoryApi = {
    getAll: () => apiRequest('/memories'),
    create: (formData: FormData) =>
        fetch(`${API_BASE_URL}/memories`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        }).then(res => res.json()),
    updateCaption: (id: string, caption: string) =>
        apiRequest(`/memories/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ caption }),
        }),
    delete: (id: string) =>
        apiRequest(`/memories/${id}`, { method: 'DELETE' }),
};

// Notification API
export const notificationApi = {
    getAll: (unreadOnly?: boolean) =>
        apiRequest(`/notifications${unreadOnly ? '?unread=true' : ''}`),
    getUnreadCount: () => apiRequest('/notifications/unread-count'),
    getReminders: () => apiRequest('/notifications/reminders'),
    markAsRead: (id: string) =>
        apiRequest(`/notifications/${id}/read`, { method: 'PATCH' }),
    markAllAsRead: () =>
        apiRequest('/notifications/read-all', { method: 'PATCH' }),
    delete: (id: string) =>
        apiRequest(`/notifications/${id}`, { method: 'DELETE' }),
};

// About API
export const aboutApi = {
    get: () => apiRequest('/about'),
};

export default {
    auth: authApi,
    appointment: appointmentApi,
    contact: contactApi,
    journal: journalApi,
    testimonial: testimonialApi,
    memory: memoryApi,
    notification: notificationApi,
    about: aboutApi,
};
