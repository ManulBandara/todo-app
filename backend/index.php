<?php
// index.php - robust router that handles calls to:
//  - /todo-app/backend/index.php/tasks
//  - /todo-app/backend/tasks
//  - /backend/tasks  (if placed at different path)
// It normalizes the path so routing works on common Apache setups.

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/TaskModel.php';

$model = new TaskModel($pdo);
$method = $_SERVER['REQUEST_METHOD'];

// Determine path in a robust way
$path = '/';
if (!empty($_SERVER['PATH_INFO'])) {
  // PATH_INFO exists when request is /index.php/tasks
  $path = $_SERVER['PATH_INFO'];
} else {
  // fallback to using REQUEST_URI minus script name or base dir
  $requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);    // e.g. /todo-app/backend/index.php/tasks or /todo-app/backend/tasks
  $scriptName = $_SERVER['SCRIPT_NAME'];                             // e.g. /todo-app/backend/index.php
  // Remove script name if present
  if (strpos($requestUri, $scriptName) === 0) {
    $path = substr($requestUri, strlen($scriptName));
  } else {
    // Remove base directory (dirname of script)
    $baseDir = rtrim(dirname($scriptName), '/'); // e.g. /todo-app/backend
    if ($baseDir !== '' && strpos($requestUri, $baseDir) === 0) {
      $path = substr($requestUri, strlen($baseDir));
    } else {
      $path = $requestUri;
    }
  }
}
$path = '/' . ltrim($path, '/'); // normalize like '/tasks' or '/tasks/3/done'


// ROUTES
// GET /tasks  -> list latest 5 tasks (not done)
if ($path === '/tasks' && $method === 'GET') {
  echo json_encode($model->getRecentTasks(5));
  exit;
}

// POST /tasks -> create task
if ($path === '/tasks' && $method === 'POST') {
  $raw = file_get_contents('php://input');
  $data = json_decode($raw, true);
  if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload']);
    exit;
  }

  $title = trim((string)($data['title'] ?? ''));
  $description = trim((string)($data['description'] ?? ''));

  if ($title === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Title is required']);
    exit;
  }

  $id = $model->createTask($title, $description);
  http_response_code(201);
  echo json_encode(['id' => $id]);
  exit;
}

// POST /tasks/{id}/done -> mark done
if (preg_match('#^/tasks/(\d+)/done$#', $path, $matches) && $method === 'POST') {
  $id = (int)$matches[1];
  $updated = $model->markTaskDone($id);
  echo json_encode(['updated' => (int)$updated]);
  exit;
}


// If nothing matched -> 404 with helpful debug path
http_response_code(404);
echo json_encode(['error' => 'Endpoint not found', 'path' => $path]);
exit;
