# API Functionalities

 |       Description        | Method |             Path             |       request body       |   Response body    |    Errors     |
 | :----------------------: | :----: | :--------------------------: | :----------------------: | :----------------: | :-----------: |
 |    Get list of users     |  GET   |            /users            |            {}            |   [User objects]   |      403      |
 |     Get single user      |  GET   |         /users/:uid          |            {}            |   {User object}    |      404      |
 |     Creare new user      |  PUSH  |            /users            |   {User object no _id}   |   {User object}    |      400      |
 |   Modify existing user   |  PUT   |         /users/:uid          | {_id, fields to modify}  |   {User object}    | 400, 403, 404 |
 |       Delete user        | DELETE |         /users/:uid          |            {}            |   {User object}    |   403. 404    |
 |                          |        |                              |                          |                    |               |
 |     Get list of PCs.     |  GET   |         /lonewolves          |            {}            | [Lonewolf objects] |      403      |
 |      Get single PC       |  GET   |      /lonewolves/:lwid       |            {}            | {Lonewolf object}  |   403, 404    |
 |    Modify existing PC    |  PUT   |      /lonewolves/:lwid       | {_id, fields to modify}  | {Lonewolf object}  | 400, 403, 404 |
 |        Delete PC         | DELETE |      /lonewolves/:lwid       |            {}            | {Lonewolf object}  |   403, 404    |
 |                          |        |                              |                          |                    |               |
 | Get list of PCs of user  |  GET   |    /users/:uid/lonewolves    |            {}            | [Lonewolf objects] |      403      |
 | Get single PC of a user  |  GET   | /users/:uid/lonewolves/:lwid |            {}            | {Lonewolf object}  |   403, 404    |
 | Create new PC for a user |  POST  |    /users/:uid/lonewolves    | {Lonewolf object no _id} | {Lonewolf object}  |   400, 403    |
 |   Modify PC of a user    |  PUT   | /users/:uid/lonewolves/:lwid | {_id, fields to modify}  | {Lonewolf object}  |   403, 404    |
 |   Delete PC of a user    | DELETE | /users/:uid/lonewolves/:lwid |            {}            | {Lonewolf object}  |   403, 404    |
 |                          |        |                              |                          |                    |               |
 |    Get list of items     |  GET   |            /items            |            {}            |   [Item objects]   |       -       |
 |     Get single item      |  GET   |         /items/:iid          |            {}            |   {Item object}    |      404      |
 |                          |        |                              |                          |                    |               |
 |       PC uses item       |  GET   |        /bag/:iid/use         |      {_uid, _lwid}       | {Lonewolf object}  | 400, 403, 404 |

User = {
	_id: int,
	role: USER | ADMIN,
	pc_ids: [int]
}

Lonewolf = {
	_id: int,
	disciplines: [Disciplines],
	armaments: [Armament],
	hasBag: boolean,
	bag: [Item],
	goldCrowns: int,
	baseCombat: int,
	combat: int,
	baseResist: int,
	resist: int
}

Disciplines = {
	_id: int,
	name: String,
	description: String
}

Armament = {
	_id: int,
	name: String,
	description: String,
	combatModifier: int,
}

Item = {
	_id: int,
	name: String,
	description: String,
	effect: function(Lonewolf)
}
