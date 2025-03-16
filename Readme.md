# 📚 Book Haven - A Book Management CRUD API 🚀

Welcome to **Book Haven**, a robust API for managing books and their reviews! This project is a full CRUD (Create, Read, Update, Delete) application built with Node.js, Express.js, MongoDB, and Redis. Whether you’re a bibliophile or a dev enthusiast, this API has you covered! 🌟

---

## 🚀 Project Overview

Book Haven lets you:
- **Create** new books with details like title, author, ISBN, and genre.
- **Read** all books or fetch one by ISBN.
- **Update** book details with ease.
- **Delete** books from the collection.
- **Add Reviews** to books with reviewer names, ratings, and comments.

Built as Task 2, it combines secure, scalable backend tech with a RESTful API design—perfect for learning or expanding!

---

## 💡 Features

- ✅ **Book CRUD**: Full management of book records via ISBN.
- ✅ **Review System**: Add reviews to books with ratings (1-5) and comments.
- ✅ **Security**: Helmet middleware for HTTP header protection.
- ✅ **Performance**: Redis caching for faster reads.
- ✅ **Persistence**: MongoDB for reliable data storage.
- ✅ **Health Check**: Monitor DB and Redis status with `/api/health`.

---

## 🛠️ Tech Stack

### Backend:
- **Node.js**: Runtime environment.
- **Express.js**: RESTful API framework.
- **MongoDB**: NoSQL database with Mongoose ORM.
- **Redis**: In-memory caching for speed.
- **Helmet**: Security middleware.
- **Morgan**: HTTP request logging.
- **CORS**: Cross-origin resource sharing.

### Tools:
- **Visual Studio Code**: Code editor.
- **Git**: Version control.
- **dotenv**: Environment variable management.
- **Thunder Client**: API testing.

---

## 📂 Project Structure
```
book-haven/
├── config/
│   ├── database.js      # MongoDB connection
│   └── redis.js         # Redis connection
├── controllers/
│   └── middleware/
│       └── errorHandler.js  # Error handling middleware
├── models/
│   └── Book.js          # Mongoose schema for books
├── routes/
│   └── bookRoutes.js    # API routes
├── public/              # Optional static files
├── server.js            # Main server file
├── .env                 # Environment variables
├── package.json         # Dependencies
└── README.md            # You’re here!
```
---

## 📸 Screenshots

- **API Response**: Example of a book with reviews!  
```
POST: http://localhost:3000/api/books/:isbn/reviews
Response:
 {
  "_id": "67d6da9d8ace4ca74d352a1e",
  "title": "Echoes of Rome",
  "author": "Clara Historia",
  "isbn": "978-5-6789-0123-4",
  "publicationDate": "2019-09-22T00:00:00.000Z",
  "genre": "Historical Fiction",
  "reviews": [
    {
      "reviewer": "Mystic Reader",
      "rating": 5,
      "comment": "Enchanting and beautifully written—couldn’t put it down!",
      "_id": "67d6dcea7537cf642acf6afd",
      "createdAt": "2025-03-16T14:15:06.380Z"
    }
  ],
  "__v": 1
}
```
## 🎥 Demo Video
Check out the To-Do List in action!  
![Book Haven Demo](./assets/Demo.webm)
---

## 📋 Prerequisites

- **Node.js**: v16+ recommended.
- **MongoDB**: Local instance or MongoDB Atlas.
- **Redis**: Local instance or Redis Cloud.
- **npm**: Package manager.
- **Git**: To clone the repo.

---

## 🚀 Setup & Installation

### 1️⃣ Clone the Repository:
```bash
git clone https://github.com/your-username/book-haven.git
cd book-haven
```
### 2️⃣ Install Dependencies:
```
npm install
```
### 3️⃣ Set Up Environment Variables:
Create a .env file in the root:
```
PORT=3000
baseUrl=http://localhost:3000/api
ACCESS_TOKEN_SECRET=your-access-secret
REFRESH_TOKEN_SECRET=your-refresh-secret
DB_URI_PRODUCTION=your-mongo-uri
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
NODE_ENV=development
```
- Generate secrets with openssl rand -hex 32.
- Replace your-mongo-uri with your MongoDB connection string.
- Update Redis settings as needed.
### 4️⃣ Start the Server:
```
node server.js
```
- Runs on http://localhost:3000.
---
## 🌐 API Endpoints
- **GET /api/books:** Fetch all books.
- **GET /api/books/:isbn:** Fetch a book by ISBN.
- **POST /api/books:** Create a new book.
- **PUT /api/books/:isbn:** Update a book.
- **DELETE /api/books/:isbn:** Delete a book.
- **POST /api/books/:isbn/reviews:** Add a review to a book.
- **GET /api/health:** Check server status.

Example Requests
- **POST /api/books:**
```
{
  "title": "The Cosmic Adventure",
  "author": "Jane Stellar",
  "isbn": "978-1-2345-6789-0",
  "publicationDate": "2023-05-15",
  "genre": "Science Fiction"
}
```
- **POST /api/books/978-1-2345-6789-0/reviews:**
```
{
  "reviewer": "Alex Star",
  "rating": 4,
  "comment": "A thrilling sci-fi ride!"
}
```
- **PUT /api/books/978-1-2345-6789-0:**
```
{
  "genre": "Space Opera"
}
```
---
## 📊 Project Status

Current Status: Complete (Task 3 MVP).
Version: 1.0.0
Last Updated: March 16, 2025
---
### ⚠️ Known Issues
- Caching: Redis integration is basic—needs refresh logic for updates.
- Validation: Limited input validation (e.g., rating range).
---
## 🔧 Future Enhancements
- **User Auth:** JWT-based login for personal book lists.
- **Frontend:** Build a UI to interact with the API.
- **Search:** Add query params for filtering books by genre/author.
- **Rate Limiting:** Protect endpoints from abuse.
---
## 🛠️ Contributing
- Fork this repo.
- Create a branch: git checkout -b feature/your-feature.
- Commit: git commit -m "Add cool stuff".
- Push: git push origin feature/your-feature.
- Open a Pull Request with details!
---
# 📞 Contact
**GitHub:** SureshBarach2001

**Email:** saink4831@gmail.com

---
## 🎨 Design Highlights
- **RESTful:** Clean, intuitive endpoint structure.
- **Scalable:** Ready for frontend integration or cloud deployment.

Happy reading and coding! 📚✨


---

### Notes:
- Replace `sureshbarach2001` and `saink4831@gmail.com` with your actual details.
- The README assumes dependencies like `Book.js` (Mongoose model) and `database.js`/`redis.js` configs exist—ensure they’re implemented as implied by your `server.js`.
- The LinkedIn post is vibrant and engaging, while the README is detailed for developers. Let me know if you need tweaks!
