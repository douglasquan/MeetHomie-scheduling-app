# Generated by Django 4.2.10 on 2024-03-10 10:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "events",
            "0002_meeting_created_at_meeting_host_id_meeting_is_active_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="event",
            name="host_id",
            field=models.IntegerField(default=1),
        ),
    ]
