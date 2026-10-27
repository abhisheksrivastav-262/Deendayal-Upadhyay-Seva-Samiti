# Deendayal Upadhyay Seva Samiti website

A lightweight, responsive Hindi-first organization website. The supplied logo is preserved at `public/images/organization-logo.png`. All public content uses only the organization facts supplied with the brief; activity topics are labeled as areas of interest, not completed work.

## Run locally

Requires Node.js 18 or later; no package installation is needed.

```sh
npm run dev
```

Open http://localhost:3000. Set `PORT` to change the local port. Set `SITE_URL` to the canonical production origin before publishing so sitemap and robots output use the production domain.

## Forms

Contact and volunteer forms validate required fields in the browser and explicitly tell visitors that submission is not available. No form information is transmitted or stored. The server returns HTTP 503 for `/api/*` until an approved submission backend is implemented. Before enabling submissions, connect a secure endpoint with server-side validation, consent handling, spam controls, access restrictions, retention/deletion rules, and an appropriate privacy notice. Do not tell visitors that their form was received until the endpoint confirms it.

## Before production

- Set `SITE_URL` to the verified canonical domain.
- Review the privacy policy and terms with the organization and legal counsel; fill the review date and any applicable legal details.
- Confirm any future activities, program details, real event photographs, and contact information before publishing them.
- Google Fonts are an optional enhancement; system font fallbacks remain available if the font host cannot be reached.

## Illustrative photography

The activity tiles and gallery use locally stored Unsplash images as representative stock photography. Captions identify them as illustrations; none are presented as events run by the Samiti. Sources and creators:

- Community photo — [Rohit Dey](https://unsplash.com/photos/group-of-women-and-children-in-a-rural-village-setting-eUvkh_78f98)
- Classroom photo — [Haseeb Modi](https://unsplash.com/photos/a-group-of-children-sitting-at-desks-in-a-classroom-OcDJhBm8Jnc)
- Plant photo — [Kasturi Laxmi Mohit](https://unsplash.com/photos/person-holding-green-leaf-plant-uv6lUONd19w)
- Clean-up photo — [Vitaly Gariev](https://unsplash.com/photos/volunteers-cleaning-up-litter-in-a-forest-setting-SL4NGT-XP1I)
- Clinic photo — [Adhitya Sibikumar](https://unsplash.com/photos/two-women-sitting-outside-a-clinic-entrance-UoemfTGzD7g)
