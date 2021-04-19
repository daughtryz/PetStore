import { logout as apiLogout } from '../js/data.js';
import { getPets } from '../js/data.js';
export default async function logout() {
        const result = await apiLogout();
        console.log(result);
        this.app.userData.userId = '';
        this.app.userData.email = '';
        this.app.userData.allPets = await getPets();
        this.redirect('#/dashboard');
}