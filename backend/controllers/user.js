// On récupère les packages 

// bcrypt pour hacher le mot de passe et ainsi le rendre plus sécurisé
const bcrypt = require('bcrypt');
// jwt pour encoder un nouveau token et ainsi renforcer la sécurité
const jwt = require('jsonwebtoken');
// User pour utiliser le model crée précédemment
const User = require('../models/User');
// Validator pour confirmer l'écriture de l'email et du mdp
const validator = require('validator')

// Fonction pour inscription
exports.signup = (req, res) => {
  // Si l'email est = à false :
  if (validator.isEmail(req.body.email) === false) {
    // Message d'erreur et on arrête la fonction
    res.status(400).json({ message: `L'email n'est pas au bon format`})
    return
  }
  // Si l'email est bon alors :
  // Si le mdp est = à false
  if (validator.isStrongPassword(req.body.password) === false) {
    // Message d'erreur et on arrête la fonction
    res.status(400).json({ message: `Votre mot de passe doit contenir un minimum de 8 caractères, une minuscule, une majuscule, un symbole et un chiffre`})
    return
  }
  // Si c'est bon, on hash le mdp avec bcrypt et on sale le mdp afin d'ajouter des éléments au mdp 
  // pour le sécuriser
  // On effectue 10 "tours" pour sécuriser le mdp. Plus on en fait, mieux c'est mais plus ce sera long
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          // On présice que le mdp est le hash
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Compte créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

// Fonction pour connexion
exports.login = (req, res) => {
  // Même principe que pour le signup : on vérifie si c'est bon afin de fluidifier l'appli
  if (validator.isEmail(req.body.email) === false) {
    res.status(400).json({ message: `L'email n'est pas au bon format`})
    return
  }
  if (validator.isStrongPassword(req.body.password) === false) {
    res.status(400).json({ message: `Votre mot de passe doit contenir un minimum de 8 caractères, une minuscule, une majuscule, un symbole et un chiffre`})
    return
  }
  // Si c'est bon alors on cherche l'email de l'utilisateur
    User.findOne({ email: req.body.email })
      .then(user => {
        // Si on ne le trouve pas on indique un message d'erreur
        if (!user) {
          return res.status(401).json({ error: 'Compte non trouvé !' });
        }
        // Si c'est bon alors on compare le mdp écrit et le mdp enregistré
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            // Si c'est ok alors on logue l'utilisateur
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };