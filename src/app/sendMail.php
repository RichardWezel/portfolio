<?php

/**
 * Sends contact form submissions as an e-mail.
 *
 * All user input is validated and sanitized before it is used:
 * - CR/LF characters are removed from anything that ends up in a mail header
 *   (prevents header injection, e.g. injected "Bcc:" lines).
 * - The e-mail address is validated with filter_var().
 * - Name and message are HTML-escaped because the mail body is sent as HTML.
 */

const RECIPIENT = 'kontakt@richard-wezel.de';
const SENDER = 'noreply@richard-wezel.de';
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const ALLOWED_ORIGINS = [
    'https://richard-wezel.de',
    'https://www.richard-wezel.de',
];

/** Sends the CORS header only for the portfolio's own origins. */
function allowOwnOrigin(): void
{
    header('Vary: Origin');
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, ALLOWED_ORIGINS, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    }
}

function respond(int $status, array $body): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($body);
    exit;
}

/** Removes line breaks and other control characters that could start a new header line. */
function stripHeaderChars(string $value): string
{
    return trim(preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value) ?? '');
}

function escapeHtml(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'OPTIONS': // Allow preflighting to take place.
        allowOwnOrigin();
        header('Access-Control-Allow-Methods: POST');
        header('Access-Control-Allow-Headers: content-type');
        exit;

    case 'POST': // Send the e-mail.
        allowOwnOrigin();

        // The payload is not sent to $_POST, it arrives as raw JSON text.
        $params = json_decode(file_get_contents('php://input'), true);
        if (!is_array($params)) {
            respond(400, ['success' => false, 'error' => 'Invalid request body.']);
        }

        $name = is_string($params['name'] ?? null) ? stripHeaderChars($params['name']) : '';
        $email = is_string($params['email'] ?? null) ? trim($params['email']) : '';
        $message = is_string($params['message'] ?? null) ? trim($params['message']) : '';

        if ($name === '' || mb_strlen($name) > MAX_NAME_LENGTH) {
            respond(422, ['success' => false, 'error' => 'Invalid name.']);
        }
        // filter_var rejects addresses containing CR/LF, so the address is safe for headers.
        if (mb_strlen($email) > MAX_EMAIL_LENGTH || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            respond(422, ['success' => false, 'error' => 'Invalid e-mail address.']);
        }
        if ($message === '' || mb_strlen($message) > MAX_MESSAGE_LENGTH) {
            respond(422, ['success' => false, 'error' => 'Invalid message.']);
        }

        $subject = '=?UTF-8?B?' . base64_encode('Kontaktanfrage von ' . $name) . '?=';

        $body = 'From: ' . escapeHtml($name) . ' &lt;' . escapeHtml($email) . '&gt;'
            . '<br><br><br>Die Nachricht lautet:<br><br>'
            . nl2br(escapeHtml($message));

        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=utf-8',
            'From: ' . SENDER,
            'Reply-To: ' . $email,
        ];

        if (!mail(RECIPIENT, $subject, $body, implode("\r\n", $headers))) {
            respond(500, ['success' => false, 'error' => 'Mail could not be sent.']);
        }

        respond(200, ['success' => true]);

    default: // Reject any non POST or OPTIONS requests.
        header('Allow: POST, OPTIONS', true, 405);
        exit;
}
