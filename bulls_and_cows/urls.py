from django.urls import path
from . import views

urlpatterns = [
    path('api/create_game/', views.create_game),
    path('api/game/<str:key>', views.game),
    path('api/try_to_guess/', views.try_to_guess),
    path('api/get_computer_try/', views.get_computer_try),
    path('api/send_answer/', views.send_answer)
]