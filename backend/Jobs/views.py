from itertools import chain
from rest_framework import generics, filters
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, ListCreateAPIView, \
    RetrieveUpdateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView, get_object_or_404
from rest_framework.response import Response
from Jobs.serializers import JobSerializer, HistorySerializer
from .models import Job, History


# 1)jobs/ POST: user can create a new job entry by sending post data.
class CreateJost(ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def perform_create(self, serializer):
        serializer.save()


# 2)jobs/ GET: lists all the jobs in chronological order
# 3)jobs/?search=<str:search_string> GET: Search job and list result in chronological order
# http://127.0.0.1:8000/jobs/?search=trabajo  trabajo is the string
class ListCreateJob(ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['compay_name', 'job_description']


# 4)jobs/<int:job_id>/ GET: get a specific job by ID and display all the information about it
# 5)jobs/<int:job_id>/ PATCH: update a specific job
# 6)jobs/<int:job_id>/ DELETE: delete a job by ID 
class RetrieveUpdateDeleteJob(RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    lookup_url_kwarg = "job_id"


# History
# 1)new_status/<int:job_id>/ POST: Create a new status on a job.
class createStatus(ListCreateAPIView):
    serializer_class = HistorySerializer
    lookup_url_kwarg = "job_id"
        
    def perform_create(self, serializer):
        job_id = int(self.kwargs['job_id'])
        job = Job.objects.get(job_id = job_id)
        serializer.save(job_selector=job)


# 2)history_status/<int:job_id>/ GET: List all status of a job
class history_job(ListCreateAPIView):
    serializer_class = HistorySerializer
    lookup_url_kwarg = "job_id"

    def get_queryset(self):
        job_id = self.kwargs['job_id']
        return History.objects.filter(job_selector=job_id).order_by("-date") 


# 3)status/<int:id>/ GET: get a specific history status by ID and display all the information about it
# 4)status/<int:id>/ PATCH: update a specific history status 
# 5)status/<int:id>/ DELETE: delete a history status by ID 
class RetrieveUpdateDeleteStatus(RetrieveUpdateDestroyAPIView):
    queryset = History.objects.all()
    serializer_class = HistorySerializer
    lookup_url_kwarg = "id"
