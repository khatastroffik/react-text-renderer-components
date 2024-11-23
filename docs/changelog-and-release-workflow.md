# Changelog and release workflow

## Changelog vs. Release Note

Both terms _changelog_ and _release note_ are usually considered equivalent. Defining their correct usage is mostly a "point-of-view" matter: no winner here!

### What's inside, then?

To cut a long story short: both are listing changes made to the repository (not considering the arguable form of the contained information).

Semantically speaking, you may consider to:

- use a **changelog** to list _all changes_ implemented _since the beginning_ of the repository story.
- use a **release note** to emphasize the _changes implemented by a specific release_. In other words: a subset of the changelog.

But it's a subjective decision to maintain the one or the other... or both. This repository is maintaining both.

### How does it looks like?

As mentioned above, the form of the information contained in the changelogs/release note is a story of its own.

Please grab some insigths and examples from the web.

This repository is using a _commonly utilized format_ know as [**conventional "standard" changelog**](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/standard-changelog) with an _angular_ preset. That's it!

## Workflows

The following is focussing on the creation of changelog &amp; release note files using an adequately generated version number. Neither the implementation of changes nor the publishing and releasing tasks are considered in detail here.

## Manually generate a new version and maintain the changelogs/release note

1. Make changes
1. Eventually merge changes made upwards i.e from your central (origin) repository (depending on your team and commit strategy)
1. Commit your changes with the git cli, making sure all tests and QA actions turn green
1. Pull all the tags (e.g. `git fetch --tags --prune --prune-tags` or `git pull --tags`, sometimes also requiring an additional `--force` argument)
1. Bump version in `package.json`
1. call the _conventional-changelog_ utility of your choice (@semantic-release/changelog, conventional-changelog-cli, standard-changelog etc.) to generate/update the `CHANGELOG.md` file
1. Commit `package.json` and `CHANGELOG.md` files
1. Tag with git cli
1. Push with git cli e.g. `git push --follow-tags`
1. publish and/or release e.g. publish a _github package_ (artifact) of a library and create a _github release_ to brand this particular state (version) of the library.

**or**

## Combine calls of `npm version` and a `package.json`script

1. Make changes
1. Commit those changes
1. Pull all the tags (e.g. `git fetch --tags` or `git pull --tags`, sometimes also requiring an additional `--force` argument)
1. Run the `npm version [patch|minor|major] -m "Upgrade to %s"` command (this will also "tag" the changes and execute a supplemental npm script as described below)
1. Push e.g. `git push --follow-tags`
1. publish and/or release e.g. publish a _github package_ (artifact) of a library and create a _github release_ to brand this particular state (version) of the library.

where the npm script could look like (adapt the params as needed):

```json
{
  "scripts": {
    "version": "conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md"
  }
}
```

or using the opiniated (angular-convention) alternative:

```json
{
  "scripts": {
    "version": "rimraf CHANGELOG.md RELEASENOTE.md && standard-changelog -r 1 -o RELEASENOTE.md && standard-changelog -f && git add CHANGELOG.md RELEASENOTE.md"
  }
}
```

note: the latest script is generating both a _changelog_ and a _release note_!

## Sources

- [Semantic Versioning (semver)](https://semver.org/)
- [git fetch](https://git-scm.com/docs/git-fetch#Documentation/git-fetch.txt---tags)
- [standard-changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/standard-changelog)
- [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)
- [npm-version](https://docs.npmjs.com/cli/v10/commands/npm-version#description)
