# Portfolio Next.js App

[![GitHub Repo](https://img.shields.io/badge/GitHub-d3sf%2Fportfolio-blue?logo=github)](https://github.com/d3sf/portfolio)

A modern, full-stack portfolio web application built with **Next.js**, **Prisma**, **Tailwind CSS**, and an integrated **Admin Dashboard** for easy content management. Showcase your projects, skills, experience, education, and more—all fully customizable.

---

## 🚀 Project Overview

This portfolio app is designed for developers and professionals to present their work, skills, and background. It features a beautiful, responsive UI, dynamic content management via an admin dashboard, and a robust backend powered by Prisma and PostgreSQL.

---

## ✨ Features

- **Modern Portfolio Website**: Home, About, Projects, Skills, Experience, Education, and Quotes sections.
- **Admin Dashboard**: Secure dashboard to manage all portfolio content (projects, skills, experience, education, quotes, profile, and site settings).
- **Authentication**: Admin login for secure content management.
- **Database Integration**: Uses Prisma ORM with PostgreSQL for structured, scalable data.
- **Image Uploads**: Cloudinary integration for project and profile images.
- **Responsive Design**: Mobile-friendly and accessible UI with Tailwind CSS.
- **Dark Mode**: Theme switching support.
- **Animations**: Smooth transitions and animated UI elements.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/)
- **Backend**: [Next.js API Routes], [Prisma ORM](https://www.prisma.io/), [PostgreSQL]
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)
- **Other**: TypeScript, Framer Motion, Lucide Icons, ESLint

---

## 📦 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/d3sf/portfolio.git
cd portfolio-next
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and set the following variables:
```env
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up the Database
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run the Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view your portfolio.

---

## 🧑‍💻 Usage
- **Public Site**: Home, About, Projects, Skills, Experience, Education, and Quotes are visible to all visitors.
- **Admin Dashboard**: Go to `/admin` to log in and manage your content. (Default admin user setup required in the database.)
- **Content Management**: Add, edit, or delete projects, skills, experience, education, quotes, and profile info from the dashboard.

---

## 📁 Project Structure
```
portfolio-next/
├── src/
│   ├── app/           # Next.js app directory (pages, layouts, API routes)
│   ├── components/    # Reusable UI components
│   ├── lib/           # API utilities, types
│   ├── types/         # TypeScript types
│   └── ...
├── prisma/            # Prisma schema and migrations
├── public/            # Static assets
├── scripts/           # Utility scripts
├── next.config.ts     # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
├── package.json       # Project metadata and scripts
└── ...
```

---

## 🗄️ Database Models (Prisma)
- **Project**: title, description, image, links, skills, featured, order
- **Skill / GeneralSkill**: name, icon, level, order
- **Profile**: name, title, bio, avatar, social links, resume, calendar link
- **Experience**: title, company, location, dates, description, skills, order
- **Education**: institution, degree, field, dates, description, achievements, order
- **Quote**: text, author, order
- **User**: email, password, role
- **SiteSettings**: title, description, keywords, dark mode, animations

---

## 🎨 Customization
- Update your profile, projects, and other content via the admin dashboard.
- Change site settings (title, description, theme) in the dashboard.
- Customize styles in `tailwind.config.js` and `globals.css`.

---

## 🤝 Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

## 📄 License
[MIT](LICENSE)

---

## 📬 Contact
**Author:** Deep Patel  
For questions or support, please open an issue or contact the project maintainer.
