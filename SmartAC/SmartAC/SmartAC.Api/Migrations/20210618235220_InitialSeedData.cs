using System;
using Microsoft.EntityFrameworkCore.Migrations;
using SmartAC.Api.DataAccess.Entities;
using SmartAC.Api.DataAccess.Persistence;
using System.Collections.Generic;

namespace SmartAC.Api.Migrations
{
    public partial class InitialSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_UserTypes_UserTypeID",
                table: "Users");

            migrationBuilder.DropTable(
                name: "UserTypes");

            migrationBuilder.DropIndex(
                name: "IX_Users_UserTypeID",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserTypeID",
                table: "Users");

            migrationBuilder.AddColumn<bool>(
                name: "IsAdmin",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "StatusID",
                table: "Devices",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Devices_StatusID",
                table: "Devices",
                column: "StatusID");

            migrationBuilder.AddForeignKey(
                name: "FK_Devices_Status_StatusID",
                table: "Devices",
                column: "StatusID",
                principalTable: "Status",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            SeedData(migrationBuilder);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Devices_Status_StatusID",
                table: "Devices");

            migrationBuilder.DropIndex(
                name: "IX_Devices_StatusID",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "IsAdmin",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "StatusID",
                table: "Devices");

            migrationBuilder.AddColumn<long>(
                name: "UserTypeID",
                table: "Users",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "UserTypes",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTypes", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserTypeID",
                table: "Users",
                column: "UserTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_UserTypes_UserTypeID",
                table: "Users",
                column: "UserTypeID",
                principalTable: "UserTypes",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        private void SeedData(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"
set identity_insert SmartAcDB..Status on;
insert into SmartAcDB..Status (ID, Name)
values (1, 'Active'),
(2, 'Blocked'),
(3, 'Disabled')
set identity_insert SmartAcDB..Status off;

set identity_insert SmartAcDB..Users on;
insert into SmartAcDB..Users (ID, PasswordHash, IsAdmin, Salt, StatusID)
values (1, '', 1, '', 1),
(2, '', 1, '', 1),
(3, '', 0, '', 1)
set identity_insert SmartAcDB..Users off;

set identity_insert SmartAcDB..Devices on;
insert into SmartAcDB..Devices (ID, SerialNumber, FirmwareVersion, RegistrationDate, StatusID)
values (1, 'xxy1239-p1', '1.0', GETDATE(), 1),
(2, 'oip23-p4', '1.0', GETDATE(), 1),
(3, 'kjs32-p3', '1.0', GETDATE(), 1),
(4, 'aslks33-p5', '1.0', GETDATE(), 1),
(5, 'lkj2392-p6', '1.0', GETDATE(), 1),
(6, 'po2388s-p11', '1.0', GETDATE(), 1),
(7, 'alksjj4-p12', '1.0', GETDATE(), 1),
(8, 'lkjio23-p12', '1.0', GETDATE(), 1),
(9, 'lkjs235-p13', '1.0', GETDATE(), 1),
(10, 'oiuad3-p41', '1.0', GETDATE(), 1),
(11, 'lkmas23-p51', '1.0', GETDATE(), 1),
(12, 'iuw393s-p61', '1.0', GETDATE(), 1),
(13, 'asdfi88-p17', '1.0', GETDATE(), 1),
(14, 'ttgy184-p18', '1.0', GETDATE(), 1),
(15, 'xty1989-p19', '1.0', GETDATE(), 1)
set identity_insert SmartAcDB..Devices off;
"
            );
        }
    }
}
