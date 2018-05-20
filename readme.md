# pema

Customizable person management app

[https://pema.ml](https://pema.ml)

## Usage

1. Fork this repo.
2. Clone the repo to your computer.
3. Register your domain at [Freenom](http://www.freenom.com/en/index.html?lang=en).
4. Create `A` records in [Freenom](https://my.freenom.com/clientarea.php?action=domains&language=english) to point your domain to the [GitHub IP](https://help.github.com/articles/setting-up-an-apex-domain/#configuring-a-records-with-your-dns-provider)s.
5. Update your domain in `docs/CNAME`.
6. Create a new [Airtable](https://airtable.com/) base with any name.
7. Open your base and change your table name from `Table 1` to `persons`.
8. Add your columns however you like and make sure you have at least one row with all columns filled.
9. Generate a new API key in your [Airtable - Account](https://airtable.com/account) page.
10. Select your base in [Airtable - API](https://airtable.com/api) and get your base ID from URL. (https://airtable.com/{this-is-your-base-id}/api/docs)
11. Update your Airtable API key and base ID in `src/js/airtable.js`.
12. Install dependencies with `yarn install` or `npm install`.
13. Build the app with `yarn build` or `npm run build`.
14. Push your code to the GitHub.
15. It's ready.
