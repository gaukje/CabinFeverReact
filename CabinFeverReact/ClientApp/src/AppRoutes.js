import Home from './components/Home';
import ItemCreate from './components/Items/ItemCreate';
import ItemEdit from './components/Items/ItemEdit';
import ItemDetails from './components/Items/ItemDetails';
import ItemDelete from './components/Items/ItemDelete';

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: 'items/create',
        element: <ItemCreate />
    },
    {
        path: 'items/edit/:id',
        element: <ItemEdit />
    },
    {
        path: 'items/details/:id',
        element: <ItemDetails />
    },
    {
        path: 'items/delete/:id',
        element: <ItemDelete />
    }
];

export default AppRoutes;
