<?php

function initAuth($userUlid) {
    $sessions = new Models\Sessions;

    $session = generateString(64);
    $sessions->create($session, $userUlid);

    setcookie("session_token", $session, time() + (3600 * 24 * 30), "/");

    return $session;
}

function validateAuth() {
    $sessions = new Models\Sessions;

    if(!$sessions->exists()) {
        throw new Exception("You're not authenticated.");
    }
}

function getUserData($columns) {
    $users = new Models\Users;
    $sessions = new Models\Sessions;

    $id = $sessions->getUserId();

    $data = $users->fetchColumnsById($columns, $id);

    return $data;
}

function validateRecordBelonging($ruid, $uid, $message = 'This record does not belong to you.') {
    $uid = !$uid ? getUserData('id')['id'] : null;

    if($ruid !== $uid) {
        throw new Exception($message);
    }
}

?>