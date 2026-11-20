# RiverCityCyber Webpage
Trust me, I know this folder is named dev and is public. I incorrectly named it. But changes are made so frequently, and I dev everything locally before pushing it here, that this is my version of PROD. One day I'll rename it, I promise. 

## How to deploy locally
1. Download the files locally
2. Run a python server to serve the files
3. Navigate to http://localhost:8008/
4. Open your IDE/editor of choice
5. Start developing!
```bash
git clone https://github.com/RiverCityCyber/dev
cd dev
python3 -m http.server 8008
```

## Editing the header or footer
The shared header and footer live in `partials/`. After changing either one (or adding a new page under `html/`), run:
```bash
python3 tools/sync_layout.py           # stamp the header/footer into every page
python3 tools/sync_layout.py --check   # exit 1 if any page is out of date
```
A new page only needs `<!-- layout:header --><!-- /layout:header -->` and `<!-- layout:footer --><!-- /layout:footer -->` where the header and footer go.

## Drafts
Unfinished pages live in `drafts/`. They are not linked from the site and are served with `X-Robots-Tag: noindex`.

