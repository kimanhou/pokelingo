# Pokelingo

A tool to learn Japanese Pokemon names.

## Development

### CD Pipeline

Every branch is linked to its own environment hosted on Github Pages, build and deployment happens on every commit.

The master branch is hosted on the main environment at https://kimanhou.github.io/pokelingo/

Every other branch except `gh-pages`, is hosted under https://kimanhou.github.io/pokelingo/branch/$BRANCH_NAME where `$BRANCH_NAME` is the name of the branch.

E.g. for a working branch named `feature/googly-eyes`, the project will be automatically built and deployed on every commit at https://kimanhou.github.io/pokelingo/branch/feature/googly-eyes
