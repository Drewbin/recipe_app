module.exports = {

    getAll: (req, res) => {
        const dbInstance = req.db;

        dbInstance.get_recipes().then( (recipes) => {
            res.status(200).send(recipes)
        }).catch(aerr => {
            res.status(500).send('Failed to list recipes.')
            console.error(err);
        })
    }, 
    
    create: (req, res) => {
        const dbInstance = req.db;
        const { stuff, goes, here } = req.body;

        dbInstance.create_recipe([ stuff, goes, here ]).then( () => {
            res.status(200).send('Recipe added')
        }).catch(err => {
            res.status(500).send('Failed to add recipe')
            console.error(err);
        })
    },

    getOne: (req, res) => {
        const dbInstance = req.db;
        const { params } = req;

        dbInstance.read_recipe(params.id).then( (recipe) => {
            res.status(200).send(recipe[0])
        }).catch(err => {
            res.status(500).send('Failed to find recipe.');
            console.error(err);
        })
    },

    delete: (req, res) => {
        const dbInstance = req.db;
        const { params } = req

        dbInstance.delete_recipe(params.id).then( () => {
            res.status(200).send('Recipe deleted.')
        }).catch(err => {
            res.status(500).send('Failed to delete recipe')
            console.error(err)
        })
    },

    
}