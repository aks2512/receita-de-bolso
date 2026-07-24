CREATE TABLE `recipes` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`file_path` text,
	`time` integer,
	`description` text,
	`category` text NOT NULL,
	`ingredients` text DEFAULT '[]' NOT NULL,
	`steps` text DEFAULT '[]' NOT NULL,
	`created_at` integer NOT NULL
);
