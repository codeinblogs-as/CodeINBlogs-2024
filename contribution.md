
# Contributing

We would ❤️ you to contribute to the CodeINBlogs website and help make it better! We want contributing to CodeINBlogs to be fun, enjoyable, and educational for anyone and everyone. This document will walk you through the steps to complete your first contribution.

## Code of Conduct

Help us keep CodeINBlogs open and inclusive. Before interacting with the CodeINBlogs community, please read and follow our [Code of Conduct](https://github.com/codeinblogs-as/CodeINBlogs-2024/blob/main/CODE_OF_CONDUCT.md).

## Find an Issue

Looking for a place to start? Have a feature request or bug report? Start by searching through our [issues](https://github.com/codeinblogs-as/CodeINBlogs-2024/issues).

If you're looking for a good issue to start contributing, simple issues fit for first-time contributors will be labelled `good first issue`. More challenging issues might be labelled `help wanted`.

If you want to request features, improvements, or bug fixes, **search for existing issues first**. If you find a similar issue, comment and upvote the issue for visibility. If you cannot find similar issues, open a new issue. If the CodeINBlogs maintainers think the issue is appropriate for contribution, we'll mark it as `help wanted`.

## Fork and Clone

To contribute to the CodeINBlogs website, you need to fork, clone, and run the website.

Start by [forking the repository](https://github.com/codeinblogs-as/CodeINBlogs-2024/fork), which makes a copy of the repo on your GitHub profile. This allows you to make code changes when you don't have permissions in the main CodeINBlogs website repo.

Then, [clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository#cloning-a-repository).

Alternatively, you can develop the website repo in your browser using [Code Spaces](https://github.com/features/codespaces) or [GitPod](https://www.gitpod.io/#https://github.com/codeinblogs-as/CodeINBlogs-2024).

## Development

The CodeINBlogs website uses [NPM](https://docs.npmjs.com/about-npm). Start by following their [installation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) documentation.

Once you've cloned the CodeINBlogs website repo, run the following command to install dependencies:

```sh
npm i
```

Then, run the following command to start a development server.

```sh
npm run dev
```

Before committing your code changes, make sure the website repo builds by running:

```sh
npm run build
```

## Submit a Pull Request 🚀

The branch naming convention is as follows:

`TYPE-ISSUE_ID-DESCRIPTION`

Example:

```
doc-548-submit-a-pull-request-section-to-contribution-guide
```

When `TYPE` can be:

- **feat** - is a new feature
- **doc** - documentation only changes
- **fix** - a bug fix
- **refactor** - code change that neither fixes a bug nor adds a feature

**All PRs must include a commit message with a description of the changes made!**

A standard procedure for working on an issue would be to:

1. Start by forking the project and use the `git clone` command to download the repository to your computer.

```sh
git clone https://github.com/yourusername/CodeINBlogs-2024.git
```

2. Make your changes and commit them with clear and concise commit messages.

```sh
git add .
git commit -m "Description of the feature or bug fix"
git push origin main
```

3. Submit your changes for review by clicking on the `Compare & pull request` button in your forked repository on GitHub.
4. Start a Pull Request (PR) by clicking on `Create pull request`. Make sure to update the PR description following the template provided.
5. Wait for a code review.
6. After approval, your PR will be merged if it aligns with our project goals and passes our deployment checks.

## Documentation Style

When contributing to the CodeINBlogs docs, follow the guide in [STYLE.md](./STYLE.md). This ensures consistency and clarity in our documentation.



