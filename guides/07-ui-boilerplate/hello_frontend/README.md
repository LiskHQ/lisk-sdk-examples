
# Steps to re-create the Hello UI template

This project is bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and styled with [Semantic UI](https://semantic-ui.com/introduction/getting-started.html).

## Installation
- In the `hello` directory, run the following command to bootstrap a react app:
```
npx create-react-app hello_frontend
```

- Once the bootstrap is successful, the directory should look like the following:
```
hello/
├── hello_client/
└── hello_frontend/
```

- Install other dependencies:
```
cd hello_frontend
npm install semantic-ui-react semantic-ui-css
npm i react-router
npm i react-router-dom
```

## Implementing a UI template
- Create the `layout` folder inside the `hello/hello_frontend/src` folder.
```
mkdir layout
```

- Inside the `layout` folder, create a file: `header.js`, and paste the contents of [header.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/guides/07-ui-boilerplate/hello_frontend/src/layout/header.js) in it.

- Create the `components` folder inside the  `hello/hello_frontend/src` directory 
```
mkdir components
```

- Within the `components` folder, do the following:
  - Create [faucet.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/guides/07-ui-boilerplate/hello_frontend/src/components/faucet.js) along with its content.
  - Create [getAccountDetails.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/guides/07-ui-boilerplate/hello_frontend/src/components/getAccountDetails.js) along with its content.
  - Create [getHello.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/guides/07-ui-boilerplate/hello_frontend/src/components/getHello.js) along with its content.
  - Create [home.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/guides/07-ui-boilerplate/hello_frontend/src/components/home.js) along with its content.
  - Create [messageTimeline.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/guides/07-ui-boilerplate/hello_frontend/src/components/messageTimeline.js) along with its content.
  - Create [newAccount.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/guides/07-ui-boilerplate/hello_frontend/src/components/newAccount.js) along with its content.
  - Create [sendHello.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/guides/07-ui-boilerplate/hello_frontend/src/components/sendHello.js) along with its content.
  - Create [transfer.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/guides/07-ui-boilerplate/hello_frontend/src/components/transfer.js) along with its content.
  
- Update the `hello_frontend/src/App.css` file according to [App.css](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/guides/07-ui-boilerplate/hello_frontend/src/App.css).

- Update the `hello_frontend/src/App.js` file according to [App.css](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/guides/07-ui-boilerplate/hello_frontend/src/App.js).

- Insert the following `logo.png` in place of the existing `logo.svg` in the `hello_frontend/src/` directory.

![logo](https://user-images.githubusercontent.com/13951043/218746127-be241607-b647-4295-af65-ee113c140038.png)

- Update the `hello_frontend/public/index.html` file according to [index.html](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/guides/07-ui-boilerplate/hello_frontend/public/index.html).

## Start `hello_frontend`.
```
npm start
```

## Screenshots

After performing all the aforementioned steps, your Hello UI should look like the following:

### Homepage:
![Home](https://user-images.githubusercontent.com/13951043/218956511-b32e13d6-719a-4dc8-a6d2-d005565d6988.jpg)

### New Account Page:
![NewAccount](https://user-images.githubusercontent.com/13951043/218956076-37bc039d-4f13-4486-b13d-f061b4283744.jpg)

### Get Account Details Page:
![Getdetails](https://user-images.githubusercontent.com/13951043/218956141-3a02c1a0-80d2-49b3-8711-165b8dcd8de0.jpg)

### Transfer tokens Page:
![Transfer](https://user-images.githubusercontent.com/13951043/221137789-6ce40601-63ac-4b74-bb3a-8c270244632c.jpg)

### Send Hello Page:
![SendHello](https://user-images.githubusercontent.com/13951043/221137689-9b5bd369-e4c3-4c29-8121-cace2985113b.jpg)

### Get Hello Page:
![GetHello](https://user-images.githubusercontent.com/13951043/218956363-155a2df5-a8ac-402e-9cda-8195ec729e2f.jpg)

### Faucet Page:
![Faucet](https://user-images.githubusercontent.com/13951043/221137631-26fed096-1e35-47bd-81f4-6ecd3b79483c.jpg)
