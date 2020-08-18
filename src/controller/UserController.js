let users = require('../mocks/user');

module.exports = {
   listUsers(request, response) {
      const { order } = request.query;

      const sorteUsers = users.sort((a, b) => {
         if (order === 'desc') {
            return a.id < b.id ? 1 : -1
         }

         return a.id > b.id ? 1 : -1
      })
      response.send(200, sorteUsers)
   },
   getUserById(request, response) {
      const { id } = request.params;
      const user = users.find((user) => user.id === Number(id));

      if (!user) return response.send(500, { message: 'Usuario não encontrado!' })

      response.send(200, user)
   },
   creatUser(request, response) {
      const { body } = request;
      const lastId = users[users.length - 1].id;
      
      const newUser = {
         id: lastId + 1,
         name: body.name,
      }

      users.push(newUser);
      response.send(200, { ok: true })

   },
   updateUser(request, response) {
      let { id } = request.params;
      const { name } = request.body;

      id = Number(id);

      const userExits = users.find((user) => user.id === id);

      if (!userExits)
         return response.send(400, { error: 'User note found' });

      users = users.map((user) => {
         if (user.id === id) {
            return {
               ...user,
               name,
            };
         }
         return user;
      });

      response.send(200, { id, name })
   },
   deleteUser(request, response) {
      let { id } = request.params;
      id = Number(id);

      users = users.filter(user => user.id !== id);

      response.send(200, {delete:true});
   }
}