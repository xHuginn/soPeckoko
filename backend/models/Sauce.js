// On créer d'abord un model afin de récupérer les informations que donnent les utilisateurs sur la sauce
const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  // On y inscrit les infos demandés lors du formulaire
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  mainPepper: { type: String, required: true },
  heat: { type: Number, required: true },
  // on initialise les valeurs de like et dislike à 0 afin de pouvoir les récupérer pour la fonction de like
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  // On ajoute un tableau usersLiked et usersDisliked pour les utiliser dans le système de like
  usersLiked: { type: Array, required: true },
  usersDisliked: { type: Array, required: true },
});

module.exports = mongoose.model("Sauce", sauceSchema);

// Une fois fait, on passe au controllers
