
const authController = require('../controllers/auth.controllers');
const catController = require('../controllers/category.controller');

// ==== Pruebas unitarias ==== //
describe('probando el renderizado de las vistas ', () => {
   
   it("renderizado login ", () => {

      //Datos del renderizado
      const view = "pages/logIn";
      const payload = {"title": "iniciar session"};

      // Peticion y respuesta para el cliente  
      const req = {};
      const res = {
         render: jest.fn()
      }

      jest.spyOn(authController, "renderLogin");

      authController.renderLogin( req, res );

      expect(res.render).toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith(view,payload);

   });

   it("renderizado register ", () => {

      //Datos del renderizado
      const view = "pages/register";
      const payload = {"title": "registro"};

      // Peticion y respuesta para el cliente  
      const req = {};
      const res = {
         render: jest.fn()
      }

      jest.spyOn(authController, "renderRegister");

      authController.renderRegister( req, res );

      expect(res.render).toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith(view,payload);

   });

   it("renderizado category ", () => {
      // Peticion y respuesta para el cliente  
      const req = {
         user: {
            firstname:'jhon',
            lastname: 'doe'
         }
      };

      //Datos del renderizado
      const view = "pages/categories";
      const username = `${req.user.firstname} ${req.user.lastname}`;
      const payload = {"title": "categorias",username};

      const res = {
         render: jest.fn()
      }

      jest.spyOn(catController, "renderCategory");

      catController.renderCategory (req, res );

      expect(res.render).toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith(view,payload);

   });

});
