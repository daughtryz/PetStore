
import { getPets } from '../js/data.js';
export default async function dashboard() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        pet: await this.load('./templates/pet/pet.hbs')
    };

    //let allPets = await getPets();
    //console.log('All petss',allPets);
    this.app.userData.allPets = await getPets();
    let context = Object.assign({},this.app.userData);
    // if(this.app.userData.email !== '') {
    //     context = Object.assign({allPets},this.app.userData);
    // } else {
    //     context = allPets;
    // }
    console.log(context);
    this.partial('./templates/dashboard.hbs', context);
}