# silencer
A keyword Extractor Chrome Extension

## How to use

On a Nginx linux server, do following

* Clone this at somewhere
* `npm install`
* `pip install snownlp`
* `screen -R` Add a screen (if you do not have screen installed, install at first)
* `node app`

Then you should change the `public/popup.js` for the appropriate Nginx settings you've made.

The following great open projects are used in this repo, many thanks go there (ordered alphabetical):

[Bootstrap](https://github.com/twbs/bootstrap )

[jQuery](https://github.com/jquery/jquery )

[Nginx](https://github.com/nginx/nginx )

[snownlp](https://github.com/isnowfy/snownlp )

And the following npm packages:

body-parser;

cors;

express;

python-shell;

ronfe
