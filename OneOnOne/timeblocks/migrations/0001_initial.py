# Generated by Django 5.0.3 on 2024-03-29 19:56

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('events', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AvailabilityTimeblock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('date', models.DateField()),
                ('preference_type', models.CharField(choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')], max_length=6)),
                ('is_finalized', models.BooleanField(default=False)),
                ('event', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_timeblocks', to='events.event')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_user_timeblocks', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='EventTimeblock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('date', models.DateField()),
                ('preference_type', models.CharField(choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')], max_length=6)),
                ('is_finalized', models.BooleanField(default=False)),
                ('event', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_timeblocks', to='events.event')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_user_timeblocks', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddConstraint(
            model_name='availabilitytimeblock',
            constraint=models.UniqueConstraint(fields=('event', 'user', 'date', 'start_time', 'end_time', 'preference_type', 'is_finalized'), name='unique_availability_timeblock'),
        ),
        migrations.AddConstraint(
            model_name='eventtimeblock',
            constraint=models.UniqueConstraint(fields=('event', 'user', 'date', 'start_time', 'end_time', 'preference_type', 'is_finalized'), name='unique_event_timeblock'),
        ),
    ]
