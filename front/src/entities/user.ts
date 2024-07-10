class User {
    protected email: string;
    protected password: string | undefined | null;
    protected lastname: string;
    protected firstname: string;
    protected role: string;

    constructor(
        email: string,
        password: string | undefined | null,
        lastname: string,
        firstname: string,
        role: string,
    ) {
        this.email = email;
        this.password = password;
        this.lastname = lastname;
        this.firstname = firstname;
        this.role = role;
    }
}