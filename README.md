# Recaplee
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Recaplee is a web application designed to monitor changes in competitors' pages for a specific keyword. It provides users with valuable insights into their competitors' activities.

## Features

- Login/Signup via Email: Default form for user authentication.
- Homepage: Currently empty, requires further development.
- Tool Homepage: Displays monitored queries and updates.
- Tool - Query Summary: Provides a summary of a selected query's data.
- Tool - Competitor Analysis: Shows content differences between versions.
- Tool - Add Query: Allows users to add new target queries.

## APIs Used

- ValueSERP: Retrieves SERP results.
- Data4SEO OnPage Endpoint: Retrieves web page content.
- Stripe API: Manages subscriptions and user limits.

## Header

The header includes the logo, page name, usage statistics, subscription button, and logout button. In the mobile version, the page name is hidden, and statistics disappear on scroll.

## Contact and Notification

Users can enable or disable email notifications for new changes detected every three days.

## Additional Information

- Three subscription plans are managed using Stripe Subscription.
- DataforSEO on-page results are mapped into an ordered list of headers and paragraphs.
- Users can receive email reports on new changes for each query.

## Technology

The project is built using the following technologies:

- Frontend: NextJs, TailwindCss, typescript
- Backend: Supabase, Prisma, Stripe 

## Installation

1. Clone the repository: `git clone https://github.com/username/Recaplee.git`
2. Install dependencies: yarn install
3. Configure API keys: 

To run the project correctly, you need to set up the following environment variables:

| Variable                    | Description                                      |
| --------------------------- | ------------------------------------------------ |
| NEXTAUTH_URL                | The URL of the NextAuth.js application           |
| NEXTAUTH_SECRET             | Secret key for NextAuth.js                       |
| NEXT_PUBLIC_SUPABASE_URL    | Supabase URL                                     |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anonymous key                          |
| NEXT_PUBLIC_VALUESERP_KEY   | ValueSERP API key                                |
| DATABASE_URL                | Postgres database URL                            |
| GOOGLE_CLIENT_ID            | Google OAuth client ID                           |
| GOOGLE_CLIENT_SECRET        | Google OAuth client secret                       |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | Stripe publishable key                   |
| STRIPE_SECRET_KEY           | Stripe secret key                                |
| NEXT_PUBLIC_BASE_URL        | Base URL of the application                      |
| STRIPE_WEBHOOK_SECRET       | Stripe webhook secret                            |
| MJ_APIKEY_PUBLIC            | Mailjet public API key                           |
| MJ_APIKEY_PRIVATE           | Mailjet private API key                          |
| SECRET_KEY                  | Secret key for the diff checker route             |
| MJ_SENDER                   | Sender email address for Mailjet                  |
| MJ_SENDER_NAME              | Sender name for Mailjet                          |

Make sure to assign appropriate values to these environment variables before running the project.
4. Run the application: yarn dev or yarn start

**File:** create_trigger_handle_new_user.sql

```sql
-- Function to handle new user creation
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to execute the handle_new_user function
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

To create the trigger for handling new user creation in your Supabase project:

1. Open your Supabase project.
2. Connect to the database using a PostgreSQL client.
3. Execute the SQL queries above in the given order.

These queries will create a function called `handle_new_user` and a trigger called `on_auth_user_created`. The function inserts a new row into the `public.profiles` table with the `id` and `email` values from the newly inserted row in the `auth.users` table. The trigger ensures that the `handle_new_user` function is executed automatically after each insertion into the `auth.users` table.
## Contribution

We welcome contributions to improve Recaplee. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add a feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request.

## License

Recaplee is licensed under the [MIT License](LICENSE).

## Contact



For questions or suggestions, please reach out to us at [moosathebutt@gmail.com](mailto:moosathebutt@gmail.com).

---

