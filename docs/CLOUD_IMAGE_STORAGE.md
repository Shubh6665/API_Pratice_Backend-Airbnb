# 🖼️ Image Uploads, Cloudinary & Multer Integration Guide

This document summarizes all logic, learnings, and best practices related to image uploads, Cloudinary, and Multer in this project.

---

## Table of Contents

- [Cloudinary Setup](#cloudinary-setup)
- [Multer & Storage Configuration](#multer--storage-configuration)
- [Image Upload in Routes](#image-upload-in-routes)
- [Storing Image Data in MongoDB](#storing-image-data-in-mongodb)
- [Rendering Images in EJS](#rendering-images-in-ejs)
- [Common Mistakes & Debugging](#common-mistakes--debugging)
- [Precautions & Best Practices](#precautions--best-practices)

---

## Cloudinary Setup

- Sign up at [Cloudinary](https://cloudinary.com/) and get your cloud name, API key, and API secret.
- Create a `cloudConfig.js` file:
    ```js
    const cloudinary = require('cloudinary').v2;
    const { CloudinaryStorage } = require('multer-storage-cloudinary');

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET
    });

    const storage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: 'project',
        allowed_formats: ['jpeg', 'png', 'jpg', 'webp']
      }
    });

    module.exports = { cloudinary, storage };
    ```

---

## Multer & Storage Configuration

- Install dependencies:
    ```sh
    npm install cloudinary multer multer-storage-cloudinary
    ```
    > If you get peer dependency errors, use:  
    > `npm install multer-storage-cloudinary --legacy-peer-deps`

- In your route file:
    ```js
    const multer = require("multer");
    const { storage } = require("../cloudConfig.js");
    const upload = multer({ storage });
    ```

---

## Image Upload in Routes

- For single image upload:
    ```js
    router.post(
      "/",
      isLoggedIn,
      upload.single("image"), // field name must match your form
      validateListing,
      wrapAsync(listingController.createListing)
    );
    ```

- In your form (EJS):
    ```html
    <form ... method="POST" enctype="multipart/form-data">
      <!-- other fields -->
      <input type="file" name="image" required>
      <!-- ... -->
    </form>
    ```

---

## Storing Image Data in MongoDB

- In your controller:
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

- In your schema (`models/listing.js`):
    ```js
    image: {
      url: String,
      filename: String
    }
    ```

---

## Rendering Images in EJS

- Always use the `.url` property:
    ```ejs
    <img src="<%= listingid.image.url %>" alt="Listing Image">
    ```

---

## Common Mistakes & Debugging

- **Field name mismatch:**  
  The field name in your form (`name="image"`) must match the one in `upload.single("image")`.

- **Accessing image object directly:**  
  Use `listing.image.url`, not `listing.image`.

- **Cloudinary/Multer peer dependency errors:**  
  Use `--legacy-peer-deps` if you get install errors.

- **Large file upload errors:**  
  Check Multer’s file size limits if uploads fail for big images.

- **Missing `enctype` in form:**  
  Always use `enctype="multipart/form-data"` in your form.

- **Cloudinary credentials:**  
  Ensure your `.env` or config has correct Cloudinary keys.

---

## Precautions & Best Practices

- Always validate file type and size (set allowed formats in CloudinaryStorage).
- Store only the URL and filename in your DB, not the raw image.
- Use async error handling (`wrapAsync`) for all routes.
- Clean up unused images from Cloudinary if listings are deleted.
- Never trust client data—validate everything server-side.
- Use environment variables for all secrets and keys.

---

