using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartAC.Api.Migrations
{
    public partial class ResolveDeviceStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ResolvedDate",
                table: "DeviceDetails",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ResolvedDate",
                table: "DeviceDetails");
        }
    }
}
