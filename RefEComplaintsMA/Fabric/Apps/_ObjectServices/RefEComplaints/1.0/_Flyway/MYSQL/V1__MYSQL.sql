CREATE TABLE `ComplaintCategory`(
	`Category` VARCHAR(40),
	`CategoryID` BIGINT NOT NULL AUTO_INCREMENT,
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`Description` VARCHAR(40),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`SoftDeleteFlag` BOOLEAN,
	PRIMARY KEY(`CategoryID`)
);
ALTER TABLE `ComplaintCategory`
	ADD CONSTRAINT `e30c006112acd63fe8e782c2db1a9a` UNIQUE KEY(`CategoryID`);
CREATE TABLE `Complaint`(
	`AssignedTo` VARCHAR(40),
	`CategoryID` BIGINT,
	`ComplaintID` BIGINT NOT NULL AUTO_INCREMENT,
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
	ADD CONSTRAINT `d44e97d6d29b2dd74ca2956eff251a` UNIQUE KEY(`ComplaintID`);
ALTER TABLE `Complaint`
	ADD CONSTRAINT `9e323a6a1d2166f189df439c59938c` FOREIGN KEY(`CategoryID`) REFERENCES `ComplaintCategory`(`CategoryID`);
