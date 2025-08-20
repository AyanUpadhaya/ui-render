# ui-render

Django-style render() for React & Vite
Render components by path or name with props — no need for manual imports.

✨ Features

🎯 Render components dynamically with render(componentName, props)

⚡ Zero-config with Vite (import.meta.glob)

📦 Lightweight — no runtime overhead

🛠 Supports nested directories (shared/UserInfoCard)

✅ Works in both dev and production builds

📦 Installation
npm install ui-render
# or
yarn add ui-render
# or
pnpm add ui-render


This package requires React 18+ and Vite.

⚡ Quick Start Example

Create a Vite + React project

``` bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```


### Install ui-render

``` bash
npm install ui-render
```


-> Add lib/ui.ts

``` tsx
// src/lib/ui.ts
import { createRenderer } from "ui-render";

export const render = createRenderer({
  baseDir: "src/components", 
  viteModules: import.meta.glob("/src/components/**/*.tsx"),
});
```


-> Create components

``` tsx

// src/components/Hero.tsx
export default function Hero({ title }: { title: string }) {
  return <h1 className="text-3xl font-bold">{title}</h1>;
}

// src/components/About.tsx
export default function About() {
  return <p className="text-gray-600">This is the about section.</p>;
}

// src/components/shared/UserInfoCard.tsx
export default function UserInfoCard({ name, email }: { name: string; email: string }) {
  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold">{name}</h2>
      <p>{email}</p>
    </div>
  );
}


// Use in App.tsx

// src/App.tsx
import { render } from "@/lib/ui";

function App() {
  return (
    <div className="flex flex-col gap-4 p-6">
      {render("Hero", { title: "Hello World!" })}
      {render("About")}
      {render("shared/UserInfoCard", {
        name: "John Doe",
        email: "john@example.com",
      })}
    </div>
  );
}

export default App;

```

Run the app

``` bash
npm run dev
```


Open http://localhost:5173
 🚀


## ⚙️ API

### `createRenderer(options)`

| Option       | Type                                 | Required | Description                        |
| ------------ | ------------------------------------ | -------- | ---------------------------------- |
| `baseDir`    | `string`                              | ✅       | Root directory for components      |
| `viteModules`| `Record<string, () => Promise<any>>`  | ✅       | Import map from `import.meta.glob` |


Returns a render function:

render(componentName: string, props?: Record<string, any>): ReactNode


## 📁 File Naming Conventions

| File Location                         | Render Key               |
| ------------------------------------- | ----------------------- |
| `src/components/Hero.tsx`             | `"Hero"`                |
| `src/components/About.tsx`            | `"About"`               |
| `src/components/shared/UserInfoCard.tsx` | `"shared/UserInfoCard"` |


🛠 Next Version goals

 - Manifest support (non-Vite projects)

 - Next.js RSC support

 - Custom error fallback option
