from django.http import JsonResponse

def index(request):
    return JsonResponse({"message": "AbleBank Copilot Django API running."})
