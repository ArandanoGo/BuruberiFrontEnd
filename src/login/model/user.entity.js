//id,username,password
export class UserEntity {
    constructor({
                    id = null,
                    username = '',
                    password = '',
                    rol = ''
                } = {}) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.rol = rol;
    }
}
