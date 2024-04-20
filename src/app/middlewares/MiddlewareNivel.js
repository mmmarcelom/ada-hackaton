const jwt = require("jsonwebtoken");


class MiddlewareNivel {
    _nivel_acesso = 0;

    constructor (nivel_acesso){
        this._nivel_acesso = nivel_acesso;
        this.execute = this.execute.bind(this);
    }

    get nivel_acesso (){
        return this._nivel_acesso;
    }

    set nivel_acesso(novo_nivel){
        this._nivel_acesso = novo_nivel;
    }
    async execute(req, res, next){
        const authorizationHeader = req.header("Authorization");
        const accessToken = authorizationHeader.split(" ")[1];
        const dados = jwt.decode(accessToken);
        if(dados.email === process.env.SUPERUSER && dados.senha === process.env.PASSWORD_SUPERUSER){
            next();
        }
        else if(parseInt(dados.nivel_acesso) < this.nivel_acesso){
            res.status(403).send({mensagem: `ERRO! O usuário ${dados.nome} possui nível de acesso ${dados.nivel_acesso}. O nível de acesso mínimo para esta rota é ${this.nivel_acesso}`})
        } else {
            next();
        }
    }

    

}

const middlewareNivel_1 = new MiddlewareNivel(1);
const middlewareNivel_2 = new MiddlewareNivel(2);
const middlewareNivel_3 = new MiddlewareNivel(3);
const middlewareNivel_4 = new MiddlewareNivel(4);
const middlewareNivel_5 = new MiddlewareNivel(5);


module.exports = {middlewareNivel_1, middlewareNivel_2, middlewareNivel_3, middlewareNivel_4, middlewareNivel_5};