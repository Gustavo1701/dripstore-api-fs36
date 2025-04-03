import authConfig from "../config/auth.config.js";
import Papel from "../models/papel.model.js";
import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginService = {
    cadastrar: async (req, res) => {
        const { nome, cpf, email, senha } = req.body;
        try {
            //Create neu user
            const senhaEncriptada = await bcrypt.hash(senha, 10);
            const usuario = await Usuario.create({
                nome: nome,
                cpf: cpf,
                email: email,
                senha: senhaEncriptada,
            });
            const papel = await Papel.findOne({ where: { nome: "Usuário" } });
            await usuario.setPapel([papel]); //Set [alias no model do relacionamento]

            res.status(201).json({
                message: "Usuário cadastrado com sucesso!",
                data: usuario
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    login: async(req, res) => {
        const {email, senha} = req.body;
        try{
            //Find usuario by username
            const usuario = await Usuario.findOne({
                where: {
                    email: email,
                },
                //atributes: { exclude: ["senha"] }, Exclui o compo "senha" do resultado
            });

            if(!usuario){
                return res.status(404).json({ message: "Usuário(a) não encontrado(a)."})
            } 

            // Validate password
            const senhaEhInvalida = await bcrypt.compare(senha, usuario.senha);

            if(!senhaEhInvalida){
                return res.status(401).json({
                    token: null,
                    message: "Senha Inválida!",
                });
            }

            //Generate JWT
            const token = jwt.sign({ id: usuario.id }, authConfig.secret, {
                expiresIn: 86400, //24 hours    
            });

            delete usuario.dataValues.senha;

            res.status(200).json({
                ...usuario.dataValues,
                token: token,
            });

        } catch (error) {
            console.log(`ERROR: ${error.message}`);
            res.status(500).json({message: error.message });            
        }
    }

}