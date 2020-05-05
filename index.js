const express = require('express');
const shortid = require('shortid');

const server = express();

server.use(express.json());
server.listen(8000, () => console.log("\n== API is up ==\n"));

let users = [
    {
        name: 'test',
        bio: 'test',
        id: 1
    }
];

server.get('/', (req, res) => {
    res.json({api: "Up and running!"});
});

server.get('/api/users', (req, res) => {
    !users ? res.status(500).json({errorMessage: "user info could not be received"}) : res.status(200).json(users);

})

server.post('/api/users', (req, res) => {

    if (req.body.name && req.body.bio) {
        const userInfo = req.body;
        userInfo.id = Date.now();

        users.push(userInfo);
        res.status(201).json(userInfo);
    }
    else {
        res.status(400).json({errorMessage: "please provide name and bio for user"})
    };

    
});

server.get('/api/users/:id', (req, res) => {
    const user = users.find(i => i.id == req.params.id);

    if (!users) {
        res.status(500).json({errorMessage: "data could not be received"})
    }
    else if (!user) {
        res.status(404).json({errorMessage: "user does not exist"})
    }
    else {
        res.status(200).json(user);
    }
   
    
})

server.delete('/api/users/:id', (req, res) => {
    const user = users.find(i => i.id == req.params.id);
    const id = Number(req.params.id);
    users = users.filter(u => u.id !== id);

    if (!user) {
        res.status(404).json({errorMessage: "user does not exist"})
    }
    else {
        res.status(200).json(user);
    }


})

server.patch('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(i => i.id == id);
    users.map(person => {
        if(person.id == id)
        {
            person.name = user.name;
            person.bio = user.bio;
        }
        else{
            return person;
        }
    });
    if (!user) {
        res.status(404).json({errorMessage: "user does not exist"})
    }
    else if (!req.body.name || !req.body.bio) {
        res.status(400).json({errorMessage: "please provide name and bio for user"})
    }
    else if (!users) {
        res.status(500).json({errorMessage: "could not receive data"})
    }
    else {
        
        res.status(200).json(user);
    }

})