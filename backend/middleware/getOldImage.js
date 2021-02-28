// On récupère le model de la sauce
const Sauce = require("../models/Sauce");
// On récupère les fichiers via fs
const fs = require("fs");

// fonction qui supprime l'image
// Elle sera utilisé si un utilisateur change une image lors d'une modification d'une sauce
// afin de ne pas garder l'ancienne image et de toujours garder la l'image actuelle
function isOldImageDeleted(name) {
  fs.unlink(`images/${name}`, function (e) {
    if (e) {
      throw e;
    }
  });
  return true;
}

// On cherche la sauce et on demande si isOldImageDeleted = true
// Si c'est exact, alors on supprime l'image
exports.deleteOldImage = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const name = sauce.imageUrl.split("/images/")[1];
      if (isOldImageDeleted(name) === true) {
        next();
      } else {
        res.status(400).json({ error });
      }
    })
    .catch((error) => res.status(501).json({ error }));
};
