from django.db import models
from django.conf import settings


class Job(models.Model):
    job_id = models.AutoField(primary_key=True)

    compay_name = models.CharField(
        max_length=100,
        verbose_name='company name',
        blank=True)

    job_description = models.CharField(
        max_length=100,
        verbose_name='job description',
        blank=True
    )

    country = models.CharField(
        max_length=50,
        verbose_name='country',
        blank=True
    )

    city = models.CharField(
        max_length=30,
        verbose_name='city',
        blank=True
    )

    comments = models.TextField(
        verbose_name='comments',
        blank=True
    )

    def __str__(self):
        return f' {self.job_id} / {self.compay_name} / {self.job_description} / {self.country} / {self.city} / {self.comments}'


class History(models.Model):
    job_selector = models.ForeignKey(
        to=Job,
        on_delete=models.CASCADE,
        related_name='jobId',
        blank=True)

    application_choices = [
        ('open', 'open'),
        ('rejected', 'rejected'),
        ('interview', 'interview'),
    ]

    application_status = models.CharField(
        max_length=20,
        choices=application_choices,
        default='open',
    )

    date = models.DateField(
        verbose_name='date')

    def __str__(self):
        return f' {self.job_selector} / {self.application_status} / {self.date}'


