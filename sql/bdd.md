 aTables Structures
=================


#### Utilisateur 
- Id
- nom
- prénom
- pseudo
- Email
- Password
- dateNaissance
- dateInscription
(pas de redondence avec les id des publications etc...)

#### MurPublication
- Id
- émetteurId
- récepteurId 
- dateTime
- contenuPrincipal
- commentaire
- participantDesCommentaireListId (soit les id des users qui participe à la publication)   


#### MessageChat
- id 
- dateTime
- utilisateurListeId (soit les id des participants des MP)
- messages (les conversations)


#### Galleries
- id
- auteurId
- dateTime
- nom
- legende
- photosListID


#### Photos
- id
- GallerieId
- auteurId
- DateTime
- Legende
- Commentaire
- participantDesCommentaireListId (soit les id des users qui participe à la publication)   



### Geolocalisation ??? api Google

