
import { createPet, getPets, getPetById, updatePet,deletePet as apiDelete,likePet as apiLikePet,totalLikes as apiTotalLikes,isUserLiked as apiIsUserLiked } from '../js/data.js';

const likes = [];
export async function likePet() {
     const petId = this.params.id;

    const res = await apiLikePet(petId);
    const isUserLiked = await apiIsUserLiked(this.app.userData.userId,petId);
    console.log(res);
    console.log(likes);
    console.log('is this dude liked ',isUserLiked);
    
    if(isUserLiked) {
        likes.isLiked = true;
    }
    var currentLike = likes.find(l => l._id == apiTotalLikes(petId)._id);
    if(currentLike !== undefined) {
        currentLike.count++;
    } else {
        likes.push(await apiTotalLikes(petId));
        likes.count = 1;
    }


}

export async function details() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    const petId = this.params.id;
    
    let pet = await getPetById(petId);

    if(pet._ownerId == this.app.userData.userId) {
        this.app.userData.hasOwnPet = true;
    }


    const context = Object.assign({ likes,pet, origin: encodeURIComponent('#/details/' + petId) }, this.app.userData);
    console.log(context);
    this.partial('./templates/pet/details.hbs', context);
    this.app.userData.hasOwnPet = false;
}
//delete pet
export async function deletePet() {
    if (confirm('Are you sure you want to delete this pet?') == false) {
        return;
    }
    const petId = this.params.id;
    const result = await apiDelete(petId);
    this.redirect('#/dashboard');
}

export async function edit() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    const petId = this.params.id;
   
     let pet = await getPetById(petId);
    const context = Object.assign({ pet }, this.app.userData);

    this.partial('./templates/pet/edit.hbs', context);
}

export async function editPost() {
    const petId = this.params.id;

    if (this.params.name == '' || this.params.imageUrl == '' 
    || this.params.description == '' || this.params.type == '') {
        showError('No empty fields!');
        return;
    }

    const pet = {
        name: this.params.name,
        imageUrl: this.params.imageUrl,
        description: this.params.description,
        type: this.params.type
        
    };
        const result = await updatePet(petId, pet);
       
        console.log(result);

        this.redirect('#/details/' + result._id);    
}

export async function create() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    this.partial('./templates/pet/create.hbs', this.app.userData);
}

export async function createPost() {
    if (this.params.name == '' || this.params.imageUrl == '' 
    || this.params.description == '' || this.params.type == '') {
        alert('No empty fields!');
        return;
    }
    // name,
    // description,
    // imageUrl
    // type
    const pet = {
        name: this.params.name,
        imageUrl: this.params.imageUrl,
        description: this.params.description,
        type: this.params.type
    };

    const result = await createPet(pet);
    if(result.code === 400) {
        alert(result.message);
        return;
    }
    console.log(result);
    this.redirect('#/dashboard');
}