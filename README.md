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

Then install the Python dependencies:

```
pip install -r requirements.txt
```

Once you install all of the dependencies you can run this command to view the site at http://localhost:8000/mieco:

```
npm run start
```

That will run both the Jinja build and the webpack dev server. When a Jinja template is changed, it will rerun the `build.py` script.

## Folder Hierarchy  

All Jinja files are either located in the `templates/` folder or the `pages/` folder.
The `templates/` folder contains base templates that can be `extended`, or partials, which can be `included` in the files in the `pages/` folder.

The `pages/` folder contains the Jinja files which will be compiled to HTML and used on the MIECO site. The Python script will output all HTML files to a folder called `html_output`.


