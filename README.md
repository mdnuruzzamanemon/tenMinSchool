# 10 Minute School Product Page

This project is a professional, modular, and component-based product page for 10 Minute School, built with Next.js, utilizing Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR).

## Live Demo

[View the live demo](https://github.com/mdnuruzzamanemon/tenMinSchool)

## Features

- Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR)
- Responsive design for all device sizes
- Component-based architecture
- Interactive UI elements with smooth animations
- Dynamic data fetching from API
- Tailwind CSS for styling

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mdnuruzzamanemon/tenMinSchool.git
   ```

2. Navigate to the project directory:
   ```bash
   cd tenMinSchool/product-page
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To create a production build:
```bash
npm run build
```

To start the production server:
```bash
npm start
```

## Project Structure

```
product-page/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app directory
│   ├── components/      # React components
│   │   ├── layout/      # Layout components (Header, Footer)
│   │   ├── product-page/ # Product page specific components
│   │   └── ui/          # Reusable UI components
│   └── services/        # API services
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Swiper.js (for carousels)

## License

This project is licensed under the MIT License.

## Acknowledgements

- [10 Minute School](https://10minuteschool.com/) for the inspiration
- All the contributors who have helped with the development 