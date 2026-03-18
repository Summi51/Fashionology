# Fashionology

A simple e-commerce demo project (backend + React frontend) for managing products, users and carts.

**Deployment**
- **Backend:** https://fashionology-omega.vercel.app/
- **Frontend:** https://frontend-mu-nine-t0qqyaa5jc.vercel.app/

**Quick Start**

- **Backend:**
	- **Install:** `cd backend` && `npm install`
	- **Env:** create a `.env` file in `backend/` with:
		- `mongoURL=<your-mongodb-connection-string>`
	- **Run (dev):** `npm run server` (uses `nodemon index.js`)
	- **Run (prod):** `node index.js`

- **Frontend:**
	- **Install:** `cd frontend` && `npm install`
	- **Run (dev):** `npm start`
	- Add the frontend deployment URL above when ready.

**Tech Stack**
- Backend: Node.js, Express, Mongoose
- Frontend: React, Redux

**Project Structure (top-level)**
- `backend/` - Express API server and models
- `frontend/` - React app and components

**Important env vars**
- Backend: `mongoURL` (used in `backend/configs/db.js`)

**Notes**
- The backend listens on port `8080` (see `backend/index.js`).
- API base routes: `/users`, `/products`, `/cart` (see `backend/routes`).

If you'd like, I can add example API endpoints, Postman collection, or fill in the frontend deployment URL for you.
