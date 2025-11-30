const App = {
    state: {
        view: 'home', // home, post, item
        items: [],
        filters: {
            search: '',
            type: 'all',
            category: 'all'
        },
        currentItem: null
    },

    init: () => {
        App.state.items = Storage.getItems();
        App.render();
    },

    render: () => {
        const app = document.getElementById('app');
        const header = document.getElementById('main-header');
        const main = document.getElementById('main-content');

        // Render Header
        header.innerHTML = Components.header();

        // Render Main Content based on View
        if (App.state.view === 'home') {
            const filteredItems = App.filterItems();
            main.innerHTML = `
                ${Components.filters()}
                ${Components.feed(filteredItems)}
            `;
            // Restore filter values
            document.getElementById('search-input').value = App.state.filters.search;
            document.getElementById('type-filter').value = App.state.filters.type;
            document.getElementById('category-filter').value = App.state.filters.category;
        } else if (App.state.view === 'post') {
            main.innerHTML = Components.postForm();
        } else if (App.state.view === 'item' && App.state.currentItem) {
            main.innerHTML = Components.itemDetail(App.state.currentItem);
        }
    },

    navigate: (view) => {
        App.state.view = view;
        if (view === 'home') {
            App.state.items = Storage.getItems(); // Refresh items
            App.state.currentItem = null;
        }
        App.render();
        window.scrollTo(0, 0);
    },

    viewItem: (id) => {
        const item = App.state.items.find(i => i.id === id);
        if (item) {
            App.state.currentItem = item;
            App.navigate('item');
        }
    },

    handleSearch: (value) => {
        App.state.filters.search = value.toLowerCase();
        App.render(); // Re-render to update feed
        // Focus back on input (simple hack to keep focus after re-render)
        const input = document.getElementById('search-input');
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
    },

    handleFilter: () => {
        App.state.filters.type = document.getElementById('type-filter').value;
        App.state.filters.category = document.getElementById('category-filter').value;
        App.render();
    },

    filterItems: () => {
        return App.state.items.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(App.state.filters.search) ||
                item.location.toLowerCase().includes(App.state.filters.search);
            const matchesType = App.state.filters.type === 'all' || item.type === App.state.filters.type;
            const matchesCategory = App.state.filters.category === 'all' || item.category === App.state.filters.category;

            return matchesSearch && matchesType && matchesCategory;
        });
    },

    handleImageUpload: (input) => {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('image-base64').value = e.target.result;
                const preview = document.getElementById('image-preview');
                preview.src = e.target.result;
                preview.classList.remove('hidden');
                document.getElementById('file-label').textContent = file.name;
            };
            reader.readAsDataURL(file);
        }
    },

    handlePostSubmit: (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newItem = {
            type: formData.get('type'),
            title: formData.get('title'),
            category: formData.get('category'),
            location: formData.get('location'),
            date: formData.get('date'),
            description: formData.get('description'),
            contact: formData.get('contact'),
            image: formData.get('image') || 'https://placehold.co/600x400?text=No+Image'
        };

        const addedItem = Storage.addItem(newItem);
        console.log('Lost item added successfully.');
        console.log('ItemID:', addedItem.id);
        alert('Lost item added successfully.');
        App.navigate('home');
    }
};

// Start the app
document.addEventListener('DOMContentLoaded', App.init);
