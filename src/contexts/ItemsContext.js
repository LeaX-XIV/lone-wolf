import React from 'react';

const items = [
	{
		"_id": 0,
		"name": "Pugnale",
		"type": "Armament"
	},
	{
		"_id": 1,
		"name": "Lancia",
		"type": "Armament"
	},
	{
		"_id": 2,
		"name": "Mazza",
		"type": "Armament"
	},
	{
		"_id": 3,
		"name": "Daga",
		"type": "Armament"
	},
	{
		"_id": 4,
		"name": "Martello da Guerra",
		"type": "Armament"
	},
	{
		"_id": 5,
		"name": "Spada",
		"type": "Armament"
	},
	{
		"_id": 6,
		"name": "Ascia",
		"type": "Armament"
	},
	{
		"_id": 7,
		"name": "Spada",
		"type": "Armament"
	},
	{
		"_id": 8,
		"name": "Asta",
		"type": "Armament"
	},
	{
		"_id": 9,
		"name": "Spadone",
		"type": "Armament"
	},
	{
		"_id": 10,
		"name": "Spadone di Perla di Ferro",
		"type": "Armament"
	},
	{
		"_id": 11,
		"name": "Fune",
		"type": "Object"
	},
	{
		"_id": 12,
		"name": "Pugnale +1",
		"description": "Aggiungi 1 punto a combattività",
		"type": "Armament"
	},
	{
		"_id": 13,
		"name": "Mazza +1",
		"description": "Aggiungi 1 punto a combattività",
		"type": "Armament"
	},
	{
		"_id": 14,
		"name": "Spada +1",
		"description": "Aggiungi 1 punto a combattività",
		"type": "Armament"
	},
	{
		"_id": 15,
		"name": "Asta +1",
		"description": "Aggiungi 1 punto a combattività",
		"type": "Armament"
	},
	{
		"_id": 16,
		"name": "Vigorilla",
		"description": "+4 Resist after a fight",
		"type": "Object"
	},
	{
		"_id": 17,
		"name": "Cristallo da Battaglia Kai",
		"type": "Object"
	},
	{
		"_id": 18,
		"name": "Cristallo del Sonno Kai",
		"type": "Armament"
	},
	{
		"_id": 19,
		"name": "Chiave Kai d'Oro",
		"type": "Special"
	},
	{
		"_id": 20,
		"name": "Ascia +1",
		"description": "Aggiungi 1 punto a combattività",
		"type": "Armament"
	},
	{
		"_id": 21,
		"name": "Spadone +1",
		"description": "Aggiungi 1 punto a combattività",
		"type": "Armament"
	},
	{
		"_id": 22,
		"name": "Martello da Guerra +1",
		"description": "Aggiungi 1 punto a combattività",
		"type": "Armament"
	},
	{
		"_id": 23,
		"name": "Lancia +1",
		"description": "Aggiungi 1 punto a combattività",
		"type": "Armament"
	},
	{
		"_id": 24,
		"name": "Alether",
		"description": "+2 Combat fon 1 fight",
		"type": "Object"
	},
	{
		"_id": 25,
		"name": "Coscia d'Agnello",
		"type": "Food"
	},
	{
		"_id": 26,
		"name": "Spazzola d'Argento",
		"type": "Object"
	},
	{
		"_id": 27,
		"name": "Barattolo di Pittura Nera",
		"type": "Object"
	},
	{
		"_id": 28,
		"name": "Chiave di Ferro",
		"type": "Special"
	},
	{
		"_id": 29,
		"name": "Ruota Dentata di Ferro",
		"type": "Object"
	},
	{
		"_id": 30,
		"name": "Pietra Focaia",
		"type": "Object"
	},
	{
		"_id": 31,
		"name": "Chiodo di Ferro",
		"type": "Object"
	}
]

export const ItemsContext = React.createContext({
	getItems: () => items,
	getBagItems: () => items.filter(i => i.type === 'Object' || i.type === 'Food'),
	getArmaments: () => items.filter(i => i.type === 'Armament'),
	getSpecialItems: () => items.filter(i => i.type === 'Special'),
	getFood: () => items.filter(i => i.type === 'Food'),
	getItemFromId: (id) => items[id] || undefined
});