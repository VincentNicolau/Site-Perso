<?php
    include 'AndroidManager.php';
    
    if (isset($_POST['login']) && isset($_POST['password'])){
        $result = HttpConnRequest($_POST['login'], $_POST['password']);
    
        
        
        $user = new stdClass();
        $user->id = $result['idUtilisateur'];
        $user->email = $result['mailUtilisateur'];
        $user->password = $result['mdpUtilisateur'];
        
        echo json_encode($user);
        
    }
    
    
    if(isset($_POST['addFrais'])){
        $values = [
            'date_note' => $_POST['date_note'],
            'commentaire' => $_POST['commentaire'],
            'distance_km' => $_POST['distance_km']
        ];
        AddNoteFrais($values);
    }
    
    
    if(isset($_POST['getUserSession'])){
        $user = getUserSession($_POST['userEmail']);
        
        $tmp = new stdClass();
        $tmp->id = $user['idUtilisateur'];
        $tmp->nom = $user['nomUtilisateur'];
        $tmp->prenom = $user['prenomUtilisateur'];
        $tmp->email = $user['mailUtilisateur'];
        
        echo json_encode($tmp);
    }
    
    
    if(isset($_POST['getNotesFraisFromUser']) && isset($_POST['userid'])){
        $notes = getNotesFraisForUser($_POST['userid']);
       // var_dump($notes);
        $json = '';
        $tmpNote = new stdClass();
        foreach($notes as $value){
            $tmpNote->codeFrais = $value['codeFrais'];
            $tmpNote->libelleNote = $value['libelleNote'];
            $tmpNote->dateFrais = $value['villeFrais'];
            $tmpNote->dateSoumission = $value['dateSoumission'];
            $tmpNote->commentaireFrais = $value['commentaireFrais'];
            $tmpNote->idUtilisateur = $value['idUtilisateur'];
            $tmpNote->idClient = $value['idClient'];
            $json .= json_encode($tmpNote, JSON_UNESCAPED_UNICODE);
        }
        echo $json;
    }
    
?>
