# HCI Project - Scientists and News Platform

A full-stack web application for managing and displaying information about scientists and news articles.

## Features

### User Features
- Browse scientists by country
- View scientist profiles and contributions
- Read news articles
- Comment on news articles
- User authentication (signup/login)

### Admin Features
- **Analytics Dashboard** - Track platform metrics and trends
- Manage scientists (add, edit, delete)
- Manage news articles (add, edit, delete)
- Manage user comments
- Browse content as users see it

## Analytics Dashboard

The admin dashboard now includes a comprehensive analytics section that provides:

### 📊 Key Metrics
- Total number of scientists
- Total number of news articles
- Total number of comments
- Recent activity (last 7 days)

### 📈 Charts and Visualizations
1. **Scientists by Country** - Pie chart showing distribution of scientists across countries
2. **News Publication Trends** - Line chart showing news published over time
3. **Scientists Added Over Time** - Bar chart showing when scientists were added to the platform

### 🔄 Real-time Updates
- Analytics data updates automatically when content is added or modified
- Refresh button to manually update analytics
- Protected admin-only access

## Technology Stack

### Frontend
- React 19
- Chart.js with react-chartjs-2 for analytics
- Tailwind CSS for styling
- React Router for navigation
- React Toastify for notifications

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HCI
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Create .env file in backend directory**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

6. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

7. **Start the frontend development server**
   ```bash
   npm run dev
   ```

## Usage

### Admin Access
1. Navigate to `/admin/login`
2. Use admin credentials to log in
3. Access the analytics dashboard from the "Analytics" tab

### Analytics Features
- View real-time metrics and charts
- Track content growth over time
- Monitor user engagement through comments
- Analyze geographic distribution of scientists

