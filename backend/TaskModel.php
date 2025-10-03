<?php
class TaskModel {
  private $pdo;

  public function __construct(PDO $pdo) {
    $this->pdo = $pdo;
  }

  public function getRecentTasks(int $limit = 5): array {
    $stmt = $this->pdo->prepare("SELECT id, title, description, created_at FROM task WHERE is_done = 0 ORDER BY created_at DESC LIMIT :limit");
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll();
  }

  public function createTask(string $title, ?string $description = null): int {
    $stmt = $this->pdo->prepare("INSERT INTO task (title, description) VALUES (:title, :description)");
    $stmt->execute([':title' => $title, ':description' => $description]);
    return (int)$this->pdo->lastInsertId();
  }

  public function markTaskDone(int $id): int {
    $stmt = $this->pdo->prepare("UPDATE task SET is_done = 1, completed_at = NOW() WHERE id = :id");
    $stmt->execute([':id' => $id]);
    return $stmt->rowCount();
  }
}
