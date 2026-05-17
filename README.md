# Tidlo.

> A meticulously engineered, design-obsessed real-time communication platform. Built for the modern web.

Tidlo isn’t just another chat application. It is a highly optimized, full-stack ecosystem built on the MERN stack with a relentless focus on **zero-latency real-time interactions** and **uncompromising UI aesthetics**. Inspired by the fluid, glassmorphic design language of modern Apple interfaces, Tidlo delivers a premium experience out of the box.

---

## ✦ Architecture & DX

We believe great products start with a great developer experience. Tidlo's architecture is decoupled, scalable, and built using industry-standard patterns.

- **Real-time Engine**: Powered by a robust `Socket.io` implementation for sub-millisecond bidirectional event handling.
- **State Architecture**: Transitioned away from boilerplate-heavy Redux to the lean, atomic state management of `Zustand`.
- **UI & Styling**: Utility-first CSS via `TailwindCSS` augmented by `DaisyUI`, wrapped in a custom glassmorphic design token system.
- **Security**: Stateless JWT-based authentication model with cryptographically secure cookie handling.

## ✦ Core Capabilities

- **Fluid Real-time Messaging**: Instant, reliable message delivery with optimistic UI updates and real-time presence indicators.
- **Social Graph (Friend Management)**: A fully realized relationship management system to send, accept, and reject connection requests seamlessly.
- **Media Optimization**: Integrated directly with `Cloudinary` for on-the-fly image compression, cropping, and lightning-fast CDN delivery.
- **Obsessive Design**: Typography driven by `Moirai One`, meticulously crafted border radii, blur backdrops, and harmonic spacing scales.

---

## ✦ Getting Started

Designed to run locally with zero friction.

### 1. Prerequisites
Ensure your environment meets the following specifications:
- `Node.js` (v18+ recommended)
- `npm` or `yarn`

### 2. Environment Configuration
Create a `.env` file at the root of the `backend` workspace.

```env
# Infrastructure
PORT=5001
MONGODB_URI=<your_mongodb_cluster_url>

# Security
JWT_SECRET=<cryptographically_secure_string>
NODE_ENV=development

# Media CDN (Cloudinary)
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
```

### 3. Build & Initialize

Bootstrapping the entire monorepo is handled by a single unified script.

```bash
# Clone the repository
git clone https://github.com/KaifMansoori/tidlo-chat.git
cd tidlo-chat

# Install dependencies and compile the Vite frontend
npm run build

# Ignite the backend server
npm start
```

---

## ✦ Philosophy

We build software that feels inevitable. Tidlo is the result of stripping away the unnecessary, optimizing the critical paths, and obsessing over the micro-interactions.

Contributions are heavily encouraged for those who share our ethos for clean code and beautiful interfaces.

## ✦ License
ISC License.
