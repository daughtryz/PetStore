function host(endpoint) {
    return `http://localhost:3030/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    PETS: 'data/pets?sortBy=_createdOn%20desc',
    PET_BY_ID: 'data/pets/',
    PETS_BY_OWNERID: `data/pets?where=_ownerId%3D%22{userId}%22&sortBy=_createdOn%20desc`,
    LIKES: 'data/likes',
    TOTAL_LIKES: 'data/likes?where=petId%3D%22{petId}%22&distinct=_ownerId&count',
    IS_USER_LIKED: 'data/likes?where=petId%3D%22{petId}%22%20and%20_ownerId%3D%22{userId}%22&count'
};

export async function isUserLiked(userId,petId) {
    var filteredQuery = endpoints.IS_USER_LIKED.replace('{petId}',petId);
    //var filteredQuery = endpoints.TOTAL_LIKES.replace('{userId}',userId);
    var finalQuery = endpoints.TOTAL_LIKES.replace('{userId}',userId);
    const result = (await fetch(host(finalQuery))).json();

    return result;
}

export async function totalLikes(petId) {
    const token = localStorage.getItem('accessToken');

    var filteredQuery = endpoints.TOTAL_LIKES.replace('{petId}',petId);
    const result = (await fetch(host(filteredQuery))).json();

    return result;

}

export async function likePet(petId) {
    const token = localStorage.getItem('accessToken');

    const result = await (await fetch(host(endpoints.LIKES), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({
            petId
        })
    })).json();



    return result;
}

export async function register(email,password) {
    console.log(host(endpoints.REGISTER))
    const result = (await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })).json();
    console.log(result);

    return result;
}

export async function login(email, password) {

    const result = await (await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })).json();
    console.log(result);

    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('email', result.email);
    localStorage.setItem('userId', result._id);

    return result;
}

export async function logout() {

    const token = localStorage.getItem('accessToken');
    
    localStorage.removeItem('accessToken');

    const result = fetch(host(endpoints.LOGOUT), {
        headers: {
            'X-Authorization': token
        }
    });


    return result;
}
//add pet
export async function createPet(pet) {

    const token = localStorage.getItem('accessToken');

    const result = (await fetch(host(endpoints.PETS), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(pet)
    })).json();

    console.log(result);
    return result;
}

// get pet by ID
export async function getPetById(id) {

    const token = localStorage.getItem('accessToken');

    const result = (await fetch(host(endpoints.PET_BY_ID + id))).json();
    console.log('my current token',token);

    return result;
}

// edit pet
export async function updatePet(id, updatedProps) {

    const token = localStorage.getItem('accessToken');
    console.log(id);
    const result = (await fetch(host(endpoints.PET_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(updatedProps)
    })).json();

    //console.log(result);

    return result;
}

// delete pet
export async function deletePet(id) {

    const token = localStorage.getItem('accessToken');

    const result = (await fetch(host(endpoints.PET_BY_ID + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
    })).json();


    return result;
}

export async function getPets() {

    const token = localStorage.getItem('accessToken');

    let result;
    console.log("access token ->", token);
    //const pagingQuery = `pageSize=9&offset=${(page-1)*9}`;

    // if (!search) {
    //     result = (await fetch(host(endpoints.MOVIES + '?' + pagingQuery), {
    //         headers: {
    //             'user-token': token
    //         }
    //     })).json();
    // } else {
        result = (await fetch(host(endpoints.PETS))).json();
    //}


    return result;
}