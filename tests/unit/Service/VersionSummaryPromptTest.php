<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use Test\TestCase;

class VersionSummaryPromptTest extends TestCase {
	private const string BEFORE = "# Plan\n\nThe pilot runs 2 weeks.\n";
	private const string AFTER = "# Plan\n\nThe pilot runs 3 weeks.\n";

	private static function input(string $before = self::BEFORE, string $after = self::AFTER): string {
		return VersionSummaryPrompt::request($before, $after)['input'];
	}

	public function testPutsBothTextsBetweenMarkers(): void {
		$request = VersionSummaryPrompt::request(self::BEFORE, self::AFTER, '0123456789ab');

		$this->assertSame("BEFORE:\n<<<BEGIN-0123456789ab>>>\n" . self::BEFORE . "\n<<<END-0123456789ab>>>\n\nAFTER:\n<<<BEGIN-0123456789ab>>>\n" . self::AFTER . "\n<<<END-0123456789ab>>>\n\nWrite the summary in the language of the AFTER version, and end it with </summary>.", $request['input']);
		$this->assertSame([], $request['history']);
	}

	public function testMarksEachRequestWithANewNonce(): void {
		preg_match_all('/<<<(?:BEGIN|END)-([0-9a-f]+)>>>/', self::input(), $first);
		preg_match_all('/<<<(?:BEGIN|END)-([0-9a-f]+)>>>/', self::input(), $second);

		$this->assertCount(4, array_filter($first[1], fn (string $nonce) => strlen($nonce) === 12 && $nonce === $first[1][0]));
		$this->assertNotSame($first[1][0], $second[1][0]);
	}

	public function testStripsAByteOrderMark(): void {
		$input = self::input("\xEF\xBB\xBF" . self::BEFORE);

		$this->assertStringContainsString(">>>\n" . self::BEFORE . "\n<<<", $input);
		$this->assertStringNotContainsString("\xEF\xBB\xBF", $input);
	}

	public static function dataAnswersWithTheListOfEdits(): array {
		return [
			'list first' => ["<changes>\n- \"2 weeks\" to \"3 weeks\": meaning\n</changes>\n\nThe pilot runs 3 weeks instead of 2.\n</summary>"],
			'list after the summary' => ["The pilot runs 3 weeks instead of 2.\n</summary>\n<changes>\n- \"2 weeks\" to \"3 weeks\": meaning\n</changes>"],
			'list in capitals' => ["<CHANGES>\n- pilot: meaning\n</CHANGES>\nThe pilot runs 3 weeks instead of 2.\n</SUMMARY>"],
			'list cut off after the summary' => ["The pilot runs 3 weeks instead of 2.\n</summary>\n\n<changes>\n- \"2 weeks\""],
			'summary between both tags' => ["<changes>\n- pilot: meaning\n</changes>\n<summary>\nThe pilot runs 3 weeks instead of 2.\n</summary>\n"],
			'list without its opening tag' => ["1. meaning: pilot 2 weeks to 3 weeks\n2. minor: typo\n</changes>\nThe pilot runs 3 weeks instead of 2.\n</summary>"],
		];
	}

	/**
	 * @dataProvider dataAnswersWithTheListOfEdits
	 */
	public function testReadsTheSummaryWithoutTheListOfEdits(string $answer): void {
		$this->assertSame('The pilot runs 3 weeks instead of 2.', VersionSummaryPrompt::summary($answer, self::input()));
	}

	public function testShowsTheAnswerOfCoresFakeProvider(): void {
		$request = VersionSummaryPrompt::request(self::BEFORE, self::AFTER);
		$echo = "This is a fake response message: \n\n- System prompt: " . $request['system_prompt'] . "\n- Input message: " . $request['input'] . "\n- Message history:\n0 messages";

		$this->assertNotNull(VersionSummaryPrompt::summary($echo, $request['input']));
	}

	public static function dataRejectedAnswers(): array {
		return [
			'empty' => ["  \n </summary>"],
			'too long' => [str_repeat('a', 4001) . "\n</summary>"],
			'a link to elsewhere' => ["See https://evil.example/x for details.\n</summary>"],
			'a bare link to elsewhere' => ["See www.evil.example for details.\n</summary>"],
			'no closing tag' => ['The pilot runs 3 weeks instead of 2.'],
			'only the list of edits' => ["<changes>\n- pilot: meaning\n</changes>"],
			'cut off in the list of edits' => ["<changes>\n- \"2 weeks\" to"],
			'cut off in the summary' => ["<changes>\n- fee: meaning\n</changes>\nThe fee increases.\n\nFee\n- From 50 EUR to"],
		];
	}

	/**
	 * @dataProvider dataRejectedAnswers
	 */
	public function testRejectsAnswersItCannotShow(string $answer): void {
		$this->assertNull(VersionSummaryPrompt::summary($answer, self::input()));
	}

	public function testShowsASummaryAtTheLengthLimit(): void {
		$this->assertSame(str_repeat('a', 4000), VersionSummaryPrompt::summary(str_repeat('a', 4000) . "\n</summary>", self::input()));
	}

	public static function dataLinksInTheTexts(): array {
		return [
			'ending a sentence' => ["The board link https://example.com/board/7. was added.\n</summary>"],
			'in emphasis' => ["The board link **https://example.com/board/7** was added.\n</summary>"],
			'in quotes' => ["The board link “https://example.com/board/7” was added.\n</summary>"],
		];
	}

	/**
	 * @dataProvider dataLinksInTheTexts
	 */
	public function testKeepsLinksThatAreInTheTexts(string $answer): void {
		$this->assertNotNull(VersionSummaryPrompt::summary($answer, self::input(self::BEFORE, self::AFTER . "Board: https://example.com/board/7\n")));
	}

	public static function dataLinkChanges(): array {
		return [
			'in a language without spaces' => ['リンクがhttps://example.com/docsからhttps://example.com/guideに変わりました。', true],
			'in full-width brackets' => ['ガイドは（https://example.com/guide）に変更', true],
			'with a scheme the text leaves out' => ['The guide moved to https://www.example.com/guide.', true],
			'with a trailing slash' => ['The guide moved to https://example.com/guide/.', true],
			'to another address' => ['The guide moved to https://example.com/gu1de.', false],
			'cut short' => ['The docs are at https://example.com/doc.', false],
			'ending in another non-Latin letter' => ['The page moved to https://example.com/мил.', false],
			'going on to another host after a letter of a language without spaces' => ['ガイドはhttps://example.com/guide中.evil.example/?q=1に変更', false],
		];
	}

	/**
	 * @dataProvider dataLinkChanges
	 */
	public function testChecksLinksAgainstTheTexts(string $summary, bool $shown): void {
		$input = self::input(self::BEFORE . "Docs: https://example.com/docs and https://example.com/миа\n", self::AFTER . "Guide: www.example.com/guide\n");

		$this->assertSame($shown ? $summary : null, VersionSummaryPrompt::summary($summary . "\n</summary>", $input));
	}
}
