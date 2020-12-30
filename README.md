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

## Creating blog posts

Create blog posts to `content/blog/`,
e.g. `content/blog/my-first-post.md`.

- You can use `content/blog/_template.md`
  as a reference / starting point.
- Blog posts under `content/blog/drafts/` are drafts.
  They are visible locally (`npm start`),
  but left out of the production build (`npm run build`).

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
