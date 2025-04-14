# Readibly Frontend

The frontend application for Readibly, built with Next.js and TypeScript.

## Our team

Hackteunnn:

- Muhammad Fadhlan Karimuddin
- Muhammad Rizain Firdaus
- Stefanny Josefina Santono

## 🔗 Backend Repository
[Readibly/readibly-backend](https://github.com/Readibly/readibly-backend)

## Features

- PDF Reader with text-to-speech
- Speech-to-text functionality
- Learning Center with reading and typing exercises
- Mobile-responsive design (desktop-only functionality)

## Prerequisites

- Node.js 18.x or later
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/readibly-frontend.git
cd readibly-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

## Deployment

This application is deployed on Vercel. To deploy:

1. Push your changes to the main branch
2. Vercel will automatically deploy the changes
3. Set the following environment variables in Vercel:
   - `NEXT_PUBLIC_BACKEND_URL`: Your backend API URL

## Environment Variables

- `NEXT_PUBLIC_BACKEND_URL`: The URL of your backend API (required)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
