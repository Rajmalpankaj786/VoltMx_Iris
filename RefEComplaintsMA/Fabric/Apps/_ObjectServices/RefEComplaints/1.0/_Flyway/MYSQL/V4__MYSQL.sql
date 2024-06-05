CREATE TABLE `Complaint`(
	`AssignedTo` VARCHAR(40),
	`CategoryID` BIGINT,
	`ComplaintID` BIGINT NOT NULL,
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`Description` VARCHAR(40),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`Location` VARCHAR(40),
	`Name` VARCHAR(40),
	`Phone` VARCHAR(40),
	`Photo` VARCHAR(40),
	`SoftDeleteFlag` BOOLEAN,
	`Status` VARCHAR(100),
	PRIMARY KEY(`ComplaintID`)
);
ALTER TABLE `Complaint`
	ADD CONSTRAINT `6cd215019e1b68f20c82612ab013e3` UNIQUE KEY(`ComplaintID`);
