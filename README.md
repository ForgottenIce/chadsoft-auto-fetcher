# ChadSoft Auto Fetcher
This repository contains a GitHub workflow that automatically fetches the five latest CT runs from the [ChadSoft API (index.json)](https://tt.chadsoft.co.uk/index.json) every 24 hours.

The data about the runs are stored in a JSON file and automatically committed to the [gh-pages](https://github.com/ForgottenIce/chadsoft-auto-fetcher/tree/gh-pages) branch.

## Link to deployed GitHub pages
https://forgottenice.github.io/chadsoft-auto-fetcher/

## How it works
The workflow found in [.github/workflows/commit-latest-top-five.yaml](https://github.com/ForgottenIce/chadsoft-auto-fetcher/blob/main/.github/workflows/commit-latest-top-five.yaml) is scheduled to run every day at 12:00 PM UTC.

The workflow does the following:
1. It checks out on the main branch with `actions/checkout@v3`.
2. It sets up a Node.js instance with `actions/setup-node@v3`.
3. It executes the [fetch-chadsoft.js](https://github.com/ForgottenIce/chadsoft-auto-fetcher/blob/main/fetch-chadsoft.js) script, which outputs a JSON file named `recentRuns.json`.
4. It stashes the `recentRuns.json` file with `git stash`.
5. It checks out on the gh-pages branch with `actions/checkout@v3`.
6. It applies the stashed `recentRuns.json` file with `git stash apply`.
7. Since a merge conflict happens, it forces the stash anyways using `git checkout --theirs recentRuns.json`.
8. It commits the updated `recentRuns.json` and pushes it to the gh-pages branch.

GitHub registers that the gh-pages branch has been updated and automatically deploys the changes.
