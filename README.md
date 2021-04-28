## Instructions to run the app

Visit a deployed version of the app at https://air-quality.vercel.app/

or 

Run Locally

1. Make sure you have Node and NPM installed on your local machine.
2. CD to root directory of the app (where package.json is)
3. Install dependencies with `npm install` or `yarn`
4. Run app on a local dev server with `npm run dev`
5. Alternatively make a production buid with `npm run build`
6. Run the production build with `npm run start`
7. With prod build or development build the app will be running at http://localhost:3000
8. Run tests with `npm test`

Build app and output flat files that can be served in a CDN statically

1. In the root directory (where package.json is) run `npm run export`
2. The flat static files will be found in the folder `out`

## Results

Desktop Screenshot

<img width="1425" alt="Screenshot 2021-04-28 at 19 23 11" src="https://user-images.githubusercontent.com/46464571/116402996-3f25e000-a857-11eb-883d-824895f117eb.png">

Mobile Screenshot

<img width="155" alt="Screenshot 2021-04-28 at 19 23 25" src="https://user-images.githubusercontent.com/46464571/116403138-68df0700-a857-11eb-8162-8aa72a98094e.png">



Lighthouse Scores

<img width="1438" alt="Screenshot 2021-04-28 at 19 12 08" src="https://user-images.githubusercontent.com/46464571/116402836-1271c880-a857-11eb-830e-d07b8966af20.png">

Bundle sizes

<img width="1439" alt="Screenshot 2021-04-28 at 19 21 23" src="https://user-images.githubusercontent.com/46464571/116402880-1e5d8a80-a857-11eb-853a-33046c462636.png">












This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
 
## Generic instructions from Vercel

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
