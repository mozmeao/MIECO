#!/usr/bin/env python
import sys
from pathlib import Path

from jinja2 import Environment, FileSystemLoader


env = Environment(loader=FileSystemLoader(["pages", "templates"]), autoescape=True)
PAGES_PATH = Path("pages")
OUTPUT_PATH = Path("dist")


def get_output_path(page_path):
    out_path = page_path
    if page_path.name != "index.html":
        out_path = Path(f"{page_path.stem}/index.html")
    
    return OUTPUT_PATH.joinpath(out_path)


def get_page_url(page_path):
    """Returns the URL for the template"""
    if page_path.name == "index.html":
        if str(page_path) == "index.html":
            # root page
            return "/"

        return f"/{page_path.parent}/"

    return f"/{page_path.stem}/"

    
def render_page(page_path):
    """Renders a page template and writes it to an output file"""
    page = env.get_template(str(page_path))
    out_path = get_output_path(page_path)
    out_path.parent.mkdir(exist_ok=True, parents=True)
    out_path.write_text(page.render(page_url=get_page_url(page_path)))
    print(f"- {out_path}")


def render_pages():
    """Renders all templates in the pages directory"""
    print("Writing files:")
    for page_path in PAGES_PATH.rglob("*.html"):
        render_page(page_path.relative_to(PAGES_PATH))


def clean_output_path():
    OUTPUT_PATH.mkdir(exist_ok=True)
    for p in OUTPUT_PATH.rglob("*.html"):
        p.unlink()


def main(argv):
    """Kicks out the jams"""
    clean_output_path()
    render_pages()


if __name__ == "__main__":
    main(sys.argv)
