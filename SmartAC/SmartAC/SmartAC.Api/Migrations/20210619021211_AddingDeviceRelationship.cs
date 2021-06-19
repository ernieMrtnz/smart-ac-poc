using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartAC.Api.Migrations
{
    public partial class AddingDeviceRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DeviceDetails_DeviceID",
                table: "DeviceDetails");

            migrationBuilder.CreateIndex(
                name: "IX_DeviceDetails_DeviceID",
                table: "DeviceDetails",
                column: "DeviceID",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DeviceDetails_DeviceID",
                table: "DeviceDetails");

            migrationBuilder.CreateIndex(
                name: "IX_DeviceDetails_DeviceID",
                table: "DeviceDetails",
                column: "DeviceID");
        }
    }
}
