// Bookstore Application - Pure JavaScript
class BookStore {
    constructor() {
        this.books = [];
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.user = JSON.parse(localStorage.getItem('user')) || null;
        this.orders = JSON.parse(localStorage.getItem('orders')) || [];
        this.currentPage = 1;
        this.booksPerPage = 12;
        this.currentCategory = 'all';
        this.currentFilters = {
            categories: ['Fiction', 'Non-Fiction', 'Science', 'Fantasy', 'Biography'],
            maxPrice: 100,
            sort: 'default'
        };
        
        this.init();
    }
    
    init() {
        // Load books data
        this.loadBooks();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Update cart count
        this.updateCartCount();
        
        // Show home page
        this.showPage('home');
    }
    
    async loadBooks() {
        try {
            // If you have a data.json file, fetch it:
            // const response = await fetch('data.json');
            // this.books = await response.json();
            
            // For now, using hardcoded data
            this.books = this.getSampleBooks();
            this.renderFeaturedBooks();
            this.renderAllBooks();
            this.renderBestsellers();
        } catch (error) {
            console.error('Error loading books:', error);
            this.books = this.getSampleBooks();
        }
    }
    
    getSampleBooks() {
        return [
            {
                id: 1,
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                description: "A classic novel of the Jazz Age, exploring themes of idealism, resistance to change, social upheaval, and excess, creating a portrait of the Roaring Twenties that has been described as a cautionary tale regarding the American Dream.",
                price: 9.99,
                category: "Fiction",
                image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                rating: 4.5,
                stock: 10,
                featured: true,
                bestseller: true
            },
            {
                id: 2,
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                description: "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice, it views a world of great beauty and savage inequities through the eyes of a young girl.",
                price: 12.99,
                category: "Fiction",
                image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                rating: 4.8,
                stock: 8,
                featured: true,
                bestseller: true
            },
            {
                id: 3,
                title: "1984",
                author: "George Orwell",
                description: "A dystopian social science fiction novel and cautionary tale. Thematically, it centres on the consequences of totalitarianism, mass surveillance, and repressive regimentation of persons and behaviours within society.",
                price: 8.99,
                category: "Science Fiction",
                image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                rating: 4.7,
                stock: 15,
                featured: true,
                bestseller: false
            },
            {
                id: 4,
                title: "Pride and Prejudice",
                author: "Jane Austen",
                description: "A romantic novel of manners that depicts the emotional development of protagonist Elizabeth Bennet, who learns the error of making hasty judgements and comes to appreciate the difference between the superficial and the essential.",
                price: 7.99,
                category: "Fiction",
                image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                rating: 4.6,
                stock: 12,
                featured: false,
                bestseller: true
            },
            {
                id: 5,
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                description: "A fantasy novel and children's book. It follows the quest of home-loving hobbit Bilbo Baggins to win a share of the treasure guarded by Smaug the dragon.",
                price: 11.99,
                category: "Fantasy",
                image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                rating: 4.9,
                stock: 6,
                featured: true,
                bestseller: false
            },
            {
                id: 6,
                title: "The Da Vinci Code",
                author: "Dan Brown",
                description: "A mystery thriller novel that follows symbologist Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris.",
                price: 10.99,
                category: "Fiction",
                image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                rating: 4.3,
                stock: 20,
                featured: false,
                bestseller: true
            },
            {
                id: 7,
                title: "Sapiens: A Brief History of Humankind",
                author: "Yuval Noah Harari",
                description: "Explores the history of humankind from the evolution of archaic human species in the Stone Age up to the twenty-first century, focusing on Homo sapiens.",
                price: 15.99,
                category: "Non-Fiction",
                image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                rating: 4.7,
                stock: 18,
                featured: true,
                bestseller: true
            },
            {
                id: 8,
                title: "The Silent Patient",
                author: "Alex Michaelides",
                description: "A psychological thriller about a woman who shoots her husband and then stops speaking, and a criminal psychotherapist who is determined to get her to talk.",
                price: 9.99,
                category: "Fiction",
                image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                rating: 4.5,
                stock: 14,
                featured: false,
                bestseller: false
            },
            {
                id: 9,
                title: "Educated",
                author: "Tara Westover",
                description: "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
                price: 13.99,
                category: "Biography",
                image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                rating: 4.8,
                stock: 11,
                featured: true,
                bestseller: true
            },
            {
                id: 10,
                title: "The Power of Habit",
                author: "Charles Duhigg",
                description: "Explores the science behind why habits exist and how they can be changed. It brings to life a whole new understanding of human nature and its potential.",
                price: 11.99,
                category: "Non-Fiction",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                rating: 4.4,
                stock: 25,
                featured: false,
                bestseller: false
            },
            {
                id: 11,
                title: "Dune",
                author: "Frank Herbert",
                description: "Set in the distant future amidst a feudal interstellar society in which various noble houses control planetary fiefs, it tells the story of young Paul Atreides.",
                price: 14.99,
                category: "Science Fiction",
                image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                rating: 4.6,
                stock: 9,
                featured: true,
                bestseller: true
            },
            {
                id: 12,
                title: "Atomic Habits",
                author: "James Clear",
                description: "A practical guide to building good habits and breaking bad ones. It offers a proven framework for improving every day.",
                price: 16.99,
                category: "Non-Fiction",
                image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                rating: 4.9,
                stock: 30,
                featured: true,
                bestseller: true
            }
        ];
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.closest('a').dataset.page;
                this.showPage(page);
                this.closeMobileMenu();
            });
        });
        
        // Mobile menu toggle
        document.querySelector('.menu-toggle').addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Search
        document.getElementById('search-btn').addEventListener('click', () => {
            this.handleSearch();
        });
        
        document.getElementById('search-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
        
        // Category filters
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterByCategory(category);
            });
        });
        
        // Book filters
        document.getElementById('apply-filters').addEventListener('click', () => {
            this.applyFilters();
        });
        
        document.getElementById('reset-filters').addEventListener('click', () => {
            this.resetFilters();
        });
        
        document.getElementById('price-range').addEventListener('input', (e) => {
            document.getElementById('max-price').textContent = `$${e.target.value}`;
        });
        
        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.closest('button').dataset.view;
                this.changeView(view);
            });
        });
        
        // Cart
        document.getElementById('clear-cart').addEventListener('click', () => {
            this.clearCart();
        });
        
        document.getElementById('checkout-btn').addEventListener('click', () => {
            this.showCheckoutModal();
        });
        
        // Account tabs
        document.querySelectorAll('.account-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.showAccountTab(tabName);
            });
        });
        
        // Switch between login/register
        document.querySelector('.switch-to-register')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showAccountTab('register');
        });
        
        document.querySelector('.switch-to-login')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showAccountTab('login');
        });
        
        // Forms
        document.getElementById('login-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        document.getElementById('register-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });
        
        document.getElementById('profile-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProfile();
        });
        
        document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCheckout();
        });
        
        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeAllModals();
            });
        });
        
        document.getElementById('continue-shopping').addEventListener('click', () => {
            this.closeAllModals();
            this.showPage('books');
        });
        
        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAllModals();
                }
            });
        });
        
        // Sort by
        document.getElementById('sort-by').addEventListener('change', (e) => {
            this.currentFilters.sort = e.target.value;
            this.renderAllBooks();
        });
    }
    
    showPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current nav link
        document.querySelector(`.nav-link[data-page="${pageName}"]`)?.classList.add('active');
        
        // Show selected page
        const page = document.getElementById(`${pageName}-page`);
        if (page) {
            page.classList.add('active');
            
            // Update page-specific content
            if (pageName === 'cart') {
                this.renderCart();
            } else if (pageName === 'account') {
                this.updateAccountInfo();
            }
        }
    }
    
    toggleMobileMenu() {
        document.querySelector('.mobile-menu').classList.toggle('active');
    }
    
    closeMobileMenu() {
        document.querySelector('.mobile-menu').classList.remove('active');
    }
    
    renderFeaturedBooks() {
        const container = document.getElementById('featured-books');
        if (!container) return;
        
        const featuredBooks = this.books.filter(book => book.featured).slice(0, 3);
        container.innerHTML = featuredBooks.map(book => this.createBookCard(book)).join('');
        
        // Add event listeners to new buttons
        this.addBookEventListeners();
    }
    
    renderBestsellers() {
        const container = document.getElementById('bestsellers');
        if (!container) return;
        
        const bestsellers = this.books.filter(book => book.bestseller).slice(0, 4);
        container.innerHTML = bestsellers.map(book => this.createBookCard(book)).join('');
        
        // Add event listeners to new buttons
        this.addBookEventListeners();
    }
    
    renderAllBooks() {
        const container = document.getElementById('all-books');
        if (!container) return;
        
        // Apply filters
        let filteredBooks = this.applyCurrentFilters();
        
        // Sort
        filteredBooks = this.sortBooks(filteredBooks, this.currentFilters.sort);
        
        // Pagination
        const totalPages = Math.ceil(filteredBooks.length / this.booksPerPage);
        const startIndex = (this.currentPage - 1) * this.booksPerPage;
        const paginatedBooks = filteredBooks.slice(startIndex, startIndex + this.booksPerPage);
        
        // Render books
        container.innerHTML = paginatedBooks.map(book => this.createBookCard(book)).join('');
        
        // Update books count
        document.getElementById('books-count').textContent = 
            `Showing ${paginatedBooks.length} of ${filteredBooks.length} books`;
        
        // Render pagination
        this.renderPagination(totalPages);
        
        // Add event listeners to new buttons
        this.addBookEventListeners();
    }
    
    applyCurrentFilters() {
        return this.books.filter(book => {
            // Category filter
            if (!this.currentFilters.categories.includes(book.category)) {
                return false;
            }
            
            // Price filter
            if (book.price > this.currentFilters.maxPrice) {
                return false;
            }
            
            return true;
        });
    }
    
    sortBooks(books, sortType) {
        const sortedBooks = [...books];
        
        switch(sortType) {
            case 'price-low':
                return sortedBooks.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sortedBooks.sort((a, b) => b.price - a.price);
            case 'title':
                return sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return sortedBooks;
        }
    }
    
    renderPagination(totalPages) {
        const container = document.getElementById('pagination');
        if (!container) return;
        
        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <button class="page-btn ${this.currentPage === 1 ? 'disabled' : ''}" 
                    onclick="bookStore.changePage(${this.currentPage - 1})">
                Previous
            </button>
        `;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                paginationHTML += `
                    <button class="page-btn ${this.currentPage === i ? 'active' : ''}" 
                            onclick="bookStore.changePage(${i})">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                paginationHTML += `<span class="page-dots">...</span>`;
            }
        }
        
        // Next button
        paginationHTML += `
            <button class="page-btn ${this.currentPage === totalPages ? 'disabled' : ''}" 
                    onclick="bookStore.changePage(${this.currentPage + 1})">
                Next
            </button>
        `;
        
        container.innerHTML = paginationHTML;
    }
    
    changePage(page) {
        if (page < 1 || page > Math.ceil(this.applyCurrentFilters().length / this.booksPerPage)) {
            return;
        }
        
        this.currentPage = page;
        this.renderAllBooks();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    createBookCard(book) {
        return `
            <div class="book-card" data-id="${book.id}">
                <img src="${book.image}" alt="${book.title}" class="book-image">
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">by ${book.author}</p>
                    <div class="book-rating">
                        ${this.generateStarRating(book.rating)}
                        <span>(${book.rating})</span>
                    </div>
                    <p class="book-price">$${book.price.toFixed(2)}</p>
                    <div class="book-actions">
                        <button class="btn btn-outline view-details" data-id="${book.id}">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="btn btn-primary add-to-cart" data-id="${book.id}" 
                                ${book.stock === 0 ? 'disabled' : ''}>
                            <i class="fas fa-cart-plus"></i> 
                            ${book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateStarRating(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
    }
    
    addBookEventListeners() {
        // View details buttons
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(e.target.closest('button').dataset.id);
                this.showBookDetails(bookId);
            });
        });
        
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(e.target.closest('button').dataset.id);
                this.addToCart(bookId);
            });
        });
    }
    
    showBookDetails(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;
        
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <div class="book-detail">
                <img src="${book.image}" alt="${book.title}" class="book-detail-image">
                <div class="book-detail-info">
                    <h2>${book.title}</h2>
                    <p class="book-detail-author">by ${book.author}</p>
                    <div class="book-rating">
                        ${this.generateStarRating(book.rating)}
                        <span>${book.rating} • ${book.category}</span>
                    </div>
                    <p class="book-detail-price">$${book.price.toFixed(2)}</p>
                    <p class="book-stock">${book.stock > 0 ? 
                        `<i class="fas fa-check-circle" style="color: green;"></i> In Stock (${book.stock} available)` : 
                        `<i class="fas fa-times-circle" style="color: red;"></i> Out of Stock`}
                    </p>
                    <p class="book-detail-description">${book.description}</p>
                    <div class="book-actions">
                        <button class="btn btn-primary add-to-cart-detail" data-id="${book.id}" 
                                ${book.stock === 0 ? 'disabled' : ''}>
                            <i class="fas fa-cart-plus"></i> 
                            ${book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listener to the modal's add to cart button
        modalBody.querySelector('.add-to-cart-detail')?.addEventListener('click', () => {
            this.addToCart(bookId);
        });
        
        this.openModal('book-modal');
    }
    
    addToCart(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;
        
        // Check if book is already in cart
        const existingItem = this.cart.find(item => item.id === bookId);
        
        if (existingItem) {
            if (existingItem.quantity >= book.stock) {
                this.showNotification(`Only ${book.stock} items available in stock`, 'error');
                return;
            }
            existingItem.quantity++;
        } else {
            this.cart.push({
                ...book,
                quantity: 1
            });
        }
        
        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(this.cart));
        
        // Update UI
        this.updateCartCount();
        this.showNotification(`${book.title} added to cart`, 'success');
        
        // If on cart page, update it
        if (document.getElementById('cart-page').classList.contains('active')) {
            this.renderCart();
        }
    }
    
    updateCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').textContent = count;
    }
    
    renderCart() {
        const container = document.getElementById('cart-items');
        const checkoutBtn = document.getElementById('checkout-btn');
        
        if (this.cart.length === 0) {
            container.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some books to get started!</p>
                    <a href="#" class="btn btn-primary" data-page="books">Browse Books</a>
                </div>
            `;
            
            // Update summary
            this.updateCartSummary();
            checkoutBtn.disabled = true;
            
            // Add event listener to the button
            container.querySelector('a')?.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPage('books');
            });
            
            return;
        }
        
        let cartHTML = '';
        
        this.cart.forEach(item => {
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.title}</h4>
                        <p class="cart-item-author">by ${item.author}</p>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease-quantity" data-id="${item.id}">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn increase-quantity" data-id="${item.id}">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="cart-item-actions">
                        <button class="cart-item-remove" data-id="${item.id}">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = cartHTML;
        
        // Add event listeners
        document.querySelectorAll('.decrease-quantity').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(e.target.closest('button').dataset.id);
                this.updateCartQuantity(bookId, -1);
            });
        });
        
        document.querySelectorAll('.increase-quantity').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(e.target.closest('button').dataset.id);
                this.updateCartQuantity(bookId, 1);
            });
        });
        
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(e.target.closest('button').dataset.id);
                this.removeFromCart(bookId);
            });
        });
        
        // Update summary and enable checkout
        this.updateCartSummary();
        checkoutBtn.disabled = false;
    }
    
    updateCartQuantity(bookId, change) {
        const item = this.cart.find(item => item.id === bookId);
        if (!item) return;
        
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;
        
        const newQuantity = item.quantity + change;
        
        if (newQuantity < 1) {
            this.removeFromCart(bookId);
            return;
        }
        
        if (newQuantity > book.stock) {
            this.showNotification(`Only ${book.stock} items available in stock`, 'error');
            return;
        }
        
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
        this.renderCart();
    }
    
    removeFromCart(bookId) {
        this.cart = this.cart.filter(item => item.id !== bookId);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
        this.renderCart();
        this.showNotification('Item removed from cart', 'info');
    }
    
    clearCart() {
        if (this.cart.length === 0) return;
        
        if (confirm('Are you sure you want to clear your cart?')) {
            this.cart = [];
            localStorage.removeItem('cart');
            this.updateCartCount();
            this.renderCart();
            this.showNotification('Cart cleared', 'info');
        }
    }
    
    updateCartSummary() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 5.00;
        const tax = subtotal * 0.1; // 10% tax
        
        document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('cart-tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('cart-total').textContent = `$${(subtotal + shipping + tax).toFixed(2)}`;
    }
    
    showCheckoutModal() {
        if (this.cart.length === 0) return;
        
        // Update checkout summary
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 5.00;
        const tax = subtotal * 0.1;
        
        document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('checkout-tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('checkout-total').textContent = `$${(subtotal + shipping + tax).toFixed(2)}`;
        
        // Pre-fill user info if logged in
        if (this.user) {
            document.getElementById('checkout-name').value = this.user.name || '';
            document.getElementById('checkout-email').value = this.user.email || '';
            document.getElementById('checkout-address').value = this.user.address || '';
        }
        
        this.openModal('checkout-modal');
    }
    
    handleCheckout() {
        // Get form data
        const name = document.getElementById('checkout-name').value;
        const email = document.getElementById('checkout-email').value;
        const address = document.getElementById('checkout-address').value;
        const city = document.getElementById('checkout-city').value;
        const zip = document.getElementById('checkout-zip').value;
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        
        // Validate
        if (!name || !email || !address || !city || !zip) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Create order
        const orderId = 'ORD' + Date.now().toString().slice(-8);
        const order = {
            id: orderId,
            date: new Date().toISOString(),
            customer: { name, email, address: `${address}, ${city}, ${zip}` },
            items: [...this.cart],
            paymentMethod,
            total: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 5 + (this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.1),
            status: 'Processing'
        };
        
        // Save order
        this.orders.push(order);
        localStorage.setItem('orders', JSON.stringify(this.orders));
        
        // Clear cart
        this.cart = [];
        localStorage.removeItem('cart');
        this.updateCartCount();
        
        // Show success modal
        document.getElementById('order-id').textContent = orderId;
        this.closeAllModals();
        this.openModal('order-success-modal');
        
        // Update account page if open
        if (document.getElementById('account-page').classList.contains('active')) {
            this.renderOrders();
        }
    }
    
    handleSearch() {
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value.trim().toLowerCase();
        
        if (!query) {
            this.showNotification('Please enter a search term', 'error');
            return;
        }
        
        // Show books page
        this.showPage('books');
        
        // Filter books by search query
        const filteredBooks = this.books.filter(book => 
            book.title.toLowerCase().includes(query) || 
            book.author.toLowerCase().includes(query) ||
            book.description.toLowerCase().includes(query)
        );
        
        // Update UI to show search results
        const container = document.getElementById('all-books');
        if (filteredBooks.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No books found for "${query}"</h3>
                    <p>Try different keywords or browse all books</p>
                </div>
            `;
        } else {
            container.innerHTML = filteredBooks.map(book => this.createBookCard(book)).join('');
            this.addBookEventListeners();
        }
        
        // Update count
        document.getElementById('books-count').textContent = 
            `Found ${filteredBooks.length} books for "${query}"`;
    }
    
    filterByCategory(category) {
        this.currentCategory = category;
        
        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });
        
        // Filter books
        const filteredBooks = category === 'all' 
            ? this.books 
            : this.books.filter(book => book.category === category);
        
        // Update featured books section
        const featuredContainer = document.getElementById('featured-books');
        const featuredBooks = filteredBooks.filter(book => book.featured).slice(0, 3);
        featuredContainer.innerHTML = featuredBooks.map(book => this.createBookCard(book)).join('');
        this.addBookEventListeners();
    }
    
    applyFilters() {
        // Get selected categories
        const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
            .map(cb => cb.value);
        
        // Get max price
        const maxPrice = parseInt(document.getElementById('price-range').value);
        
        // Update current filters
        this.currentFilters.categories = selectedCategories;
        this.currentFilters.maxPrice = maxPrice;
        
        // Reset to page 1
        this.currentPage = 1;
        
        // Re-render books
        this.renderAllBooks();
        
        this.showNotification('Filters applied', 'success');
    }
    
    resetFilters() {
        // Reset all checkboxes
        document.querySelectorAll('input[name="category"]').forEach(cb => {
            cb.checked = true;
        });
        
        // Reset price range
        document.getElementById('price-range').value = 100;
        document.getElementById('max-price').textContent = '$100';
        
        // Reset sort
        document.getElementById('sort-by').value = 'default';
        
        // Reset current filters
        this.currentFilters = {
            categories: ['Fiction', 'Non-Fiction', 'Science', 'Fantasy', 'Biography'],
            maxPrice: 100,
            sort: 'default'
        };
        
        // Reset page
        this.currentPage = 1;
        
        // Re-render
        this.renderAllBooks();
        
        this.showNotification('Filters reset', 'info');
    }
    
    changeView(view) {
        const container = document.getElementById('all-books');
        const buttons = document.querySelectorAll('.view-btn');
        
        // Update active button
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === view) {
                btn.classList.add('active');
            }
        });
        
        // Change view class
        container.className = view === 'list' ? 'books-list' : 'books-grid';
    }
    
    showAccountTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll('.account-tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Remove active class from all tabs
        document.querySelectorAll('.account-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show selected tab
        document.getElementById(`${tabName}-tab`).classList.add('active');
        document.querySelector(`.account-tab[data-tab="${tabName}"]`).classList.add('active');
        
        // Load tab-specific content
        if (tabName === 'orders') {
            this.renderOrders();
        } else if (tabName === 'profile' && this.user) {
            this.loadProfileData();
        }
    }
    
    updateAccountInfo() {
        if (this.user) {
            document.getElementById('user-name').textContent = this.user.name;
            document.getElementById('user-email').textContent = this.user.email;
        } else {
            document.getElementById('user-name').textContent = 'Guest';
            document.getElementById('user-email').textContent = 'guest@example.com';
        }
    }
    
    handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Simple validation
        if (!email || !password) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Mock login (in real app, this would call an API)
        this.user = {
            name: email.split('@')[0],
            email: email,
            address: '123 Book Street, Reading City'
        };
        
        localStorage.setItem('user', JSON.stringify(this.user));
        this.updateAccountInfo();
        this.showNotification('Login successful!', 'success');
        
        // Clear form
        document.getElementById('login-form').reset();
        
        // Switch to profile tab
        this.showAccountTab('profile');
    }
    
    handleRegister() {
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;
        
        // Validation
        if (!name || !email || !password || !confirm) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (password !== confirm) {
            this.showNotification('Passwords do not match', 'error');
            return;
        }
        
        if (password.length < 6) {
            this.showNotification('Password must be at least 6 characters', 'error');
            return;
        }
        
        // Mock registration
        this.user = {
            name: name,
            email: email,
            address: ''
        };
        
        localStorage.setItem('user', JSON.stringify(this.user));
        this.updateAccountInfo();
        this.showNotification('Registration successful!', 'success');
        
        // Clear form
        document.getElementById('register-form').reset();
        
        // Switch to profile tab
        this.showAccountTab('profile');
    }
    
    loadProfileData() {
        if (!this.user) return;
        
        document.getElementById('profile-name').value = this.user.name || '';
        document.getElementById('profile-email').value = this.user.email || '';
        document.getElementById('profile-address').value = this.user.address || '';
        document.getElementById('profile-phone').value = this.user.phone || '';
    }
    
    saveProfile() {
        if (!this.user) return;
        
        this.user.name = document.getElementById('profile-name').value;
        this.user.address = document.getElementById('profile-address').value;
        this.user.phone = document.getElementById('profile-phone').value;
        
        localStorage.setItem('user', JSON.stringify(this.user));
        this.updateAccountInfo();
        this.showNotification('Profile updated successfully!', 'success');
    }
    
    renderOrders() {
        const container = document.getElementById('orders-list');
        
        if (this.orders.length === 0) {
            container.innerHTML = `
                <div class="empty-orders">
                    <i class="fas fa-box-open"></i>
                    <p>No orders yet</p>
                    <a href="#" class="btn btn-primary" data-page="books">Start Shopping</a>
                </div>
            `;
            
            // Add event listener
            container.querySelector('a')?.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPage('books');
            });
            
            return;
        }
        
        let ordersHTML = '';
        
        this.orders.forEach(order => {
            const orderDate = new Date(order.date).toLocaleDateString();
            
            ordersHTML += `
                <div class="order-card">
                    <div class="order-header">
                        <div>
                            <h4>Order ${order.id}</h4>
                            <p class="order-date">${orderDate}</p>
                        </div>
                        <div class="order-status">
                            <span class="status-badge ${order.status.toLowerCase()}">${order.status}</span>
                            <span class="order-total">$${order.total.toFixed(2)}</span>
                        </div>
                    </div>
                    <div class="order-items">
                        ${order.items.map(item => `
                            <div class="order-item">
                                <img src="${item.image}" alt="${item.title}" class="order-item-image">
                                <div class="order-item-info">
                                    <h5>${item.title}</h5>
                                    <p>Quantity: ${item.quantity} × $${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = ordersHTML;
    }
    
    openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
    
    showNotification(message, type = 'info') {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4cc9f0' : type === 'error' ? '#f72585' : '#4361ee'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        
        // Add keyframes for animation
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize the application
let bookStore;

document.addEventListener('DOMContentLoaded', () => {
    bookStore = new BookStore();
    
    // Make bookStore globally available for onclick handlers
    window.bookStore = bookStore;
});