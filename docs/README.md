# Evia Ultimate Hotel Booking – Ethiopia

A comprehensive hotel booking platform tailored for the Ethiopian market, featuring:

- 🇪🇹 **Local payment integration**: Telebirr, CBE Birr, Chapa
- 🗣️ **Bilingual interface**: Amharic & English
- 🏨 **Hotel inventory & booking engine**
- 🚖 **Transport extensions** (future: Feres minibus, ride‑hailing)
- 🤖 **AI‑powered personal assistant** (future: EvaAI)
- 🔗 **Blockchain escrow & NFT experiences** (future)

Built with **Next.js 14**, **Node.js**, **PostgreSQL**, and **Redis**. Fully containerized with Docker.

---

## Quick Start

1. Clone the repository  
2. Copy `.env.example` to `.env` and fill in your secrets  
3. Run `docker-compose up -d` to start PostgreSQL and Redis  
4. Install backend dependencies and start the server:
   ```bash
   cd backend
   npm install
   npm run dev