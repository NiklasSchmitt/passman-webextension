# Contribute to code
If you want to contribute make sure the commits are `verified`!
You can read how to GPG sign you commits [here](https://help.github.com/articles/signing-commits-using-gpg/).


# Tools used
[Bourbon](https://www.bourbon.io/): Sass->css framework
[Grunt](https://gruntjs.com/): Automation tool to compile/test/deploy


# Build process
It's required to build the web extension multiple times for all supported browsers:
- Run `grunt build-ff` to create a .zip of the web extension with all changes that are needed for Firefox.
- Run `grunt build-chrome` to create a .zip of the web extension with all changes that are needed for Google Chrome.


# Tips
Compile scss to scc: `grunt watch`