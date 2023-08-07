const fs = require('fs');
let marked = require('marked');
let args = process.argv.slice(2);

md_filename = args[0]
console.log("Generating sidebar for " + md_filename)
// generate url from filename, assume the url request-uri is the name of the final folder the file is in
split_filename = md_filename.split('/')
url = "/"+split_filename[split_filename.length - 2]
console.log("For URL (from path): "+url)

function get_markdown(filename) {
    return fs.readFileSync(filename, 'utf8');
}

function generate_id(title) {
    return title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
}

let tokens = marked.lexer(get_markdown(args[0]));
let headers = tokens.filter(t => t.type == 'heading')
// console.log(JSON.stringify(headers, null, 2));

mapped = headers.map(h => [
    h.depth,
    h.text,
    generate_id(h.text)
]);

// console.log(JSON.stringify(mapped, null, 2));

let html = "<li>"
html += mapped.map(h => {
    if (h[0] == 2) {
        return `<details closed>
            <summary>
                <a href="${url}">${h[1]}</a>
            </summary>
        <ul class='sub_menu'>`;
    } else if (h[0] == 4) {
        return `<li><a href="${url}#${h[2]}">${h[1]}</a></li>`;
    }
}).join('\n');   
html+="</ul></details></li>"

console.log(html)


