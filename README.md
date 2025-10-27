# Product Catalog App

Hey there! This is a product catalog application where you can browse, edit, and manage products. I built this using React and some cool modern tools to make it fast and user-friendly.

## What Can You Do With This?

When you open the app, you'll be able to:

- **Log in** to access the catalog (don't worry, it's just a demo login)
- **Browse products** displayed in a nice grid layout
- **Search** for specific products by typing in the search bar
- **Filter** products by their category using a dropdown
- **View details** by clicking on any product
- **Edit products** - change the title, price, description, or category
- **Delete products** - with a confirmation popup so you don't accidentally remove something
- **Everything saves automatically** - your changes stick around even if you refresh the page

## What's Under the Hood?

I used these technologies to build this:

- **React 18** - for building the user interface
- **Redux Toolkit** - to manage the app's state and data
- **Tailwind CSS** - for styling (makes it look good without writing tons of CSS)
- **Lucide React** - for all the icons you see
- **Vite** - super fast build tool and development server

## How to Run This Locally

You'll need Node.js installed on your computer (version 16 or newer).

### Step 1: Install Everything

Open your terminal in the project folder and run:

npm install

This downloads all the necessary packages.

### Step 2: Start the Development Server

npm run dev

The app will open in your browser (usually at http://localhost:5173).

### Step 3: Build for Production 

If you want to create a production-ready version:

npm run build

## How to Use the App

### Logging In

When you first open the app, you'll see a login screen. Use these credentials:

- **Username:** user
- **Password:** password

(Yeah, it's simple because this is just a demo!)

### Browsing Products

Once you're logged in, you'll see all the products displayed as cards. Each card shows:
- Product image
- Title
- Price in Indian Rupees (₹)
- Category
- Rating

You can scroll through them, and there's a counter at the top showing how many products are available.

### Searching and Filtering

- **Search bar** - Start typing a product name and the list filters in real-time
- **Category dropdown** - Select a category to see only products from that category

### Viewing Product Details

Click on any product card and a popup (modal) appears with:
- Full product description
- All product information
- Buttons to edit or delete the product

### Editing a Product

1. Click on a product to open its details
2. Click the "Edit Product" button
3. Change whatever you want (title, price, category, description)
4. Click "Save Changes"

The change happens instantly! No waiting around.

### Deleting a Product

1. Open a product's details
2. Click "Delete Product"
3. Confirm you really want to delete it
4. Gone! It disappears immediately

### Logging Out

Click the "Logout" button in the top right corner whenever you're done.

I implemented something called "optimistic updates." When you edit or delete a product, the app updates the screen immediately without waiting for any backend confirmation. This makes everything feel instant and smooth.

If something goes wrong (like you lose internet), the app automatically rolls back the change. But honestly, since we're using localStorage, everything happens locally anyway, so it's super reliable.


When you first load the app, it fetches products from the [FakeStore API](https://fakestoreapi.com/) - a free API for testing. Then it:

1. Converts all prices from USD to Indian Rupees (₹)
2. Saves everything to your browser's localStorage
3. Shows you the products

From that point on, everything works from localStorage. So even if you're offline, you can still browse and make changes.

### About Those Prices

All prices are automatically converted from USD to INR using an exchange rate of 1 USD = 83.5 INR. They're also formatted properly with the rupee symbol (₹) and Indian number formatting, so ₹12,345.50 instead of $147.89.

## Project Structure

Here's how the code is organized:

src/
├── components/         All the React components (login, product cards, modals, etc.)
├── contexts/          Authentication logic
├── store/             Redux store and API configuration
├── utils/             Helper functions (like price formatting)
├── App.jsx            Main app component
└── main.jsx           Entry point where everything starts


## Things I Learned Building This

- **localStorage is awesome** for small apps - no database needed!
- **Optimistic updates** make apps feel way faster
- **RTK Query** handles caching really well, so I didn't have to write tons of API logic
- **Tailwind CSS** speeds up styling a lot once you get used to it

