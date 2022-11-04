import { getConnection } from "../database/database";
var cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const addLanguages = async (req, res)=>{
    try{
        const { name, programers } = req.body;
        if(name === undefined || programers === undefined){
            res.status(400).json({ message:"Bad Request. Please fill all fields" });
        }
        const languages={ name, programers };
        const connection = await getConnection();
        await connection.query("INSERT INTO languages SET ?", languages)
        res.json({ message: "Language added successfully" });
    }catch(error){
        res.status(500).send(error.message);
    }
}

const getLanguages = async (req, res)=>{
    try{
        const connection = await getConnection();
        const query = await connection.query("SELECT id, name, programers from languages")
        res.json(query);
    }catch(error){
        res.status(500).send(error.message);
    }
}

const getLanguageById = async (req, res)=>{
    try{
        // console.log(req.params);
        const {id} = req.params;
        const connection = await getConnection();
        const query = await connection.query("SELECT id, name, programers from languages where id = ?", id);
        res.json(query);
    }catch(error){
        res.status(500).send(error.message);
    }
}

const updateLanguage = async (req, res)=>{
    try{
        const { id } = req.params;
        const { name, programers } = req.body;

        if(id === undefined || name === undefined || programers === undefined){
            res.status(400).json({ message:"Bad Request. Please fill all fields" });
        }

        const language = { name, programers };
        const connection = await getConnection();
        const query = await connection.query("UPDATE languages SET ? where id = ?", [language, id]);
        res.json(query);
    }catch(error){
        res.status(500).send(error.message);
    }
}

const deleteLanguage = async (req, res)=>{
    try{
        // console.log(req.params);
        const {id} = req.params;
        const connection = await getConnection();
        const query = await connection.query("Delete from languages where id = ?", id);
        res.json(query);
    }catch(error){
        res.status(500).send(error.message);
    }
}

const uploadPdf = async (req, res) => {
    // console.log(req.files)
    // console.log(req.files.file.tempFilePath)
    cloudinary.uploader.upload(req.files.file.tempFilePath, async (error, result) => { console.log(result, error); });
    res.json("File uploaded successfully");
}

export const methods = {
    addLanguages,
    getLanguages,
    getLanguageById,
    updateLanguage,
    deleteLanguage,
    uploadPdf
};