# mtsknn.fi

My little personal website / blog.
[**Visit it 👉**](https://mtsknn.fi/)

- 🎈 A static site, built on [Eleventy](https://www.11ty.dev/).
- ⚛ Layouts written with [Preact](https://preactjs.com/)
  and rendered to static HTML when the site is built
  (&rarr; zero runtime JavaScript from the layouts).
  - 🐶 Layouts were previously written with [Pug](https://pugjs.org/api/getting-started.html).
    See [PR #21: _Replace Pug with Preact_](https://github.com/mtsknn/mtsknn.fi/pull/21).
- 🌬 Styles written with [Tailwind CSS](https://v1.tailwindcss.com/).
  (Yelp, I'm still stuck on v1!)
- 💠 Running on [Netlify](https://www.netlify.com/) (for free!).
- 👐 Open source: MIT License.
  - ⚠ Content files (blog posts etc.) are not openly licensed.
    They are &copy; me and reside in a separate, private Git repo.
  - This project doesn't aim to be a generic template for Eleventy sites,
    but it's open so anyone can learn from it.
  - I'm not looking for pull requests,
    but please do
    [open an issue](https://github.com/mtsknn/mtsknn.fi/issues)
    if you found a bug or have questions or comments!

## Running locally

### If you are not me

1. Run `npm install` to install dependencies.
   - Version 14+ of [Node.js](https://nodejs.org/) is required
     because it's the minimum version that supports
     the [optional chaining operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining).
2. Run `git rm .gitmodules content/` and `git mv _sample-content/ content/`
   to use the sample content as a starting point.
3. Optional: run `git commit -m 'Setup initial content'`
   to commit the previous step's changes.
4. Run `npm start` and open <http://localhost:8080/>.

### If you are me

Hi me!

1. `npm install`
2. `git submodule update --init`
3. `cd content && git checkout master`
4. `cd .. && npm start`

The content that I have written is in a separate, private Git repo.
It's private so that I can store drafts and scheduled posts there
(and fix embarrassing typos and mistakes
without anyone having to know about them afterwards!).
Plus the content files are not openly licensed (they are &copy; me).

## Creating new content

- Blog posts: `content/blog/`
- Blog post drafts: `content/blog/drafts/`
- Top-level pages: `content/`
  \+ you probably want to update `utils/navItems.js`

## Folder structure

- 📂 `_sample-content/`:
  Sample content to get you started.
  See the ["Running locally" section](#running-locally)
  for how to use these files.
- 📂 `_site/`:
  Development/production build
  created by running `npm start`/`npm run build`.
- 📂 `.github/workflows/`
  - 📄 `main.yml`:
    Configures a GitHub Action
    that makes a daily Curl request to Netlify's build hook.
    This enables blog post scheduling.
    See my blog post
    [_How to trigger daily Netlify builds using GitHub Actions_](https://mtsknn.fi/blog/how-to-trigger-daily-netlify-builds-using-github-actions/).
- 📂 `assets/`
  - 📄 `css/main.css`:
    Processed by Tailwind
    when running `npm start` or `npm run build`.
    The result is outputted to the `_site/` folder.
  - 📄 `favicon/*`:
    The files are copied as-is to the `_site/` folder.
- 📂 `components/`:
  Preact components,
  used by layout files (which are also Preact components).
- 📂 `content/`:
  [Eleventy's input directory.](https://www.11ty.dev/docs/config/#input-directory)
  The default is the root folder,
  but having the input files (i.e. the content files) in their own folder
  makes things clearer.
- 📂 `data/`:
  [Eleventy's directory for global data files](https://www.11ty.dev/docs/config/#directory-for-global-data-files)
  (the default is `_data`).
  All files are [JavaScript data files](https://www.11ty.dev/docs/data-js/)
  and automatically available in content files (Markdown).
  Place stuff here instead of in `utils/`
  if you need the stuff in content files (Markdown).
- 📂 `eleventy/`:
  Eleventy's config files,
  required by the top-level config file (`.eleventy.js`).
- 📂 `layouts/`:
  [Eleventy's directory for includes](https://www.11ty.dev/docs/config/#directory-for-includes)
  (the default is `_includes`).
- 📂 `utils/`:
  Utils, helpers and such.
  Place stuff here instead of in `data/`
  if you don't need the stuff in content files (Markdown).
- 📄 `.eleventy.js`:
  [Eleventy's config file.](https://www.11ty.dev/docs/config/)
- 📄 `.eleventyignore`:
  [Eleventy's ignore file.](https://www.11ty.dev/docs/ignores/)
- 📄 `.env.example`:
  Example environment variables
  used to get most visited blog posts from [Plausible Analytics](https://plausible.io/).
  - If you don't use Plausible Analytics, you can ignore this file.
  - Otherwise you can copy and save this as `.env` to set local environment variables.
    You need to set the environment variables to Netlify too (or wherever you are hosting your site).
- 📄 `.gitmodules`:
  Specifies a Git submodule pointing to my private Git repo
  which contains all content.
  You don't need this
  unless you want to have a similar setup.
- 📄 `netlify-setup.sh`:
  A script needed in Netlify
  because the Git submodule points to a private Git repo.
  Blog post about this coming soon&trade;.
- 📄 `netlify.toml`:
  Build and redirection configurations for Netlify.

## Deploying to production (Netlify)

1. Run `npm run build`
2. ???
3. PROFIT!!

Heh,
that's how it quite much feels
since setting up the site on Netlify was so easy.
I don't even remember what I did
since Netlify did most of the job.

Just follow Netlify's good documentation and instructions.
Deploying to Netlify is easy.

If you are dealing with Git submodules (hi me!),
check out
[info about Git submodules on Netlify Docs](https://docs.netlify.com/configure-builds/repo-permissions-linking/#git-submodules).

## License

MIT &copy; Matias Kinnunen

Note that content files (blog posts etc.) are not openly licensed.
They reside in a separate, private Git repo.
