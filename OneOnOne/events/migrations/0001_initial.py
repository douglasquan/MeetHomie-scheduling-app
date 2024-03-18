# Generated by Django 4.2.10 on 2024-03-07 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Event",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("event_title", models.CharField(max_length=255)),
                (
                    "event_duration",
                    models.IntegerField(
                        choices=[
                            (15, "15 minutes"),
                            (30, "30 minutes"),
                            (45, "45 minutes"),
                            (60, "60 minutes"),
                            (90, "90 minutes"),
                            (120, "120 minutes"),
                        ]
                    ),
                ),
                (
                    "event_type",
                    models.CharField(
                        choices=[
                            ("in_person", "In Person"),
                            ("phone", "Phone"),
                            ("video", "Video"),
                        ],
                        max_length=50,
                    ),
                ),
                ("description", models.TextField()),
                ("invitee_id", models.TextField()),
            ],
        ),
    ]
