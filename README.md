# [mtsknn.fi](https://mtsknn.fi/)

My blog,
powered by [11ty](https://www.11ty.dev/)
and running on [Netlify](https://www.netlify.com/).

More documentation and features coming soon&trade;.

## Running locally

1. Run `npm install` and `npm start` and open <http://localhost:8080/>.
   - Version 14+ of Node.js is required
     because it's the minimum version that supports
     the [optional chaining operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining).
2. Add blog posts to `content/blog/posts/`.
   - You can use the `_template.md` file as a reference;
     it tells you what front matter variables to use.

If you are me,
you can also run `git submodule init`.
If you are not me,
you have to create your own posts. :-)

The blog posts that I have written
are in a separate, private Git repo.
It's private so that I can store draft and scheduled posts there
(and fix embarrassing typos and mistakes
without anyone having to know about them afterwards).

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
