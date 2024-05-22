# Angular Store Project

## Table of Contents

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Quick Start](#quick-start)
5. [Live Demo](#live-demo)

## Introduction

Welcome to the Angular Store project! This is an e-commerce store built with Angular, utilizing TailwindCSS for styling and Angular Material for UI components. The project heavily relies on NGRX for state management and RXJS for reactive programming. It uses the FakestoreAPI to fetch product data and implements a full cart system with Stripe for checkout.

![App Screenshot](https://your-image-url-here)

## Tech Stack

- **Frontend**:
  - **Angular**: Framework for building the application.
  - **TailwindCSS**: Utility-first CSS framework.
  - **Angular Material**: UI component library.
  - **NGRX**: State management library.
  - **RXJS**: Reactive programming library.
  - **TypeScript**: Primary programming language.

- **APIs and Services**:
  - **FakestoreAPI**: API for fetching product data.
  - **Stripe**: Payment processing for checkout.

## Features

- **Product Listing**: Browse a wide range of products fetched from FakestoreAPI.
- **Cart System**: Add products to the cart, view cart items, and calculate the total price.
- **Checkout**: Proceed to checkout using Stripe for payment processing.
- **Category Filtering**: Filter products by category.
- **Sorting**: Sort products based on different criteria.
- **Grid Layout Management**: Change the grid layout for product display.
- **Product Limitation**: Limit the number of products displayed.

## Quick Start

### Prerequisites

Ensure you have the following installed:

- **Git**: Version control system.
- **Node.js**: JavaScript runtime.
- **NPM**: Node package manager.
- **Angular CLI**: Command line interface for Angular.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rahilkaiser/angular-store-project.git
   cd angular-store-project
   
2. **Install dependencies:**:
   ```bash
    npm install
   
3. **Run the Angular application:**:
   ```bash
    ng serve
Navigate to http://localhost:4200/ in your web browser to view the application.

### Live Demo
Check out the live demo [here](https://sensational-tulumba-e0c3e7.netlify.app/home).
