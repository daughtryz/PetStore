/* globals Sammy */
import dashboard from '../controllers/dashboard.js';
import register, { registerPost } from '../controllers/register.js';
import login, { loginPost } from '../controllers/login.js';
import logout from '../controllers/logout.js';
import { create, createPost,details,edit,editPost,deletePet,likePet } from '../controllers/pets.js';
import { myPetsPage } from '../controllers/myPets.js';

window.addEventListener('load', async () => {
    const app = Sammy('#site-content', async function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            userId: localStorage.getItem('_id') || '',
            email: localStorage.getItem('email') || '',
            pets: [],
            allPets: []
        };

        this.get('/', dashboard);
        this.get('index.html', dashboard);
        this.get('#/dashboard', dashboard);

        this.get('#/register', register);

        this.get('#/login', login);

        this.get('#/logout', logout);

          this.get('#/details/:id', details);

          this.get('#/create', create);
        // this.get('#/allMemes',allMemes);
          this.get('#/edit/:id', edit);
         this.get('#/myPets',myPetsPage);
         this.post('#/register', ctx => { registerPost.call(ctx); });
         this.post('#/login', ctx => { loginPost.call(ctx); });
        this.get('#/like/:id',likePet);
          this.post('#/create', ctx => { createPost.call(ctx); });
          this.post('#/edit/:id', ctx => { editPost.call(ctx); });
          this.get('#/delete/:id', deletePet);
    });

    app.run();
});