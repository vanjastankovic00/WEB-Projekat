﻿// <auto-generated />
using System;
using GameShopWebApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GameShopWebApi.Migrations
{
    [DbContext(typeof(GameShopContext))]
    [Migration("20220110155334_V1")]
    partial class V1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.12");

            modelBuilder.Entity("GameShopWebApi.Models.Developer", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("BrojIgrica")
                        .HasColumnType("int");

                    b.Property<int>("BrojIgricaNaStanju")
                        .HasColumnType("int");

                    b.Property<int>("GodinaZasnivanja")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Developeri");
                });

            modelBuilder.Entity("GameShopWebApi.Models.Igrica", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("DeveloperID")
                        .HasColumnType("int");

                    b.Property<int>("KolicinaNaStanju")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ShopID")
                        .HasColumnType("int");

                    b.Property<string>("Tip")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("X")
                        .HasColumnType("int");

                    b.Property<int>("Y")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("ShopID");

                    b.ToTable("Igrice");
                });

            modelBuilder.Entity("GameShopWebApi.Models.Shop", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("M")
                        .HasColumnType("int");

                    b.Property<int>("N")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Shops");
                });

            modelBuilder.Entity("GameShopWebApi.Models.Igrica", b =>
                {
                    b.HasOne("GameShopWebApi.Models.Shop", "Shop")
                        .WithMany("Igrice")
                        .HasForeignKey("ShopID");

                    b.Navigation("Shop");
                });

            modelBuilder.Entity("GameShopWebApi.Models.Shop", b =>
                {
                    b.Navigation("Igrice");
                });
#pragma warning restore 612, 618
        }
    }
}
