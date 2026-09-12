<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "apox4454_wedding", "Jakarta26!", "apox4454_weddingsw");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Gagal terhubung ke database"]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

// GET: Ambil seluruh ucapan persis query route.ts
if ($method === 'GET') {
    $sql = "SELECT id, name, attendance, message, relationship, created_at AS createdAt FROM wishes ORDER BY created_time DESC";
    $result = $conn->query($sql);

    $rows = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
    }

    header("Cache-Control: no-store, max-age=0");
    echo json_encode($rows);
    exit;
}

// POST: Simpan data tamu persis route.ts
if ($method === 'POST') {
    $raw = file_get_contents("php://input");
    $body = json_decode($raw, true);

    $name = trim($body['name'] ?? '');
    $message = trim($body['message'] ?? '');

    if (empty($name) || empty($message)) {
        http_response_code(400);
        echo json_encode(["error" => "Nama dan ucapan doa wajib diisi."]);
        exit;
    }

    $id = !empty($body['id']) ? $body['id'] : 'wish-' . round(microtime(true) * 1000);
    $attendance = $body['attendance'] ?? 'Hadir (1 Orang)';
    $relationship = $body['relationship'] ?? 'Tamu Undangan';
    $createdAt = $body['createdAt'] ?? 'Baru saja';

    $stmt = $conn->prepare("
        INSERT INTO wishes (id, name, attendance, message, relationship, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        name = VALUES(name), 
        attendance = VALUES(attendance), 
        message = VALUES(message)
    ");

    $stmt->bind_param("ssssss", $id, $name, $attendance, $message, $relationship, $createdAt);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "data" => [
                "id" => $id,
                "name" => $name,
                "attendance" => $attendance,
                "message" => $message,
                "relationship" => $relationship,
                "createdAt" => $createdAt
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Gagal menyimpan ke database server"]);
    }
    $stmt->close();
}

$conn->close();
