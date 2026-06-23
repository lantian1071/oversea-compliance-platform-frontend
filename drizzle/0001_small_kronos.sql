CREATE TABLE `chat_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(128) NOT NULL,
	`userId` int,
	`role` enum('user','assistant') NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `knowledge_articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(512) NOT NULL,
	`content` text NOT NULL,
	`category` varchar(128),
	`country` varchar(128),
	`tags` text,
	`isPublished` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `knowledge_articles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `service_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`userName` varchar(128),
	`userEmail` varchar(320),
	`supplierId` int NOT NULL,
	`supplierName` varchar(255),
	`title` varchar(512) NOT NULL,
	`description` text,
	`targetCountry` varchar(128),
	`serviceType` varchar(128),
	`budget` varchar(128),
	`status` enum('pending','contacted','in_progress','completed','cancelled') NOT NULL DEFAULT 'pending',
	`platformFee` decimal(10,2),
	`feeSettled` boolean DEFAULT false,
	`adminNote` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `service_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `suppliers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`companyName` varchar(255) NOT NULL,
	`companyNameEn` varchar(255),
	`contactName` varchar(128) NOT NULL,
	`contactEmail` varchar(320) NOT NULL,
	`contactPhone` varchar(64),
	`website` varchar(512),
	`description` text,
	`serviceTypes` text,
	`coverageCountries` text,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`isSigned` boolean NOT NULL DEFAULT false,
	`weight` int NOT NULL DEFAULT 10,
	`foundedYear` int,
	`teamSize` varchar(64),
	`caseCount` int DEFAULT 0,
	`rating` decimal(3,1) DEFAULT '0.0',
	`logoUrl` text,
	`rejectReason` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `suppliers_id` PRIMARY KEY(`id`)
);
