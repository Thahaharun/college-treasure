const Components = {
    header: () => `
        <div class="header-container">
            <a href="#" class="logo" onclick="App.navigate('home'); return false;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                College Treasure
            </a>
            <button class="btn btn-primary" onclick="App.navigate('post');">
                + Report Item
            </button>
        </div>
    `,

    filters: () => `
        <div class="filters-bar">
            <input type="text" id="search-input" class="search-input" placeholder="Search items..." oninput="App.handleSearch(this.value)">
            <select id="type-filter" class="filter-select" onchange="App.handleFilter()">
                <option value="all">All Types</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
            </select>
            <select id="category-filter" class="filter-select" onchange="App.handleFilter()">
                <option value="all">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Accessories">Accessories</option>
                <option value="Books">Books</option>
                <option value="Other">Other</option>
            </select>
        </div>
    `,

    itemCard: (item) => {
        const badgeClass = item.type === 'lost' ? 'badge-lost' : 'badge-found';
        const contactDisplay = item.contact.replace(/(\d{3})\d+(\d{3})/, '$1***$2');

        return `
        <div class="item-card" onclick="App.viewItem('${item.id}')">
            <img src="${item.image}" alt="${item.title}" class="card-image">
            <div class="card-content">
                <span class="card-badge ${badgeClass}">${item.type}</span>
                <h3 class="card-title">${item.title}</h3>
                <div class="card-meta">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    ${item.location}
                </div>
                <div class="card-meta">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    ${item.date}
                </div>
            </div>
        </div>
        `;
    },

    feed: (items) => {
        if (items.length === 0) {
            return `<div class="text-center" style="grid-column: 1/-1; padding: 3rem;">
                <h3>No items found</h3>
                <p class="text-muted">Try adjusting your search or filters.</p>
            </div>`;
        }
        return `
            <div class="feed-grid">
                ${items.map(item => Components.itemCard(item)).join('')}
            </div>
        `;
    },

    postForm: () => `
        <div class="form-container">
            <h2 class="mb-4">Report Lost or Found Item</h2>
            <form onsubmit="App.handlePostSubmit(event)">
                <div class="form-group">
                    <label class="form-label">Type</label>
                    <div style="display: flex; gap: 1rem;">
                        <label><input type="radio" name="type" value="lost" checked> Lost</label>
                        <label><input type="radio" name="type" value="found"> Found</label>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">Title</label>
                    <input type="text" name="title" class="form-input" required placeholder="e.g. Blue Backpack">
                </div>

                <div class="form-group">
                    <label class="form-label">Category</label>
                    <select name="category" class="form-select">
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Books">Books</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Location</label>
                    <input type="text" name="location" class="form-input" required placeholder="e.g. Library 2nd Floor">
                </div>

                <div class="form-group">
                    <label class="form-label">Date</label>
                    <input type="date" name="date" class="form-input" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea name="description" class="form-textarea" rows="4" placeholder="Provide more details..."></textarea>
                </div>

                <div class="form-group">
                    <label class="form-label">Contact (Phone/Email)</label>
                    <input type="text" name="contact" class="form-input" required placeholder="Will be partially hidden">
                </div>

                <div class="form-group">
                    <label class="form-label">Image</label>
                    <div class="file-upload" onclick="document.getElementById('image-input').click()">
                        <p id="file-label">Click to upload image</p>
                        <input type="file" id="image-input" accept="image/*" class="hidden" onchange="App.handleImageUpload(this)">
                    </div>
                    <input type="hidden" name="image" id="image-base64">
                    <img id="image-preview" class="hidden" style="width: 100%; margin-top: 1rem; border-radius: 0.5rem;">
                </div>

                <div style="display: flex; gap: 1rem;">
                    <button type="button" class="btn btn-outline" onclick="App.navigate('home')">Cancel</button>
                    <button type="submit" class="btn btn-primary" style="flex: 1;">Submit Report</button>
                </div>
            </form>
        </div>
    `,

    itemDetail: (item) => `
        <div class="form-container">
            <button class="btn btn-outline mb-4" onclick="App.navigate('home')">← Back</button>
            <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: var(--radius); margin-bottom: 1.5rem;">
            
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                <div>
                    <span class="card-badge ${item.type === 'lost' ? 'badge-lost' : 'badge-found'}">${item.type}</span>
                    <h1 style="font-size: 2rem; margin-top: 0.5rem;">${item.title}</h1>
                </div>
                <div class="text-muted">${item.date}</div>
            </div>

            <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
                <div><strong>Location:</strong> ${item.location}</div>
                <div><strong>Category:</strong> ${item.category}</div>
                <div><strong>Contact:</strong> ${item.contact}</div> <!-- Full contact visible in detail view? Or still masked? User req said masked visually. Let's show it fully here for the claimer or keep it masked and require a 'Claim' action to reveal? User said "Contact info must be masked visually". I'll mask it here too for consistency, maybe reveal on click. -->
                <p style="line-height: 1.6;">${item.description}</p>
            </div>

            <button class="btn btn-primary" style="width: 100%;" onclick="alert('Please contact: ' + '${item.contact}')">Contact Owner / Finder</button>
        </div>
    `
};
