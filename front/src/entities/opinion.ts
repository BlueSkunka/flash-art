import type {Tattooer} from "@/entities/tattooer";
import type {Flash} from "@/entities/flash";
import type {User} from "@/entities/user";

class Opinion {
    _id: number;
    user: User;
    tattooer: Tattooer;
    flash: Flash;
    rate: number;
    commentary: string;
    createdAt: Date;

    constructor(
        _id: number,
        user: User,
        tattooer: Tattooer,
        flash: Flash,
        rate: number,
        commentary: string,
        createdAt: Date
    ) {
        this._id = _id;
        this.user = user;
        this.tattooer = tattooer;
        this.flash = flash;
        this.rate = rate;
        this.commentary = commentary;
        this.createdAt = createdAt;
    }

}

export {Opinion}