from django.contrib import admin
from .models import Contact

class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'added_at', 'removed')  
    ordering = ('added_at',)  
    

admin.site.register(Contact, ContactAdmin)
