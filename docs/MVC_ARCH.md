# 🏗️ MVC Architecture in This Project

This document explains, in simple language, how the MVC (Model-View-Controller) architecture is used in this project.  
It includes what each part does, how files are organized, code examples, common mistakes, and tips—so anyone can understand and follow it for their own Node.js/Express projects.

---

## Table of Contents

- [What is MVC?](#what-is-mvc)
- [Project Structure](#project-structure)
- [Models](#models)
- [Views](#views)
- [Controllers](#controllers)
- [Routes](#routes)
- [Middleware](#middleware)
- [Best Practices & Learnings](#best-practices--learnings)
- [Common Mistakes](#common-mistakes)
- [Checklist for Future Projects](#checklist-for-future-projects)

---

## What is MVC?

**MVC** stands for **Model-View-Controller**.  
It is a way to organize your code so that:
- **Model:** Handles all the data and logic (database schemas, queries, etc.).
- **View:** Handles what the user sees (HTML, EJS templates).
- **Controller:** Handles the logic between the Model and View (gets data from Model, sends it to View, handles user actions).

**Why use MVC?**  
- Code is cleaner, easier to manage, and easier to debug.
- You can work on UI, logic, and data separately.

---

## Project Structure

```
project/
│
├── models/           # Mongoose schemas (Model)
│   ├── listing.js
│   ├── reviews.js
│   └── user.js
│
├── views/            # EJS templates (View)
│   ├── listings/
│   ├── reviews/
│   └── layouts/
│
├── controller/       # Controllers (Controller)
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/           # Express route handlers
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── middleware.js     # Custom middleware (auth, validation, etc.)
├── app.js            # Main app file (entry point)
└── ...
```

---

## Models

**What are Models?**  
- They define the structure of your data (like a blueprint for your database).
- Example: `/models/listing.js`
    ```js
    const mongoose = require("mongoose");
    const listingSchema = new mongoose.Schema({
      title: String,
      description: String,
      image: {
        url: String,
        filename: String
      },
      price: Number,
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    });
    module.exports = mongoose.model("Listing", listingSchema);
    ```
**Tip:**  
If you want to change how your data is stored, you only need to update the model.

---

## Views

**What are Views?**  
- These are the files that create the HTML the user sees.
- In this project, we use EJS templates.
- Example: `/views/listings/show.ejs`
    ```ejs
    <h1><%= listingid.title %></h1>
    <img src="<%= listingid.image.url %>" alt="Listing Image">
    <p><%= listingid.description %></p>
    ```
**Tip:**  
You can use variables from your controller in your EJS files to show dynamic data.

---

## Controllers

**What are Controllers?**  
- They are the "middle-man" between Models and Views.
- They get data from the Model, process it, and send it to the View.
- Example: `/controller/listing.js`
    ```js
    module.exports.createListing = async (req, res, next) => {
      let url = req.file.path;
      let filename = req.file.filename;
      const newListing = new Listing(req.body.listing);
      newListing.owner = req.user._id;
      newListing.image = { url, filename };
      await newListing.save();
      req.flash("success", "New Listing Created Successfully!");
      res.redirect("/listings");
    }
    ```
**Tip:**  
Keep your controllers focused—one function for one job.

---

## Routes

**What are Routes?**  
- They define the URLs/endpoints for your app and connect them to controllers.
- Example: `/routes/listing.js`
    ```js
    const express = require("express");
    const router = express.Router();
    const listingController = require("../controller/listing.js");
    const multer = require("multer");
    const { storage } = require("../cloudConfig.js");
    const upload = multer({ storage });

    router.route("/")
      .get(wrapAsync(listingController.index))
      .post(isLoggedIn, upload.single("image"), validateListing, wrapAsync(listingController.createListing));

    router.get("/new", isLoggedIn, listingController.newListing);
    ```
**Tip:**  
Routes should be as simple as possible—just connect URLs to controllers and middleware.

---

## Middleware

**What is Middleware?**  
- Functions that run before your controller logic.
- Used for things like authentication, validation, and error handling.
- Example: `/middleware.js`
    ```js
    module.exports.isLoggedIn = (req, res, next) => {
      if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be logged in!");
        return res.redirect("/login");
      }
      next();
    };
    ```
**Tip:**  
Use middleware to keep your controllers and routes clean.

---

## Best Practices & Learnings

- **Keep everything separate:** Models, Views, Controllers, and Routes in their own files/folders.
- **Controllers should handle logic, not routes.**
- **Use middleware for repetitive checks** (like authentication and validation).
- **Use async/await and error handling** (`wrapAsync` utility).
- **Use `.populate()` in models to get related data (like owner info).**
- **Use EJS partials/layouts** to avoid repeating HTML code.
- **Always validate and sanitize user input.**
- **Use environment variables for sensitive config (like DB passwords, API keys).**

---

## Common Mistakes

- Writing business logic directly in routes instead of controllers.
- Accessing properties of a model without checking if it exists (can cause errors).
- Not using error handling in async controllers.
- Forgetting `mergeParams: true` for nested routers.
- Mismatched form field names and model/controller expectations.

---

## Checklist for Future Projects

- [ ] Separate folders for models, views, controllers, and routes.
- [ ] Controllers for all business logic.
- [ ] Minimal, clean routes.
- [ ] Middleware for authentication, validation, and error handling.
- [ ] EJS partials/layouts for reusable UI.
- [ ] Always validate and sanitize user input.
- [ ] Use environment variables for sensitive config.
- [ ] Write clear, modular, and maintainable code.

---

