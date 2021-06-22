using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartAC.Api.Migrations
{
    public partial class UpdatingDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_dbo.DeviceDetail_DeviceID",
                table: "DeviceDetails");

            migrationBuilder.AddForeignKey(
                name: "FK_DeviceDetails_Devices_DeviceID",
                table: "DeviceDetails",
                column: "DeviceID",
                principalTable: "Devices",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeviceDetails_Devices_DeviceID",
                table: "DeviceDetails");

            migrationBuilder.AddForeignKey(
                name: "FK_dbo.DeviceDetail_DeviceID",
                table: "DeviceDetails",
                column: "DeviceID",
                principalTable: "Devices",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
