This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Important Notes for Next.js 15

### Params as Promise in App Router

In Next.js 15, the `params` object in App Router pages is now a Promise that needs to be awaited. This is a breaking change from previous versions where `params` was a synchronous object.

When working with dynamic route pages:

1. Define the params type as a Promise:
   ```typescript
   interface PageProps {
     params: Promise<{ id: string }>;
     searchParams?: Record<string, string | string[] | undefined>;
   }
   ```

2. Use `await` to access params in your component:
   ```typescript
   export default async function Page({ params }: PageProps) {
     const { id } = await params;
     // ...rest of your component
   }
   ```

3. For convenience, you can use the type definitions in `types/next.d.ts`:
   ```typescript
   import { PageProps } from '../types/next';
   
   type ProductParams = {
     id: string;
   };
   
   export default async function ProductPage({ params }: PageProps<ProductParams>) {
     const { id } = await params;
     // ...
   }
   ```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
"# jinyi-app"
