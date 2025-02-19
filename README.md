# Chef's Favourite Meals Order System

## Description
This JavaScript application interacts with **The Meal DB API** to take and complete orders of the **chef's favourite meals**. Users can input a main ingredient, and the application will fetch a random dish based on that ingredient. The order details are stored using `sessionStorage`, allowing users to track and complete their orders.

## Features
- **Order Taking**
  - Users enter a main ingredient via `prompt()`.
  - The application fetches meals from The Meal DB API.
  - A **random** meal is selected as the order.
  - Each order includes a **description, unique order number, and completion status**.
  - Ingredients are formatted properly (converted to lowercase and spaces replaced with underscores).
  - If no meals are found, the user is prompted to enter another ingredient.
  
- **Order Storage**
  - Orders are stored in **sessionStorage** in JSON format.
  - Each order gets a **unique order number**.
  - The last generated order number is stored separately to track the next available order number.

- **Managing Orders**
  - Users can view all **incomplete orders**.
  - Users can mark an order as **completed** by entering the order number.
  - The application updates the session storage after completing an order.
  - If an invalid order number is entered, an appropriate message is displayed.

## How to Use
1. Run `chefOrders.js` in a JavaScript environment.
2. Enter a **main ingredient** when prompted.
3. The app fetches meals and selects a **random** meal for your order.
4. If no meals are found, you will be asked to enter another ingredient.
5. View all **incomplete orders** using the prompt system.
6. Enter an **order number** to mark it as complete.
7. The order status updates in `sessionStorage`.

## API Reference
The app uses **The Meal DB API**:
- Example API call:  
- Ingredient formatting:  
- Spaces are replaced with underscores.  
- Example: **"Garlic Powder"** → `"garlic_powder"`

## Technologies Used
- JavaScript
- Fetch API
- Session Storage (`sessionStorage`)
- The Meal DB API

## Authour
- Selina Prema

## License
This project is licensed under the **MIT License**.
