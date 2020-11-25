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
2. Run `npm start` and open <http://localhost:8080/>.
3. Create blog posts to `content/blog/`,
   e.g. `content/blog/my-first-post.md`.
   - You can use `content/_blog-post-template.md` as a reference;
     it tells you what front matter variables to use.
   - If your post contains images or other embeddable files,
     create a folder for the post
     and name the Markdown file as `index.md`,
     e.g. `content/blog/my-first-post/index.md`.
     Then you can
     [include images as you normally do in Markdown](https://mtsknn.fi/blog/how-to-remember-markdowns-link-syntax/#btw-images),
     e.g. `![alt text](./my-image.png)`.
   - Blog posts under `content/blog/drafts/` are drafts.
     They are visible only locally (`npm start`),
     i.e. they are left out of the production build (`npm run build`).

If you are me,
you can also run `git submodule update --init` &ndash;
the blog posts that I have written
are in a separate, private Git repo.
It's private so that I can store draft and scheduled posts there
(and fix embarrassing typos and mistakes
without anyone having to know about them afterwards).

If you are not me,
you have to create your own posts. :-)
You might then be interested in this Stack Overflow post:
[How do I remove a [Git] submodule?](https://stackoverflow.com/q/1260748)

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
but I wouldn't mind that.)

If you are dealing with Git submodules (hi me!),
check out
[info about Git submodules on Netlify Docs](https://docs.netlify.com/configure-builds/repo-permissions-linking/#git-submodules).
