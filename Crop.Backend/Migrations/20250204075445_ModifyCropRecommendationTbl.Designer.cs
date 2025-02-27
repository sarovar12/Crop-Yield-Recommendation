﻿// <auto-generated />
using System;
using Crop.Backend.DBContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Course.Backend.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20250204075445_ModifyCropRecommendationTbl")]
    partial class ModifyCropRecommendationTbl
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.2");

            modelBuilder.Entity("Crop.Backend.Model.CropRecommendation", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("GradientBoostingRecommendation")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<float>("Humidity")
                        .HasColumnType("REAL");

                    b.Property<float?>("Latitude")
                        .HasColumnType("REAL");

                    b.Property<float?>("Longitude")
                        .HasColumnType("REAL");

                    b.Property<float>("Nitrogen")
                        .HasColumnType("REAL");

                    b.Property<float>("PhValue")
                        .HasColumnType("REAL");

                    b.Property<float>("Phosphorus")
                        .HasColumnType("REAL");

                    b.Property<float>("Potassium")
                        .HasColumnType("REAL");

                    b.Property<float>("Rainfall")
                        .HasColumnType("REAL");

                    b.Property<string>("RandomForestRecommendation")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<float>("Temperature")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("CropRecommendations");
                });

            modelBuilder.Entity("Crop.Backend.Model.Rainfall", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<float>("AverageHumidity")
                        .HasColumnType("REAL");

                    b.Property<float>("AverageRainfall")
                        .HasColumnType("REAL");

                    b.Property<float>("AverageTemperature")
                        .HasColumnType("REAL");

                    b.Property<string>("DistrictName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<float>("Latitude")
                        .HasColumnType("REAL");

                    b.Property<float>("Longitude")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("RainfallData");
                });

            modelBuilder.Entity("Crop.Backend.Model.User", b =>
                {
                    b.Property<string>("EmailAddress")
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("EmailAddress");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
