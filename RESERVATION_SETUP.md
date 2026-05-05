# In-House Reservation Setup

## Environment Variables

- `DATABASE_URL` - Neon Postgres connection string.
- `RESEND_API_KEY` - Resend API key for email notifications.
- `RESERVATION_FROM_EMAIL` - Sender identity, e.g. `Baba Reservations <onboarding@resend.dev>`.
- `OWNER_EMAIL` - Restaurant owner inbox. Default in code: `sushanthp48@gmail.com`.
- `ADMIN_EMAIL` - Admin login email.
- `ADMIN_PASSWORD_HASH` - SHA256 hash of the admin password.
- `SESSION_SECRET` - Random long secret used for session signing.

## Generate Admin Password Hash

Use Node.js:

```bash
node -e "console.log(require('crypto').createHash('sha256').update('YOUR_ADMIN_PASSWORD').digest('hex'))"
```

## URLs

- Customer reservation form: `/contact.html#direct-reservation` and `/en/contact.html#direct-reservation`
- Admin dashboard: `/admin/`

## Notes

- Reservations are created as `pending` and can be updated from the admin dashboard.
- Closures created in admin are applied instantly to availability and booking APIs.
- Third-party reservation links remain available in existing pages.
