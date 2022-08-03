# Spotify Insight

Get more insight on your Spotify usage and discover new tracks & artists.

## Made with

- NextJS
- Next-Auth
- React-Query
- Typescript
- TailwindCSS

## Install

```
$ git clone https://github.com/jeadys/spotify_insight
$ cd spotify_insight
$ npm install
```

## Setup

1. [Register a Spotify App](https://developer.spotify.com/dashboard/applications) and add `http://localhost:3000/api/auth/callback/spotify` as a Redirect URI in the app settings.
2. Create an `.env` file in the root of the project based on `.env.example`

```
NEXT_PUBLIC_CLIENT_ID=XXX
NEXT_PUBLIC_CLIENT_SECRET=XXX
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=XXX
```

- `NEXT_PUBLIC_CLIENT` & `NEXT_PUBLIC_CLIENT_SECRET` can be found in the app settings of your [Spotify App](https://developer.spotify.com/dashboard/applications).
- `NEXTAUTH_URL` is your domain.
- `NEXTAUTH_SECRET` can be generated with the following command in your terminal.

```
$ openssl rand -base64 32
```
