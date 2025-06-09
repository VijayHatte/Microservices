from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Task
from django.core.mail import send_mail

@receiver(post_save, sender=Task)

def notify_user_on_task_assingment(sender, instance, created, **kwargs):
    if instance.assigned_to and created:
        send_mail(
            subject="New Task Assigned",
            message=f"Hello {instance.assigned_to.username},\n\nYou have been assigned a new task: {instance.title}.\n\nPlease check your task list.",
            from_email="admin@taskmanager.com",
            recipient_list=[instance.assigned_to.email],
            fail_silently=True,
        )