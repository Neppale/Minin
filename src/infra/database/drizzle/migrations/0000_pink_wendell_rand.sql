CREATE TABLE `clicks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`url_id` text NOT NULL,
	`clicked_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`ip_address` text,
	`country` text,
	`user_agent` text,
	`browser` text,
	`os` text,
	`device_type` text,
	FOREIGN KEY (`url_id`) REFERENCES `urls`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `urls` (
	`id` text PRIMARY KEY NOT NULL,
	`original_url` text NOT NULL,
	`expiration_date` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
