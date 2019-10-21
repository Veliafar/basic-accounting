export class AuthService {

    private isAuthenticated = false;

    constructor() {}

    login() {
        this.isAuthenticated = true;
    }

    logout() {
        this.isAuthenticated = false;
        window.localStorage.clear();
    }

    get isLoggedIn(): boolean {
        return this.isAuthenticated;
    }
}