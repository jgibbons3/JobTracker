from rest_framework import serializers
from .models import Job, History


class JobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job
        fields = '__all__'
    

class JobIdSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job
        fields = ['job_id']


class HistorySerializer(serializers.ModelSerializer):
    job_selector = JobIdSerializer(read_only=True)
  
    class Meta:
        model = History
        fields = '__all__'

        read_only_fields = ['job_selector']

