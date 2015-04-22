# silencer
A keyword Extractor Chrome Extension

## How it works

This extractor uses jQuery to send ajax POST request with current tab's urlto an Nginx powered server. The Nginx redirect the request to the node, and node simply passes the url into a python script which do the main processing logic, and return the result to the node. When the result is received, the callback function would be called to send response to the chrome extension.

## How to deploy

On a Nginx linux server, do following

* Clone this at somewhere
* `npm install`
* `pip install snownlp`
* Go to http://scipy.org/install.html and install scipy on your server
* `screen -R` Add a screen (if you do not have screen installed, install at first)
* `node app`

Then you should change the `public/popup.js` for the appropriate Nginx settings you've made.

The following great open projects are used in this repo, many thanks go there (ordered alphabetical):

[Bootstrap](https://github.com/twbs/bootstrap )

[jQuery](https://github.com/jquery/jquery )

[Nginx](https://github.com/nginx/nginx )

[SciPy](http://scipy.org )

[snownlp](https://github.com/isnowfy/snownlp )

And the following npm packages:

* body-parser;
* cors;
* express;
* python-shell;

ronfe
