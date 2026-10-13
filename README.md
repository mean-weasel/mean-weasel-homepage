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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Website inquiry delivery

The services form posts to `/api/inquiries`, which sends through Resend to
`jeremy@mean-weasel.com`. The visitor's address is set as Reply-To. It does not
subscribe visitors to a list or send them an automated email.

Copy `.env.example` to `.env.local` and configure `RESEND_API_KEY` and
`RESEND_FROM_EMAIL`. Use a sending-only Resend key restricted to the verified
sending domain. The From address must belong to that verified domain; it need
not be the receiving inbox. Set the same two server-only variables in the hosting
project and redeploy. Never put the key in a `NEXT_PUBLIC_` variable or commit it.

Missing configuration and provider errors return a real failure; entered values
remain in the form. Success means Resend accepted the message, not confirmation
that it reached the inbox. Inspect Resend delivery logs for delivery/bounce status.
Retries reuse a submission identifier to prevent duplicate sends after a timeout.
The form includes a honeypot and the endpoint checks origin, content type, input
lengths, and field values. Configure a hosting-level rate limit for this public
endpoint before public launch (for example, five POSTs per IP per ten minutes).

Local preview: `npm run dev -- --hostname 0.0.0.0 --port 3100`, then open
http://mean-weasel-homepage.127.0.0.1.nip.io:3100/services/web-design-phoenix.

Validation: `npm run verify` and `npm run test:gallery`. Tests mock provider
responses; they do not send real inquiry emails. To finish setup, confirm the
verified sender, configure the two variables, and send a clearly labeled test
inquiry to the owner's inbox.
