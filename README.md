## INTRO

This is a frontend project for [Beckett Vault](https://www.beckettvault.com/), built with React.

The production is running on https://vault.beckett.com/.

## TECH STACK

- React 18.1
- Bootstrapped with Create-react-app
- Authentication through AWS Cognito
- axios for API fetching
- API JWT authentication
- React-bootstrap and SCSS for styling
- Unit testing with Jest
- Prettier/Eslint

User pools are configured in AWS Cognito and required ids are set in `src/config.json`.

GitHub workflows are used to ensure the code quality and build when PRs are opened or merged to the targetted branches.

## ENVIRONMENT

Please install [`nvm`](https://github.com/nvm-sh/nvm) (node version manager) in your local environment. We're using node.js `v16.14.x`.

Run `copy .env.example .env`, when you first setup the project locally.

We have 2 environments:

- `dev`
  
  `.env` configuration:

  ```bash
  REACT_APP_ENV=dev
  ```

- `prod`

  `.env` configuration:

  ```bash
  REACT_APP_ENV=prod
  ```

## INSTRUCTIONS

### Development

```bash
npm install
npm run start
```

### Production

```bash
npm install
npm run build
```

## CONTRIBUTION

### Development

`main` is our main development branch. When you work on a task, branch off `main`, then submit a PR against it.

### Release

`prod` branch should be what's in the production at any time. We do verison tagging on git, and it will trigger the workflow to deploy to production.


## STRUCTURE

On the high-level, we have this folder structure:

- assets

  Store all static assets like `fonts`, `images`, `svgs`, etc

- components

  Place for re-usable and shared UI components across the app.

- const

  Define all sorts of constants that are used across the app.

- contexts

  Contexts and providers. We have `AuthContext` here, which stores all user session related information.

- hooks

  Put all re-usable react hooks.

- libs

  Place for functions interacting with external library, like `cognito`

- pages

  Main page components go here. Each page can be a folder with a group of sub-components and styles.
- services

  Server(API) interaction utility functions

- utils

  Non-server interaction, logic-focused utility functions

## Links

API swagger docs: http://dev.beckett.com:3300/api

API URLs: https://beckettengineering.atlassian.net/wiki/spaces/BECKETT/pages/43548677/Marketplace+Bravo+API+URLs

API documentation: https://beckettengineering.atlassian.net/wiki/spaces/BECKETT/pages/5177345/Marketplace+API+Documentation

Cognito setup: https://beckettengineering.atlassian.net/wiki/spaces/BECKETT/pages/5210120/AWS+Cognito

Release docs: https://beckettengineering.atlassian.net/wiki/spaces/BECKETT/pages/43155457/Push+code+to+Prod


