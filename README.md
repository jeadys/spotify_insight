# Spotify Music Insights and Discovery

## Overview
This project aims to empower users with detailed insights into their Spotify usage to enhance their music discovery experience. By providing personalized profiles showcasing top genres, tracks, and artists, along with features like analysis, playlist generation, and recommendations, users can delve deeper into their music preferences and discover new content tailored to their tastes.

## Features
- **Personalized Profiles**: Users can access personalized profiles reflecting their music listening habits, including top genres, tracks, and artists.
- **Detailed Analysis**: Dive into comprehensive analysis of listening habits, including metrics like listening duration, frequency, and diversity.
- **Playlist Generation**: Generate custom playlists based on user preferences, top tracks, or selected genres.
- **Recommendations**: Receive personalized recommendations for new tracks and artists based on listening history and preferences.
- **Discovery**: Explore curated content and discover new tracks, artists, and genres beyond user preferences, enhancing the music exploration experience.

https://github.com/jeadys/spotify_insight/assets/107939865/72ed72b8-f9bb-4a5f-9f89-d00d10e744ca


Profile analysis          |  Playlist generator
:-------------------------:|:-------------------------:
![](https://github.com/jeadys/spotify_insight/assets/107939865/4577fed3-d335-4375-bd8c-d2a8d63377c4)  |  ![](https://github.com/jeadys/spotify_insight/assets/107939865/d5ff9471-9109-427f-b727-f2dfa9f7b4bf)


## Technologies Used
- Next.js: React framework for building server-side rendered web applications.
- Next-Auth: Authentication library for Next.js applications.
- TypeScript: Superset of JavaScript providing static typing and other advanced features.
- Tailwind CSS: Utility-first CSS framework for quickly building custom designs.
- Spotify API: Integration with the Spotify API for accessing user data and recommendations.

## Getting Started
### Prerequisites
- Node.js installed on your machine
- A Spotify Developer account to obtain API credentials

### Installation
1. Clone the repository:

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
