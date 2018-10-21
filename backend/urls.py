from django.urls import path
from . import views

urlpatterns = [
    path('create_game/', views.create_game),
    path('game/', views.game),
    path('try_to_guess/', views.try_to_guess),
    path('get_computer_try/', views.get_computer_try),
    path('send_answer/', views.send_answer)
]