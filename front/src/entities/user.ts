class User {
    _id: number;
    protected email: string;
    protected password: string | undefined | null;
    protected lastname: string;
    protected firstname: string;
    protected role: string;

    constructor(
        _id: number,
        email: string,
        password: string | undefined | null,
        lastname: string,
        firstname: string,
        role: string,
    ) {
        this._id = _id;
        this.email = email;
        this.password = password;
        this.lastname = lastname;
        this.firstname = firstname;
        this.role = role;
    }

    fullname() {
        return this.lastname + ' ' + this.firstname
    }
}

export {User}