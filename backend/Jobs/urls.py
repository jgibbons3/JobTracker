from django.urls import path
from .views import *


urlpatterns = [
    path('jobs/', ListCreateJob.as_view()),
    path('jobs/', CreateJost.as_view()),
    path('jobs/<int:job_id>/', RetrieveUpdateDeleteJob.as_view()),
    path('new_status/<int:job_id>/', history_jobId.as_view()),
    path('history_status/<int:job_id>/', history_job.as_view()),
    path('status/<int:id>/', RetrieveUpdateDeleteStatus.as_view())
]