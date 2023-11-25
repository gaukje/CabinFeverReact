import React, { useState, useEffect } from 'react';
import { ItemService } from './../services/ItemService';
import { useNavigate } from 'react-router-dom';

const ItemCreate = () => {
    // Hardkodede verdier for å teste opprettelse av et nytt item
    const itemToCreate = {
        ItemId: 7,
        Name: 'Testhytte',
        PricePerNight: 1000,
        FromDate: '2023-11-30', // Bruk et gyldig datoformat, f.eks. 'ÅÅÅÅ-MM-DD'
        ToDate: '2023-12-05',   // Samme her, pass på at det er etter FromDate
        Capacity: 4,
        Description: 'Dette er en testbeskrivelse.',
        Location: 'Oslo',
        ImageUrl: '/images/hytte_stock_5.jpg',
        TestUserId: '1', // Bruk en gyldig bruker-ID
        IsAvailable: true // Dette feltet er valgfritt, men kan inkluderes
    };

    useEffect(() => {
        const createItem = async () => {
            try {
                const response = await ItemService.createItem(itemToCreate);
                console.log('Item opprettet:', response);
            } catch (error) {
                console.error('Feil under oppretting av item:', error);
            }
        };

        createItem();
    }, []);

    return <div>Oppretter test-item...</div>;
};

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        ItemService.getItems()
            .then(data => {
                console.log('Fetched items:', data); // Logg hele responsobjektet
                const itemsArray = data.$values || []; // Fallback til et tomt array hvis $values ikke er definert
                setItems(itemsArray);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    }, []);

    return (
        <div>
            <h1>Items</h1>
            <ul>
                {items.map(item => (
                    <li key={item.ItemId}>{item.Name}</li> // Anta at 'Name' og 'ItemId' er feltene i item-objektet
                ))}
            </ul>
        </div>
    );
};



const ItemManagementPage = () => {
    return (
        <div>
            <ItemCreate />
            <ItemList />
        </div>
    );
};

export default ItemManagementPage;
