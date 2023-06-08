<?php

namespace OCA\Text\Middleware\Attribute;

use Attribute;

#[Attribute(Attribute::TARGET_METHOD)]
class RequireDocumentSession {
}
