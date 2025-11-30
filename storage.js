const STORAGE_KEY = 'college_treasure_items';

const Storage = {
    getItems: () => {
        const items = localStorage.getItem(STORAGE_KEY);
        return items ? JSON.parse(items) : [];
    },

    addItem: (item) => {
        const items = Storage.getItems();
        const newItem = {
            id: 'CT-' + Date.now().toString(36).toUpperCase(),
            createdAt: new Date().toISOString(),
            status: 'active', // active, claimed
            ...item
        };
        items.unshift(newItem);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        return newItem;
    },

    updateItem: (id, updates) => {
        const items = Storage.getItems();
        const index = items.findIndex(i => i.id === id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updates };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
            return items[index];
        }
        return null;
    },

    seedData: () => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            const mockData = [
                {
                    id: 'LF1023',
                    type: 'lost',
                    title: 'Black Leather Wallet',
                    category: 'Wallet',
                    location: 'Main Library, 2nd Floor',
                    date: '2025-11-29',
                    description: 'Lost my black leather wallet near the quiet study area. Contains ID and some cash.',
                    contact: '9123456789',
                    image: 'https://placehold.co/600x400/1e293b/ffffff?text=Wallet',
                    status: 'active',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'LF1024',
                    type: 'found',
                    title: 'Blue Water Bottle',
                    category: 'Accessories',
                    location: 'Gym Locker Room',
                    date: '2025-11-30',
                    description: 'Found a blue metal water bottle left on a bench.',
                    contact: '9988776655',
                    image: 'https://placehold.co/600x400/14b8a6/ffffff?text=Water+Bottle',
                    status: 'active',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));
        }
    }
};

// Initialize with seed data if empty
Storage.seedData();
