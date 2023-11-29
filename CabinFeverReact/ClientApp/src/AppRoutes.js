import Home from './components/Home';
import ItemCreate from './components/Items/ItemCreate';
import ItemEdit from './components/Items/ItemEdit';
import ItemDetails from './components/Items/ItemDetails';
import ItemDelete from './components/Items/ItemDelete';

// Array of routes for the app
const AppRoutes = [
    {
        // Default route (index route) for the homepage
        index: true,
        element: <Home />
    },
    {
        // Route for creating an item
        path: 'items/create',
        element: <ItemCreate />
    },
    {
        // Route for editing an item, with dynamic Id
        path: 'items/edit/:id',
        element: <ItemEdit />
    },
    {
       // Route for viewing item details, with dynamic ID

        path: 'items/details/:id',
        element: <ItemDetails />
    },
    {
        // Route for deleting an item, with dynamic ID
        path: 'items/delete/:id',
        element: <ItemDelete />
    }
];

// Exporting the routes to be used in the application
export default AppRoutes;
