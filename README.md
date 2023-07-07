# MIECO
Webpage for the Mozilla Innovations team at https://future.mozilla.org, the Mozilla Internet Ecosystem (MIECO), and the Mozilla Open Source AI Hub. It may be useful to know that the MIECO site came first and then this repo expanded to have both - the old heirarchy lingers in the docs and code in places.

## Getting Started

This project is a Static webpage with HTML, CSS and JS. We use [Webpack](https://webpack.js.org/) to bundle everything to the `dist/` folder. This project also uses [Nunjucks Templates](https://mozilla.github.io/nunjucks/) to enable the use of templating in this project. To convert Nunjucks templates to HTML, we use the [html-bundler-webpack-plugin](https://github.com/webdiscus/html-bundler-webpack-plugin).

## Installation
These instruction assume you have NodeJS installed.

To build MIECO from source and run the site locally, you can
clone the repo from GitHub:

```
git clone https://github.com/mozmeao/MIECO.git
npm install
```

Running `npm install` will install the NPM dependencies.

## Make it run

Build the site and start the web server with:

```
npm start
```

That will run the webpack dev server.

View the site at http://localhost:8000/mieco

## Build static HTML files

```
npm run build
```

The Webpack will output all HTML files to a folder called `dist`.

## Folder Hierarchy  

All Nunjucks files are either located in the `templates/` folder or the `pages/` folder.
The `templates/` folder contains base templates that can be `extended`, or partials, which can be `included` in the files in the `pages/` folder.

The `pages/` folder contains the Nunjucks files which will be compiled to HTML and used on the MIECO site.


## Deploy

Branches in the pull request queue will be given a demo server by Netlify. The bot will comment on the PR with the link.

The `main` branch is automatically deployed to the staging server https://main--future-mozilla.netlify.app/

To deploy to production push the main branch to the production branch.

```
git push origin main:prod
```
