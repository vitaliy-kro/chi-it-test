# Car Management System

The Car Management System is a web application that allows users to manage a list of cars. Users can add new cars, delete existing cars, edit car details, search for cars based on various criteria, and apply filters to sort the car list.

## Features

- View a list of cars with their details.
- Add a new car to the list.
- Delete a car from the list.
- Edit the details of a car.
- Search for cars based on specific criteria.
- Apply filters to sort the car list.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Material-UI: A popular UI component library for React applications.
- Axios: A promise-based HTTP client for making API requests.
- Context API: A state management solution provided by React for sharing data between components.
- Formik: A library for handling forms in a React application.
- Yup: A library for validation inputs.
- React-toastify: A library for notifications.

## Getting Started

To get started with the Car Management System, follow these steps:

1. Clone the repository:

```shell
git clone https://github.com/vitaliy-kro/chi-it-test.git
```

2. Install the dependencies:

```shell
cd car-management-system
npm install
```

3. Configure the backend URL: 
Update the **QUERY_KEYS.BACKEND_URL** constant in the consts.js file with the URL of your backend server.

4. Starting development server 

```shell
npm start
```

5. Open an application. Open your web browser and visit `http://localhost:3000` to access the Car Management System.

## Usage

1. Add a new car:
- Click on the **"Add Car"** button. 
- Fill in the required details in the form. 
- Click on the **"Save"** button to add the car to the list.

2. Delete a car:

- Locate the car you want to delete in the car list. 
- Click on the **"Delete"** icon next to the car. 
- Confirm the deletion when prompted.

3. Edit a car:

- Locate the car you want to edit in the car list. 
- Click on the **"Edit"** icon next to the car. 
- Update the details in the form. 
- Click on the **"Save"** button to save the changes.

4. Search for cars:

- Enter a search term in the search bar.
- Click on the **"Search"** button to search cars. 
- The car list will be filtered based on the search term.

5. Apply filters:
- Select a filter option from the dropdown menu. 
- The car list will be sorted based on the selected filter.

## Contributing
Contributions to the Car Management System are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://choosealicense.com/licenses/mit/) file for details.