from django.urls import path

from userauths import views as userauths_views
from core import views as coreviews_views
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [


    #  ******** User auths URL's

    # authentication
    path('register-user/', userauths_views.RegisterUser.as_view()),
    path('login-user/', userauths_views.LoginUser.as_view()),
    path('user/token/refresh/', TokenRefreshView.as_view()),
    path('reset-user-password/', userauths_views.ResetUserPassword.as_view()),
    path('forgot-user-password/', userauths_views.ForgotUserPasswordView.as_view()),


    path('complete-user-profile/', userauths_views.CompleteUserProfileInformation.as_view()),
    path('update-user-profile/<str:uid>/', userauths_views.UpdateUserProfileInformation.as_view()),


    # see payment status for user
    path('payment-user-status/<str:uid>/', userauths_views.PaymentUserStatusListAPIView.as_view()),
    path('payment-user-status-two/<str:uid>/', userauths_views.PaymentUserStatustwoListAPIView.as_view()),
    path('payment-user-status-check-by-payid/<str:uid>/', userauths_views.SendPictureUserClickByPayIDListApiView.as_view()),


    # complete team information
    path('complete-member-information-by-user/', userauths_views.CompleteInformationMemberByUserListCreateAPIView.as_view()),
    path('get-all-member-information-for-one-user-to-see-in-a-list/<str:uid>/', userauths_views.GetAllMemberForOneUserListAPIView.as_view()),
    # path('update-member-information-by-user/<str:tid>/', userauths_views.UpdateInformationMemberByUserListUpdateAPIView.as_view()),
    path('delete-member-information-by-user/<str:tid>/<str:uid>/', userauths_views.MemberTeamItemDeleteAPIView.as_view()),

    # send picture user for payment
    path('send-pic-user-post-image/<str:uid>/', userauths_views.SendPictureUserTotalPriceCreateAPIView.as_view()),


    # ********* Superuser URL's
    path('register-superuser/', userauths_views.RegisterSuperUser.as_view()),
    path('login-superuser/', userauths_views.LoginSuperUser.as_view()),
    path('reset-superuser-password/<str:uid>/', userauths_views.ResetSuperUserPassword.as_view()),
    path('forgot-superuser-password/', userauths_views.ForgotSuperUserPasswordView.as_view()),

    # confirm payment
    path('confirm-payment-by-superuser/<str:uid>/', userauths_views.ConfirmPaymentSuperUserListAPIView.as_view()),
    path('confirm-payment-by-superuser/<str:payid>/<str:uid>/', userauths_views.RetrieveNestedPaymentAPIView.as_view()),
    path('confirm-payment-by-superuser-check-or-uncheck-the-payment/<str:uid>/<str:payid>/', userauths_views.ConfirmPaymentSuperUserCreateAPIView.as_view()),


    # see teams status for SuperUser
    path('status-teams-superuser/<str:uid>/', userauths_views.TeamStatusPreviewBySuperUser.as_view()),
    path('status-teams-superuser/<str:uid>/<str:pid>/', userauths_views.RetrieveNestedProfileTeamStatusPreviewBySuperUserAPIView.as_view()),


    # search method for superuser by name of teams
    path('search-teams-superuser-by-name-of-team/', userauths_views.SearchSuperUserTeamforHomePageAPIView.as_view()),


    # Price per member url
    path('price-per-member/', coreviews_views.PricePerMemberListAPIView.as_view()),
    path('create-price-per-member/', coreviews_views.PricePerMemberAPIView.as_view()),




    # ********* core URLs

    # list all teams in main website
    path('status-teams-main-page/', userauths_views.TeamStatusPreviewByMainUser.as_view()),
    path('search-teams-main-page/', userauths_views.SearchTeamforHomePageAPIView.as_view()),


    # listing all league
    path('league/', coreviews_views.LeagueListAPIView.as_view()),
    path('create-league/', coreviews_views.LeagueAPIView.as_view()),
    path('league-delete/<str:lid>/<str:uid>/', coreviews_views.LeagueItemDeleteAPIView.as_view()),


    # listing all hotel
    path('hotel/', coreviews_views.HotelListAPIView.as_view()),
    path('create-hotel/', coreviews_views.HotelAPIView.as_view()),



    # listing all news
    path('news/', coreviews_views.NewsListAPIView.as_view()),
    path('create-news/', coreviews_views.NewsAPIView.as_view()),
    path('news-delete/<str:nid>/<str:uid>/', coreviews_views.NewsItemDeleteAPIView.as_view()),
    path('news-deatil/<str:nid>/', coreviews_views.NewsDetailAPIView.as_view()),
]
