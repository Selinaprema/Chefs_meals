// Function to take the user's order and fetch meals based on the main ingredient
function takeOrder() {
  let ingredient = prompt("Please enter the main ingredient for your meal:");

  // Convert ingredient to lowercase and replace spaces with underscores to form the URL
  ingredient = ingredient.toLowerCase().replace(/ /g, "_");

  // Build the API URL with the ingredient
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  // Fetch data from the MealDB API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        // Randomly select a meal from the response
        const randomMeal =
          data.meals[Math.floor(Math.random() * data.meals.length)];
        const mealDescription = randomMeal.strMeal;

        // Generate a new order number
        let orderNumber = sessionStorage.getItem("OrderNumber") || 0;
        orderNumber = parseInt(orderNumber) + 1;

        // Store the order in sessionStorage
        const order = {
          orderNumber: orderNumber,
          description: mealDescription,
          status: "Incomplete",
        };
        sessionStorage.setItem(`order${orderNumber}`, JSON.stringify(order));

        // Update the last order number in sessionStorage
        sessionStorage.setItem("OrderNumber", orderNumber);

        // Display the order confirmation
        alert(`Order placed: ${mealDescription}`);
      } else {
        alert("No meals found with that ingredient. Please try again.");
        takeOrder(); // Recursive call if no meals found
      }
    })
    .catch((error) => {
      console.error("Error fetching meals:", error);
      alert("Error fetching meal data. Please try again.");
    });
}

// Function to display incomplete orders
function displayOrders() {
  // Retrieve all stored orders from sessionStorage
  const displayOrders = Object.keys(sessionStorage)
    .filter((key) => key.startsWith("order")) // Filter to get only order keys
    .map((key) => JSON.parse(sessionStorage.getItem(key))); // Convert JSON string to an object

  // Filter out only incomplete orders
  const incompleteOrders = displayOrders.filter(
    (order) => order.status === "Incomplete"
  );

  // Display incomplete orders to the user
  if (incompleteOrders.length === 0) {
    alert("No incomplete orders.");
  } else {
    let orderList = "Incomplete Orders:\n";
    incompleteOrders.forEach((order) => {
      orderList += `Order Number: ${order.orderNumber} - Meal: ${order.description}\n`;
    });
    alert(orderList);

    // Ask the user for the order number to mark as complete
    const orderNumberToComplete = prompt(
      "Enter the order number to mark as complete, or enter '0' to skip."
    );

    // Check if the user entered '0' or a valid order number
    if (orderNumberToComplete === "0") {
      alert("No order marked as complete.");
      return; // Exit the function without completing any order
    }

    // Find the specific order from incomplete orders
    const orderToComplete = incompleteOrders.find(
      (order) => order.orderNumber == orderNumberToComplete
    );

    if (orderToComplete) {
      // Mark the order as completed
      orderToComplete.status = "Completed";
      sessionStorage.setItem(
        `order${orderNumberToComplete}`,
        JSON.stringify(orderToComplete)
      ); // Update order in sessionStorage
      alert(`Order ${orderNumberToComplete} marked as completed.`);
    } else {
      // Handle case where order number doesn't exist
      alert(
        `Order number ${orderNumberToComplete} does not exist. Please try again.`
      );
    }
  }
}
