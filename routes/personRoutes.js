const router = require('express').Router();
const Person = require('../models/Person');

router.post('/', async (req, res) => {

    const {name, salary, approved} = req.body;

    if(!name){
        res.status(422).json({error: 'O nome é obrigatório'});
        return;
    };
    if(!salary){
        res.status(422).json({error: 'O salário é obrigatório'});
        return;
    };

    const person = {
        name, 
        salary,
        approved,
    };

    try{
        await Person.create(person);
        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'});
        return;

    } catch(error){
        res.status(500).json({error: error});
        return;
    };
});

router.get('/', async (req, res) => {

    try{
        const person = await Person.find();
        res.status(200).json(person);
        return;

    } catch(error){
        res.status(500).json({error: error});
        return;
    };
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    
    try{
        const person = await Person.findOne({ _id: id});
        if(!person){
            res.status(422).json({message: 'usuário não foi encontrado!'});
            return;
        }
        res.status(200).json(person);
        return;

    } catch(error){
        res.status(500).json({error: error});
        return;
    };
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    const {name, salary, approved} = req.body;
    const person = {
        name, 
        salary,
        approved,
    };

    try{
        const updatedPerson = await Person.updateOne({ _id: id}, person);

        if(updatedPerson.matchedCount === 0 ){
            res.status(422).json({message: 'usuário não foi encontrado!'});
            return;
        }
        res.status(200).json(person);
        return;

    } catch(error){
        res.status(500).json({error: error});
        return;
    };
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    const {name, salary, approved} = req.body;
    const person = {
        name, 
        salary,
        approved,
    };

    for (const chave in person) {
        if (person.hasOwnProperty(chave)) {
            if(person[chave] == null || person[chave] == ""){
                res.status(422).json({message: 'Preencha todos os campos!'});
            }
        }
      }
    
    try{
        const updatedPerson = await Person.updateOne({ _id: id}, person);

        if(updatedPerson.matchedCount ===0 ){
            res.status(422).json({message: 'usuário não foi encontrado!'});
            return;
        }
        res.status(200).json(person);
        return;

    } catch(error){
        res.status(500).json({error: error});
        return;
    };
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    
    try{
        const person = await Person.deleteOne({ _id: id});
        if(!person){
            res.status(422).json({message: 'Usuário não foi encontrado!'});
            return;
        }
        res.status(200).json(person);
        return;

    } catch(error){
        res.status(500).json({error: error});
        return;
    };
});



function validarCamposPatch(reqArray, newArray) {
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false; 
      }
    }
  
    return true; 
  }

module.exports = router;