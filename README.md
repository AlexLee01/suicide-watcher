# suicide-watcher

# AI Model API and Blog Website

This repository contains an API interface for our AI model as well as a simple blog website. The API interface is implemented using Flask, and it serves as a backend service for the trained model, providing detection for the suicide risk level of posts.

The blog website provides users and administrators login functionality. On the user page, after logging in, users can create blog posts. The appropriate support resources, helpline numbers and mental health organizations, will be suggested to the individual in need once the post content indicating suicidal tendencies. 

On the admin page, posts with suicide risk signs are displayed here. Users detected to be at high risk will be collected and passed on to designated moderators, mental health professionals, or relevant authorities for appropriate intervention for the individuals at risk.

## Model

The AI model API is located in the "Model" directory. It consists of the following files:

- "model.py": This file contains the code for loading the trained model parameters and wrapping them into an API endpoint.
- "bert_bilstm.pth": This file is the model loading file.

To run the API, you can follow these steps:

1. Install the necessary dependencies and update the model file loading path.
2. Run the Flask application by executing "python Model/model.py".
3. The API will be accessible at "http://localhost:5000".

The API provides a POST endpoint at '/content' that accepts JSON data containing the content of a blog post. It returns a detection indicating the suicide risk level of the post.

## Blog Website ("front" directory)

This repository contains a website built using the Next.js framework. Next.js is a popular React framework that enables server-side rendering and provides an efficient development experience for building modern web applications. It consists of the following files:

Folder Structure
The folder structure of the website is as follows:

pages/: This directory contains the individual pages of the website. Each file in this directory represents a separate page.
components/: This directory contains the reusable React components used throughout the website.
public/: This directory contains static assets such as images, fonts, or other files that are directly served by Next.js.

To run the blog website, you can follow these steps:

1. Install the necessary dependencies.
2. The website will be accessible at 'http://localhost:3000'.


## Conclusion

In order to demonstrate the practical application value of our suicide risk detection model, we have designed a blog website that simulates real-world scenarios. The website allows users to create and publish blog posts, and support administrators to monitor suicide-risk indicators of each post for providing support resources to individuals in need. The API and website can be run separately or deployed together in a production environment.
