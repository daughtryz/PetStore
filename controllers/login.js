import { login as apiLogin } from '../js/data.js';

export default async function login() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/user/loginPage.hbs', this.app.userData);
}

export async function loginPost() {
        if(this.params.email === '' || this.params.password === '') {
            alert('No empty fields!');
            return;
      }

        const result = await apiLogin(this.params.email, this.params.password);

        if(result.hasOwnProperty('code')) {
            alert(result.message);
            return;
        }
      if(result.email === undefined || result.password === undefined) {
            alert(result.message);
            return;
      }
        this.app.userData.email = result.email;
        this.app.userData.userId = result._id;
        this.redirect('#/dashboard');
    
}