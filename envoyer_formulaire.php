<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
// On active l'affichage des erreurs pour le débogage
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Vérifie si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // ========== 1. CONNEXION À LA BASE DE DONNÉES ==========
    // Remplacez ces valeurs par vos propres informations de connexion
    $servername = "localhost"; // Souvent localhost
    $username = "root"; // Votre nom d'utilisateur DB
    $password = ''; // Votre mot de passe DB
    $dbname = "abirnet_db"; // Le nom de votre base de données

    // Créer la connexion
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Vérifier la connexion
    if ($conn->connect_error) {
        // En cas d'erreur, on arrête tout et on affiche un message
        die("Échec de la connexion à la base de données : " . $conn->connect_error);
    }

    // ========== 2. RÉCUPÉRER ET SÉCURISER LES DONNÉES DU FORMULAIRE ==========
    // htmlspecialchars() est une sécurité de base contre les attaques XSS
    $nom = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $sujet = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Validation simple (vous pouvez ajouter des validations plus complexes)
    if (empty($nom) || empty($email) || empty($sujet) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Veuillez remplir tous les champs correctement.";
        exit;
    }

    // ========== 3. INSÉRER LES DONNÉES DANS LA BASE DE DONNÉES ==========
    // On utilise les requêtes préparées pour se protéger contre les injections SQL
    $stmt = $conn->prepare("INSERT INTO messages (nom, email, sujet, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nom, $email, $sujet, $message);

    if ($stmt->execute()) {
        // L'insertion a réussi
    } else {
        echo "Erreur lors de l'enregistrement du message : " . $stmt->error;
        $stmt->close();
        $conn->close();
        exit;
    }

    // Fermer la connexion à la base de données
    $stmt->close();
    $conn->close();


    // ========== 4. ENVOYER L'EMAIL DE NOTIFICATION ==========
    // ... (tout le code jusqu'à la fermeture de la connexion à la BDD) ...
// $stmt->close();
// $conn->close();

// ========== 4. ENVOYER L'EMAIL DE NOTIFICATION AVEC PHPMailer ==========


// On charge l'autoloader de Composer
require 'vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    //Paramètres du serveur
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'zazaouri@gmail.com'; // VOTRE ADRESSE GMAIL
    $mail->Password   = 'kbpy dczz bhun pbhm';     // LE MOT DE PASSE D'APPLICATION DE 16 CARACTÈRES
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';

    //Destinataires
    $mail->setFrom('zazaouri@gmail.com', 'Site Web ABIRNET'); // L'expéditeur (vous)
    $mail->addAddress('contact@abirnet.ma', 'Contact ABIRNET');    // Le destinataire (peut aussi être vous pour les tests)
    $mail->addReplyTo($email, $nom); // Permet de répondre directement au visiteur

    //Contenu
    $mail->isHTML(false); // On envoie l'email en format texte simple
    $mail->Subject = "Nouveau message de contact : " . $sujet;
    
    $contenu_email = "Vous avez reçu un nouveau message depuis le formulaire de contact.\n\n";
    $contenu_email .= "Nom : " . $nom . "\n";
    $contenu_email .= "Email : " . $email . "\n";
    $contenu_email .= "Sujet : " . $sujet . "\n";
    $contenu_email .= "Message :\n" . $message . "\n";
    
    $mail->Body = $contenu_email;

    $mail->send();
    echo 'Merci ! Votre message a été envoyé avec succès.';
} catch (Exception $e) {
    echo "Désolé, une erreur est survenue lors de l'envoi de l'email. Erreur: {$mail->ErrorInfo}";
}
}
?>