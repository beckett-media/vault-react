## INTRO
The frontend is a React/Redux/Bootstrap/SASS app, using axios for network calls.

The project is brokendown into component folders with a flat file structure. 

## ENVIRONMENT

Please install [`nvm`](https://github.com/nvm-sh/nvm) (node version manager) in your local environment. We're using node.js `v16.14.x`.

## STRUCTURE
Within the components folder you can find all of the components, services for api calls by component, and some generic components in the Generic folder.

## STATE

The state folder contains the entirety of the redux structure. To add or alter defaults, make changes in the initalState in the rootReducer file.

As it pertains to collectibles, item objects are the most basic structure, which would hold all of the data for a particular item.
Item IDs can be passed into the selected item ids array when selecting multiple items in checkboxes.
Forms are broken down by action type and contain arrays of item objects to be submitted for persistent storage, except in the case of submissions.

The naming conventions for actions are such that plural names will accept arrays, and singular will accept single objects.

The general flow for adding and removing objects from state is to pass a single item into the corresponding add or remove action. 

The plural actions are generally used to set entire arrays, for example in a select all, or when a form is being generated from multiple selected items.

## API

The API path is http://dev.beckettvault.com/api.

The endpoints correspond to pages and are formatted as /marketplace/{::(path representing page, ie. submission)}/{::(object id)}.
