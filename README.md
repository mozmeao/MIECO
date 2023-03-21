# MIECO
Webpage for the Mozilla Innovations team at https://future.mozilla.org and the Mozilla Internet Ecosystem (MIECO).

## Getting Started

This project is a Static webpage with HTML, CSS and JS. We use [Webpack](https://webpack.js.org/) to bundle everything to the `dist/` folder. This project also uses [Jinja Templates](https://jinja.palletsprojects.com/en/3.1.x/) to enable the use of templating in this project. To convert Jinja templates to HTML, we use a Python script.

## Installation
These instruction assume you have Python, pip and NodeJS installed.

To build MIECO from source and run the site locally, you can
clone the repo from GitHub:

```
git clone https://github.com/mozmeao/MIECO.git
npm install
```

Running `npm install` will install the NPM dependencies.

Create a virtual environment and install install the Python dependencies:

```
python -m venv venv
pip install -r requirements.txt
```

## Make it run

The install steps will leave you at a `venv` prompt ready to run npm. If you don't have the `venv` prompt start the virtual environment with:

```
source venv/bin/activate
```

Build the site and start the web server with:

```
npm run start
```

That will run both the Jinja build and the webpack dev server. When a Jinja template is changed, it will rerun the `build.py` script.

View the site at http://localhost:8000/mieco

## Folder Hierarchy  

All Jinja files are either located in the `templates/` folder or the `pages/` folder.
The `templates/` folder contains base templates that can be `extended`, or partials, which can be `included` in the files in the `pages/` folder.

The `pages/` folder contains the Jinja files which will be compiled to HTML and used on the MIECO site. The Python script will output all HTML files to a folder called `html_output`.


## Deploy

Branches in the pull request queue will be given a demo server by Netlify. The bot will comment on the PR with the link.

The `main` branch is automatically deployed to the staging server https://future-mozilla.netlify.app/

To deploy to production push the main branch to the production branch.

```
git push origin main:prod
```