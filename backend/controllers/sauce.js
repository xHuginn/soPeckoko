// On récupère le fichier Sauce dans les models et on récupère également le package 'fs' pour les fichiers
const Sauce = require('../models/Sauce')
const fs = require('fs')

// Création d'une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    // On récupère les informations obtenu depuis le frontend et on met à 0 les likes et dislikes ainsi qu'un tableau vide pour les userLiked et les userDisliked
    ...sauceObject,
    like: 0,
    dislike: 0,
    userLiked: [],
    userDisliked: [],
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

// Modification d'une sauce
exports.modifySauce = (req, res, next) => {
  // Utilisation d'une structure ternaire pour dire :
  // S'il y a un fichier 
  const sauceObject = req.file ?
  { 
    // récupérer les infos sur le formulaire pour la sauce
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    // Sinon, récupérer uniquement les données du formulaires (req.body)
   } : { ...req.body }
  //  Met à jour la sauce avec le sauceObjet et l'id de la sauce
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

// Supression d'une sauce
exports.deleteSauce = (req, res, next) => {
  // Trouve la sauce
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      // Récupère le nom du fichier après la route "/images/"
      const filename = sauce.imageUrl.split('/images/')[1];
      // Utilise le unlink du fs pour supprimer l'image
      fs.unlink(`images/${filename}`, () => {
        // Supprime la sauce
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Récupérer une sauce
exports.getOneSauce = (req, res, next) => {
  // Trouve l'ID de la sauce
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  };

// Récupérer toutes les sauces
exports.getAllSauces = (req, res, next) => {
  // Trouve toute les sauces avec find()
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  };

// Système de like
exports.likeSystem = (req, res, next) => {
    const like = req.body.like;

    // On utilise switch pour faire en fonction des cas
        switch(like) {
          case 0:                                                   
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          if (sauce.usersLiked.find( user => user === req.body.userId)) { 
            Sauce.updateOne({ _id: req.params.id }, {         
              $inc: { likes: -1 },                            
              $pull: { usersLiked: req.body.userId }          
            })
              .then(() => { res.status(201).json({ message: "Like enlevé !"}); })
              .catch((error) => { res.status(400).json({error}); });

          } 
          if (sauce.usersDisliked.find(user => user === req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId }
            })
              .then(() => { res.status(201).json({ message: "Dislike enlevé !" }); })
              .catch((error) => { res.status(400).json({error}); });
          }
        })
        .catch((error) => { res.status(404).json({error}); });
      break;

          // Deuxième cas, si like = 1
            case 1:
                  Sauce.updateOne({ _id: req.params.id }, { 
                    // On incrémente 1 dans les likes
                    $inc: { likes: 1 },
                    // On push l'user dans le tableau userLiked
                    $push: { usersLiked: req.body.userId }
                   })
                    .then((result) => 
                    {
                      console.log(result);
                      res.status(200).json({ message: 'Like ajouté !'})
                    })
                    .catch(error => res.status(400).json({ error }));       
            break;   
          // Troisième cas, si like = -1
            case -1:
                  Sauce.updateOne({ _id: req.params.id }, { 
                    // On incrémente 1 dans les dislikes
                    $inc: { dislikes: 1 },
                    // On push l'user dans le tableau userDisliked
                    $push: { usersDisliked: req.body.userId }
                   })
                    .then(() => res.status(200).json({ message: 'Dislike ajouté !'}))
                    .catch(error => res.status(400).json({ error }));       
            break;        
          default:
              console.log(`Désolé, nous n'avons pas compris votre demande`);
        }


};
