using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartAC.Api.Migrations
{
    public partial class DeviceDetailUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeviceDetails_Devices_DeviceID",
                table: "DeviceDetails");

            migrationBuilder.DropIndex(
                name: "IX_DeviceDetails_DeviceID",
                table: "DeviceDetails");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDateTime",
                table: "DeviceDetails",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_DeviceDetails_DeviceID",
                table: "DeviceDetails",
                column: "DeviceID");

            migrationBuilder.AddForeignKey(
                name: "FK_dbo.DeviceDetail_DeviceID",
                table: "DeviceDetails",
                column: "DeviceID",
                principalTable: "Devices",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            SeedData(migrationBuilder);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_dbo.DeviceDetail_DeviceID",
                table: "DeviceDetails");

            migrationBuilder.DropIndex(
                name: "IX_DeviceDetails_DeviceID",
                table: "DeviceDetails");

            migrationBuilder.DropColumn(
                name: "CreatedDateTime",
                table: "DeviceDetails");

            migrationBuilder.CreateIndex(
                name: "IX_DeviceDetails_DeviceID",
                table: "DeviceDetails",
                column: "DeviceID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DeviceDetails_Devices_DeviceID",
                table: "DeviceDetails",
                column: "DeviceID",
                principalTable: "Devices",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        private void SeedData(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"
set identity_insert SmartAcDB..DeviceDetails on;
insert into SmartAcDB..DeviceDetails(ID, DeviceID, Temperature, AirHumidityPercent, CarbonMonoxideLevel, HealthStatus, CreatedDateTime)
values (1, 1, 20, 17, 8, 'ok', GETDATE()),
(2, 1, 20, 17, 8, 'ok', GETDATE()),
(3, 2, 20, 17, 8, 'ok', GETDATE()),
(4, 3, 20, 17, 8, 'ok', GETDATE())
set identity_insert SmartAcDB..DeviceDetails off;
"
            );
        }
    }
}
