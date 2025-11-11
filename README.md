

## Quick Setup

### Prerequisites
- Node.js (v14+)
- MongoDB running locally or MongoDB Atlas account

### Installation

**1. Backend**
```bash
cd backend
npm install
cp .env.example .env  # Add your MONGO_URI
npm run dev
```

**2. Frontend**
```bash
cd frontend
npm install
npm run dev
```

### Important
⚠️ Backend **must** run on port **5000** (configured in `.env`)

### Environment Variables

Create `backend/.env`:
```env
MONGO_URI=mongodb://localhost:27017/your-database
PORT=5000
```

## Usage

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

---

That's it! 🚀