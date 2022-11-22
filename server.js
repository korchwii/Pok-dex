const express = require('express');
const app = express();
const Pokemon = require('./models/pokemon.js');
const methodoverride=require('method-override')
app.use (methodoverride('_method'))
app.use(express.urlencoded({extended:false})) 
app.use(express.static('public')) 

// INDEX
app.get('/pokemon', (req, res) => {
res.render('index.ejs', { data: Pokemon });
});

app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs');
    });

// SHOW
app.get('/pokemon/:id', (req, res) => {
res.render('show.ejs', { id:req.params.id,data: Pokemon[req.params.id] });
});

app.listen(3000,()=>{
    console.log('online on port 3000')
})



    app.post('/pokemon', (req, res) => {
        const{
            name,
            type,
            img,
            hp,
            attack,
            defense,
        } =req.body
        const pokemon={
            name:name,
            img:img,
            type:[type],
            stats:{hp,attack,defense}
        }
        Pokemon.push(pokemon)
        res.redirect('/pokemon');
        });

        app.put('/pokemon/:id', (req, res) => {
            const{
                name,
                type,
                img,
                hp,
                attack,
                defense,
            } =req.body;
            const id=req.params.id
            const pokemon={
                name:name,
                img:img,
                type:[type],
                stats:{hp,attack,defense}
            }
            Pokemon[id]=(pokemon)

            res.redirect('/pokemon');
            });

            app.get('/pokemon/:id/edit', (req, res) => {
                res.render('edit.ejs', { id:req.params.id, data: Pokemon[req.params.id] });
                });

            app.delete('/pokemon/:id',(req, res) => {
                Pokemon.splice(req.params.id,1)
                res.redirect('/pokemon');
            })

                