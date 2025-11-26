# 🎬 The SunSet Movies

Users can easily search for movie information and explore details like ratings, descriptions, and duration. They can also add movies to their favorites list to keep track of films they’re interested in.
User:
- Movie lovers who enjoy discovering new films

- Users who want to read details like ratings, duration, and reviews

- Anyone who wants to save a list of movies to watch later


> **Note**: This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Features

- **Authentication System**
  - User registration and login
  - Using Appwrite Auth for Backend of Authentication.
  - Session management

- **Home Screen**
  - Browse popular movies
  - Display with movie cards
  - Real-time loading data Fetch from TMDB

- **Search Functionality**
  - Search movies by title
  - Debounced search for optimal performance
  - Display search results as the movies card as the Home Screen as well

- **Favorites Management**
  - Add movies to favorites list
  - Remove movies from favorites
  - Persistent favorites storage
  - Using Async-Storage and Favourite-Context to control global state

- **Profile Management**
  - Upload profile picture from gallery
  - Take photo with camera
  - Toggle between light and dark theme
  - Logout functionality

- **Movie Details**
  - Dynamic routing for each movie
  - Display movie duration, release date, description, and rating

- **Theme Support**
  - Light and dark mode
  - Consistent theming across all screens
  - Smooth theme transitions

## Tech Stack

- **Framework**: React Native with Expo
- **Routing**: Expo Router (file-based routing)
- **UI Library**: React Native Paper
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Context API
- **Backend**: Appwrite (Authentication & Database)
- **API**: The Movie Database (TMDB) API
- **Image Picker**: Expo Image Picker
- **TypeScript**: For type safety

## Project Structure

```
app/
├── (tabs)/              # Tab navigation screens
│   ├── index.tsx        # Home screen
│   ├── search.tsx       # Search screen
│   ├── saved.tsx        # Favorites screen
│   └── profile.tsx      # Profile screen
├── auth/                # Authentication screens
│   └── authen.tsx        # Login/Register screen
└── movies/
    └── [id].tsx         # Movie details (dynamic route)

assets               # Authentication screens
│── images        #images UI
└── icons        # icons UI

constants/
├── color.js      # color for themecontext (dark and light)
├── icons.ts      # icons and image UI
└── image.tsx     # Creates glow effect on active tab in bottom navigation

components/
├── MoviesCard.tsx       # Movie card component
└── SearchBar.tsx        # Search input component

contexts/
├── AuthContext.tsx      # Authentication state management
├── ColorThemeContext.tsx # Theme state management
└── FavouriteContext.tsx # Favorites state management

lib/
└── appwrite.ts          # Appwrite client configuration

services/
├── api.ts               # TMDB API service functions
├── authen.js            # Appwrite authentication service
└── useFetch.ts          # Custom fetch hook

.env # use for config the appwrite Id
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm
- Expo CLI
- TMDB API Key
- Appwrite Account & Project

### Installation

1. Clone the repository:
```bash
git clone "URL"
cd sunset-movies
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your API keys:
```env
EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
```

4. Start the development server:
```bash
npx expo start
```

5. Run on your device:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

## API Configuration

### TMDB API Setup

This app uses The Movie Database (TMDB) API for movie data. To get your API key:

1. Visit [TMDB](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API
4. Request an API key
5. Copy the API key to your `.env` file

### Appwrite Setup

This app uses Appwrite for backend authentication and data storage.

1. Create an account at [Appwrite Cloud](https://cloud.appwrite.io/) or [self-host Appwrite](https://appwrite.io/docs/self-hosting)
2. Create a new project
3. Get your Project ID and Endpoint from the project settings
4. Set up Authentication:
   - Go to Authentication in your Appwrite console
   - Enable Email/Password authentication
5. Add your Appwrite credentials to `.env`:
   ```env
   EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   ```

## 🎨 Theming

The app supports both light and dark themes. Users can toggle between themes in the Profile screen. The theme preference is persisted across app sessions.

## 🔐 Authentication

The app uses Appwrite for authentication with the following features:

- **Email/Password Registration**: Create new user accounts
- **Login**: Secure session-based authentication
- **Session Management**: Automatic session handling
- **Logout**: Clean session termination
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Current User Retrieval**: Get logged-in user information

### Authentication Flow

1. Users register with email, password, and name
2. Appwrite creates a user account and initiates a session
3. Session is stored and managed by AuthContext
4. Protected routes check authentication status
5. Users can logout to terminate the session

## 🏗️ Architecture

### Authentication Service (`services/authen.js`)

The authentication service provides the following methods:

- `register(email, password, name)` - Create a new user account
- `login(email, password)` - Sign in existing user
- `logout()` - End current session

### State Management

The app uses React Context API for Global state management:

- **AuthContext**: Manages authentication state and user data
- **ColorThemeContext**: Handles light/dark theme switching
- **FavouriteContext**: Manages favorite movies list

### Dynamic route
Using dynamic route for movie details

### API usage
use fetch API for fetching data from TMDB and using CRUD(CRD) API for auth.

### API Endpoints
TMDB API:

- GET /discover/movie - Fetch popular movies sorted by popularity
- GET /search/movie - Search movies by title
- GET /movie/{id} - Get movie details by ID

Appwrite API:

- POST /account - User registration
- POST /account/sessions/email - User login
- DELETE /account/sessions/current - User logout
- GET /account - Get current authenticated user
---
