import { register as apiRegister } from '../js/data.js';

export default async function register() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/user/registerPage.hbs', this.app.userData);
}

export async function registerPost() {
  
    
      if(this.params.password === '' || this.params['confirm-pass'] === '',this.params.email === '') {
            alert('No empty fields!');
            return;
      }
      console.log(this.params);
      if(this.params.password !== this.params['confirm-pass']) {
        alert('Passwords dont match!');
        return;
      }
        const result = await apiRegister(this.params.email,this.params.password);
        if(result.code === 400) {
            alert('All fields are required!');
            return;
        }
        console.log(result);
        
        this.redirect('#/login');
    
}