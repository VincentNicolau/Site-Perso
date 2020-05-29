<?php
    global $db;
    $db = new PDO('mysql:host=e91099-mysql.services.easyname.eu;dbname=u143944db1;charset=utf8', 'u143944db1', '12345678*');

function HttpConnRequest($email, $password){
    global $db;
    $SQL = 'SELECT * FROM Utilisateur WHERE mailUtilisateur = :email AND mdpUtilisateur = :mdp';
    
    $req = $db->prepare($SQL);
    $req->bindValue('email', $email, PDO::PARAM_STR);
    $req->bindValue('mdp', $password, PDO::PARAM_STR);
    $req->execute();
    return $req->fetch();
}


function AddNoteFrais($values){
    global $db;
    
    $SQL = "INSERT INTO note_frais (date_note, commentaire) VALUES (:date, :comment, :noteclient)";
    $req = $db->prepare($SQL);
    $req->bindValue('date', $values['date_note'], PDO::PARAM_STR);
    $req->bindValue('comment', $values['commentaire'], PDO::PARAM_STR);
    $exec = $req->execute();
    
    
        $sql = "INSERT INTO frais_kilometrique (distance_km, numero_note) VALUES (:distance, 1)";
        $req = $db->prepare($sql);
        $req->bindValue('distance', $values['distance_km'], PDO::PARAM_INT);
        $req->execute();
}


function getUserSession($email){
    global $db;
    $SQL = "SELECT * FROM Utilisateur WHERE mailUtilisateur = :email";
    $req = $db->prepare($SQL);
    $req->bindValue('email', $email, PDO::PARAM_STR);
    $req->execute();
    return $req->fetch();
}

function getNotesFraisForUser($id){
    global $db;
    
    $SQL = "SELECT * FROM NoteDeFrais WHERE idUtilisateur = :id ";
    $req = $db->prepare($SQL);
    $req->bindValue('id', $id, PDO::PARAM_INT);
    $req->execute();
    $result = $req->fetchAll();
    return $result;
}




