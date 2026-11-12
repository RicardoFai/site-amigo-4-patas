<?php
// Configurações do Banco de Dados Local (XAMPP)
$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "ong_amigo_4_patas";

// Conexão via PDO
try {
    $pdo = new PDO("mysql:host=$host;dbname=$banco;charset=utf8", $usuario, $senha);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro ao conectar com o banco de dados: " . $e->getMessage());
}

// Verifica se os dados vieram via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = trim($_POST['nome'] ?? '');
    $idade = filter_var($_POST['idade'] ?? 0, FILTER_VALIDATE_INT);
    $cpf = trim($_POST['cpf'] ?? '');
    $telefone = trim($_POST['telefone'] ?? '');
    $moradia = trim($_POST['moradia'] ?? '');
    $endereco = trim($_POST['endereco'] ?? '');
    $motivo = trim($_POST['motivo'] ?? '');

    if (!empty($nome) && !empty($cpf) && !empty($telefone) && !empty($motivo)) {
        $sql = "INSERT INTO adocoes (nome, idade, cpf, telefone, tipo_moradia, endereco, motivo) 
                VALUES (:nome, :idade, :cpf, :telefone, :moradia, :endereco, :motivo)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':idade', $idade);
        $stmt->bindParam(':cpf', $cpf);
        $stmt->bindParam(':telefone', $telefone);
        $stmt->bindParam(':moradia', $moradia);
        $stmt->bindParam(':endereco', $endereco);
        $stmt->bindParam(':motivo', $motivo);

        if ($stmt->execute()) {
            echo "<script>
                    alert('Ficha de adoção enviada e registrada com sucesso!');
                    window.location.href = 'index.html';
                  </script>";
        } else {
            echo "Erro ao registrar o formulário no banco de dados.";
        }
    } else {
        echo "<script>
                alert('Por favor, preencha todos os campos obrigatórios!');
                window.history.back();
              </script>";
    }
} else {
    header("Location: index.html");
    exit();
}
?>