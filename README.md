# MyReads Udacity Project 

This is my (Lasse's) final assessment project for Udacity's React Fundamentals course. The goal was for me to convert a static example of the CSS and HTML, to a functional React app used for keeping tracks of books "Currently Reading" "Want to read" and "Read", along with the option to move the books around, remove them from the "shelves" and search for for books using an API. 

## TL;DR

To test the app in action, please follow these steps:

- git clone repository `git clone https://github.com/LasseTypeform/MyReadsProject.git`
- cd into "starter" folder of the project
- install all project dependencies with `npm install`
- start the development server with `npm start`
- Once the app is running, you will see the current state of books on the thre shelves, "Currently Reading" "Want to read" and "Read". When clicking on one of the books in the view, you will have the option to move the book to another shelf, or remove the book completely. The shelf you chose for the book, will show the same across all rendering of books. By clicking the + button in the lower right corner, you will be taken to a /search page, which allows you to search the backend for books. Once the books are renedered, you can see the current shelf of the book, and have the option to change the shelf. If you change the shelf in the search page, this change will also reflect on the main page.  

## What You're Getting

```bash
├── CONTRIBUTING.md
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms the app.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # React Icon
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for the app. 
    ├── App.js # This is the root of the app. Contains static HTML right now.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles.
    └── index.js # Is used for DOM rendering only.
```