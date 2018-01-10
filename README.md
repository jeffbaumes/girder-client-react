# girder-react-client

A proof-of-concept web UI for Girder built with
`react`, `redux`, `react-router`, `semantic-ui-react`.

## Why?

[@jeffbaumes](https://github.com/jeffbaumes) wanted to learn React and decided to use
the Girder client as an example app to implement. This is not prescriptive in terms of
how a next-generation Girder client could be built, but it hopefully will at least be
informative, informing both what to do and what not to do.

## Why React?

I've already done a [project](https://github.com/arborworkflows/arbor_apps) with the other
new(er) kid, Vue. It also uses Girder but does not try to mimic the core Girder UI.

I like that React enables a true mashup of JavaScript and HTML. With Vue you still need to
decide what goes in the template (its own mini-language to learn) and what goes into helper methods.
React also has been around longer, and seems more likely to find solutions for issues
encountered. Create React App and its thorough documentation have been extremely helpful.

I like that Vue handles scoped CSS without effort. Out-of-the-box React requires separate CSS files.

Vuex and Redux are largely identical in how they work for state management.

Overall I'm a bit more impressed by React, though Vue is a pleasure as well.

## Why Semantic UI?

It has decent documentation, apparently good theming support, and an underlying non-React library
so non-React apps could still make Semantic UI themed apps that fit the ecosystem. Semantic UI for
React is jQuery-free.

Other UI libraries could work just fine, though I've heard some Material Design libraries
have performance issues. I've also already tried a Material Design library on the Vue project
and wanted to try something else.

## Why no `react-router-redux`?

The fundamental issue using Redux and `react-router` together is that
Redux wants to be the source of truth for the app state
but `react-router` wants to be the source of truth for location/history. `react-router-redux`
syncs them so you can get location/history state from Redux. However, right now the library
seems to be in an odd state, requiring a `@next` tag to install a version that works with
the latest `react-router`.
In any event, it was glitching on me (user error most likely), and then I came across multiple
places (including the first paragraph on
[this page](https://redux.js.org/docs/advanced/UsageWithReactRouter.html)
in the official Redux docs) stating that it's normally fine/better to let `react-router` be
the source of truth for routing and let Redux be the source of truth for everything else.
So far it seems to be ok to make that separation.

## Why this directory layout?

There are lots of opinions out there. I like that `/src/components` is all UI with no Redux logic
and that `/src/containers` is all Redux with no UI logic. There are other approaches such as
directory-per-component and group-by-functionality. I kept things pretty simple/flat.
I like the idea of tests alongside code as `.test.js` files so it's clear what is tested.
I also like the simplicity and compactness of the
[ducks](https://medium.com/@scbarrus/the-ducks-file-structure-for-redux-d63c41b7035c)
model for Redux, which I've put in `/src/modules`.

## How to build, test, etc.

Before anything else, do `npm install`.

Run the client in watch mode with `npm start`.
The development server is set up to proxy all requests under `/api/v1` to `http://localhost:8080`,
and assumes a Girder server is running there.

Run the tests in watch mode with `npm test`. Report coverage with `npm test -- --coverage`.

Build production code to `/build` with `npm run build`.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
