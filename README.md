# [mtsknn.fi](https://mtsknn.fi/)

My blog,
powered by [11ty](https://www.11ty.dev/)
and running on [Netlify](https://www.netlify.com/).

More documentation and features coming soon&trade;.

## Running locally

1. Run `npm install` to install dependencies.
   - Version 14+ of [Node.js](https://nodejs.org/) is required
     because it's the minimum version that supports
     the [optional chaining operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining).
2. Run `git rm .gitmodules content/` and `git mv _sample-content/ content/`
   to use the sample content as a starting point.
3. Optional: run `git commit -m 'Setup initial content'`.
4. Run `npm start` and open <http://localhost:8080/>.

If you are me,
in step 2 you can instead run `git submodule update --init`.
The content that I have written
is in a separate, private Git repo.
It's private so that I can store drafts and scheduled posts there
(and fix embarrassing typos and mistakes
without anyone having to know about them afterwards).

## Creating new content

- Blog posts: `content/blog/`
- Blog post drafts: `content/blog/drafts/`
- Top-level pages: `content/`
  \+ you probably want to update `data/navItems.js`

### `npm run new`

Creates a new draft with the given title.
Uses `_template.md` as the starting point.

Usage:

```bash
# Leave backticks out (or escape them)
npm run new post "Title of the blog post"

# Created draft:
# C:\...\mtsknn.fi\content\blog\drafts\title-of-the-blog-post.md
```

### `npm run slugify`

Slugifies the given title
and copies it to the clipboard (:warning:).

Usage:

```bash
# Leave backticks out (or escape them)
npm run slugify "Title of the blog post"

# Slugified title (copied to the clipboard):
# title-of-the-blog-post
```

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
    which makes a daily Curl request to Netlify's build hook.
    This enables blog post scheduling.
- 📂 `assets/`
  - 📄 `css/main.css`:
    Processed by Tailwind
    when running `npm start` or `npm run build`.
    The result is outputted to the `_site/` folder.
  - 📄 `favicon/*`:
    The files are copied as-is to the `_site/` folder.
- 📂 `content/`:
  [11ty's input directory.](https://www.11ty.dev/docs/config/#input-directory)
  The default is the root folder,
  but having the input files (i.e. the content files) in their own folder
  makes things clearer.
- 📂 `data/`:
  [11ty's directory for global data files](https://www.11ty.dev/docs/config/#directory-for-global-data-files)
  (the default is `_data`).
  All files are [JavaScript data files](https://www.11ty.dev/docs/data-js/)
  and automatically available in layouts.
- 📂 `layouts/`:
  [11ty's directory for includes](https://www.11ty.dev/docs/config/#directory-for-includes)
  (the default is `_includes`).
- 📂 `scripts/`:
  Node scripts for [creating new content](#creating-new-content).
- 📂 `transforms/`:
  [11ty transforms](https://www.11ty.dev/docs/config/#transforms)
  that modify the output files built from the files in `content/`.
- 📄 `.eleventy.js`:
  [11ty's config file.](https://www.11ty.dev/docs/config/)
- 📄 `.eleventyignore`:
  [11ty's ignore file.](https://www.11ty.dev/docs/ignores/)
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
(This is not a paid endorsement,
but it could very well be.
I'm looking at you, Netlify!)

But seriously:
just follow Netlify's good documentation and instructions.
Deploying to Netlify is easy.

If you are dealing with Git submodules (hi me!),
check out
[info about Git submodules on Netlify Docs](https://docs.netlify.com/configure-builds/repo-permissions-linking/#git-submodules).
