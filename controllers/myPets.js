import {getPets} from '../js/data.js';

export async function myPetsPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        pet: await this.load('./templates/pet/pet.hbs')
    };

    const pets = await getPets();
    this.app.userData.pets = pets.filter(p => this.app.userData.userId === p._ownerId);
    console.log(this.app.userData.pets);
    const context = Object.assign({ }, this.app.userData);
    console.log(context);
    this.partial('./templates/pet/myPets.hbs', context);
}